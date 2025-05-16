import { Client, Databases, Storage, ID, Account} from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67d115fe002928f9c34d");

const storage = new Storage(client);
const BucketId = "67d261fa0037bf8b1487"; // Replace with your actual bucket ID

const DatabaseId = "67d152b30025ab423b25";
const ProductsCollectionId  = "67d155f1000a5249402c";
const BannerImageCollectionId = "67d40b0c002d79789da4";
const categoriesCollectionId = "67d152f200279864af40";
const subcategoriesCollectionId = "67d1530200243f509b0f";
const cartcollectionID="67e67481000eb484ea77";
const ProfileCollectionId = "67ee746f000ba952dfa9";

const databases = new Databases(client);

const account = new Account(client);

export { databases, DatabaseId, storage, BucketId, ID, account, ProductsCollectionId ,cartcollectionID, BannerImageCollectionId, categoriesCollectionId, subcategoriesCollectionId, ProfileCollectionId};
