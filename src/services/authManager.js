import AppwriteManager from '../appwrite/appwriteManager';

const account = await AppwriteManager.createNewAccount();

const createAccount = async({email, password, name}) => {
    try { 
        const userAccount = await account.create(AppwriteManager.UniqueID.unique(), email, password, name);
        if(userAccount) {
            return await login({email, password});
        }
        return null
    } catch (err) { 
        throw new Error(err);
    }
} 

const login = async({email, password}) => {
    try { 
        const promise = await account.createEmailPasswordSession(email, password);
        return promise;
    } catch (err) { 
        throw new Error(err);
    }
} 

const getCurrentUser = async() => {
    try {
        const current = await account.get();
        return current;
    } catch (err) {
        throw new Error(err);
    }
}

const logout = async() => {
    try {
        await account.deleteSession('current');
    } catch (err) {
        throw new Error(err);
    }
    return null;
}

const authServices = {
    createAccount,
    login,
    getCurrentUser,
    logout,
}

export default authServices;