import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URL) {
  throw new Error("Db URL is not found");
}

const client = new MongoClient(process.env.DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDb(dbName: string) {
  try {
    await client.connect();
    console.log("<<<<DB connect >>>>>>");
    return client.db(dbName);
  } catch (err) {
    console.log(err);
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDb("next_blog_db");
  if (db) return db.collection(collectionName);

  return null;
}
