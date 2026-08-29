import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  const uri = process.env.MONGODB_URI;

  if (process.env.NODE_ENV === "development") {
    // In development, use a global variable so the client is not recreated on every HMR
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production, it's best to not use a global variable.
    if (!clientPromise) {
      client = new MongoClient(uri);
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

export async function getDb(): Promise<Db> {
  const promise = getClientPromise();
  const connectedClient = await promise;
  const dbName = process.env.MONGODB_DATABASE || "senotza";
  return connectedClient.db(dbName);
}

export default getClientPromise;
