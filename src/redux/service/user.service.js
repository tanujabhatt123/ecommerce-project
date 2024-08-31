import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc 
} from "firebase/firestore";
import {
    db
} from "../../firebase.config";

let collectionName = "users"

export const getUserFromAPI = async () => {
    let users = [];

    const querySnapshot = await getDocs(collection(db, collectionName));

    querySnapshot.forEach((doc) => {
        let user = doc.data();
        user.id = doc.id;

        users.push(user)
    });

    return users;
}

export const addUserToAPI = async (user) => {
    const docRef = await addDoc(collection(db, collectionName), user);
    console.log("Document written with ID: ", docRef.id);
}

export const updateUserToAPI = async (user, id) => {
    const userRef = doc(db, collectionName, id);
    await updateDoc(userRef, user);
}

export const deleteUserToAPI = async (id) => {
    await deleteDoc(doc(db, collectionName, id));
}