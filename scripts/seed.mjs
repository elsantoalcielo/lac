// Inserts a JSON document into a collection of the `amagat` database.
//
// Usage:
//   node --env-file=.env scripts/seed.mjs <collection> <file.json> [--replace]
//
// Example:
//   node --env-file=.env scripts/seed.mjs cafes scripts/cafes-seed.json
//
// By default it refuses to write when the collection already has documents, so
// running it twice never creates a duplicate. --replace deletes the existing
// documents of that collection first.
import { readFileSync } from 'node:fs';
import { MongoClient } from 'mongodb';

const DATABASE = 'amagat';

const args = process.argv.slice(2);
const replace = args.includes('--replace');
const [collectionName, file] = args.filter((arg) => !arg.startsWith('--'));

if (!collectionName || !file) {
  console.error('Usage: node --env-file=.env scripts/seed.mjs <collection> <file.json> [--replace]');
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not set. Run with --env-file=.env or export it.');
  process.exit(1);
}

let document;
try {
  document = JSON.parse(readFileSync(file, 'utf8'));
} catch (e) {
  console.error(`Could not read ${file} as JSON: ${e.message}`);
  process.exit(1);
}

const client = new MongoClient(uri);
try {
  // Show where it writes, without the credentials (a multi-host URI is not a valid URL)
  const authority = uri.replace(/^mongodb(\+srv)?:\/\//, '').split(/[/?]/)[0];
  const host = authority.slice(authority.lastIndexOf('@') + 1);
  console.log(`Target: ${DATABASE}.${collectionName} on ${host}`);

  const collection = client.db(DATABASE).collection(collectionName);
  const existing = await collection.countDocuments();

  if (existing > 0 && !replace) {
    console.error(`${collectionName} already has ${existing} document(s). Nothing written. Use --replace to overwrite.`);
    process.exitCode = 1;
  } else {
    if (existing > 0) {
      const deleted = await collection.deleteMany({});
      console.log(`Deleted ${deleted.deletedCount} existing document(s).`);
    }
    const result = await collection.insertOne(document);
    console.log(`Inserted ${result.insertedId}`);
  }
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
