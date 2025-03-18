import { Client, Databases, Storage, ID, Account} from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67d115fe002928f9c34d");

const storage = new Storage(client);
const BucketId = "67d261fa0037bf8b1487"; // Replace with your actual bucket ID

const DatabaseId = "67d152b30025ab423b25";
const CollectionId = "67d155f1000a5249402c";

const databases = new Databases(client);

const account = new Account(client);

export { databases, DatabaseId, CollectionId, storage, BucketId, ID, account };
