import AppwriteManager from '../appwrite/appwriteManager';
import conf from '../conf/conf';
const db = await AppwriteManager.createNewDb();

const createPost = async({title, slug, content, featuredImage, status, userId}) => {
    try { 
        const result = await db.createDocument(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        );
        return result
    } catch (err) { 
        throw new Error(err);
    }
} 

const updatePost = async(slug, {title, content, featuredImage, status, userId}) => {
    try { 
        const result = await db.updateDocument(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }  
        );
        return result
    } catch (err) { 
        throw new Error(err);
    }
}

const deletePost = async(slug) => {
    try { 
        await db.deleteDocument(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            slug
        );
        return true;
    } catch (err) { 
        throw new Error(err);
    }
} 

const getPost = async(slug) => {
    try { 
        return await db.getDocument(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            slug
        );
    } catch (err) { 
        throw new Error(err);
    }
}

const getAllPost = async(queries = [ AppwriteManager.query.equal('status', 'active')]) => {
    try { 
        return await db.listDocuments(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            queries
        );
    } catch (err) { 
        throw new Error(err);
    }
}

const databaseManager = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPost
} 

export default databaseManager;