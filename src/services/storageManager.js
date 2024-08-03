import AppwriteManager from '../appwrite/appwriteManager';
import conf from '../conf/conf';
const storage = await AppwriteManager.createNewStorage();

const uploadFile = async(file) => {
    try { 
        return await storage.createFile(
            conf.appwriteBucketId,
            AppwriteManager.UniqueID.unique(),
            file
        );
    } catch (err) { 
        throw new Error(err);
    }
} 

const deleteFile = async(fileId) => {
    try { 
        await storage.deleteFile(
            conf.appwriteBucketId,
            fileId
        );
        return true;
    } catch (err) { 
        throw new Error(err);
    }
} 

const getFilePreview = (fileId) => {
    try { 
        return storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    } catch (err) { 
        throw new Error(err);
    }
} 

const StorageServices = {
    uploadFile,
    deleteFile,
    getFilePreview
}

export default StorageServices;