import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

// One client per server instance: the driver keeps a connection pool, so
// requests on a warm instance reuse connections instead of reconnecting.
let client: MongoClient | undefined;

export function getDb() {
  client ??= new MongoClient(env.MONGODB_URI, { maxPoolSize: 5 });
  return client.db('amagat');
}
