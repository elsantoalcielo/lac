import { ObjectId } from 'mongodb';
import { getDb } from './mongo';

export const HISTORY_COLLECTION = 'history';

// The menu editor works on the draft while developing, as the public pages do
export const MENU_COLLECTION = process.env.NODE_ENV == 'development' ? 'draft-menu' : 'current-menu';

// Collections whose history the management pages may read
export const VERSIONED_COLLECTIONS = ['cafes', MENU_COLLECTION];

export class VersionConflictError extends Error {}

type SavableDocument = {
  _id: string;
  version?: number;
  [field: string]: unknown;
};

/**
 * Replaces a document only if the caller edited its latest version, then keeps
 * the replaced one in the history collection. Returns the new version number.
 * Throws VersionConflictError when someone else saved in the meantime.
 */
export async function saveDocument(collectionName: string, data: SavableDocument, savedBy: string): Promise<number> {
  const database = getDb();
  const { _id, version, ...content } = data;
  const currentVersion = version ?? 0;

  // Documents created before versioning have no `version` field
  const versionFilter = currentVersion === 0 ? { $or: [{ version: 0 }, { version: { $exists: false } }] } : { version: currentVersion };

  // Driver 5.x answers { value } here; later majors answer the document itself
  const result: any = await database
    .collection(collectionName)
    .findOneAndReplace({ _id: new ObjectId(_id), ...versionFilter }, { ...content, version: currentVersion + 1 }, { returnDocument: 'before' });
  const replaced = result && 'value' in result ? result.value : result;

  if (!replaced) {
    throw new VersionConflictError();
  }

  await database.collection(HISTORY_COLLECTION).insertOne({
    collection: collectionName,
    replacedAt: new Date(),
    replacedBy: savedBy,
    version: replaced.version ?? 0,
    document: replaced,
  });

  return currentVersion + 1;
}

export async function listHistory(collectionName: string, limit = 20) {
  const entries = await getDb()
    .collection(HISTORY_COLLECTION)
    .find({ collection: collectionName })
    .sort({ replacedAt: -1 })
    .limit(limit)
    .toArray();

  // ObjectIds and dates to plain strings
  return JSON.parse(JSON.stringify(entries));
}
