import { Client, Account, Storage, Databases , ID, Query} from "appwrite";
import conf from '../conf/conf';

let client = null;
const createClient = async() => {
    if(!client) {
        client = new Client()
        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId); // Your project ID
    }
    return client;
}

const createNewAccount = async() => {
    try {
        const client = await createClient();
        return new Account(client);
    } catch (err) {
        throw new Error(err);
    }
}

const createNewDb = async() => {
    try {
        const client = await createClient();
        return new Databases(client);
    } catch (err) {
        throw new Error(err);
    }
}

const createNewStorage = async() => {
    try {
        const client = await createClient();
        return new Storage(client);
    } catch (err) {
        throw new Error(err);
    }
}

const AppwriteManager  = {
    createClient,
    createNewAccount,
    createNewDb,
    createNewStorage,
    UniqueID: ID,
    query: Query
}

export default AppwriteManager;