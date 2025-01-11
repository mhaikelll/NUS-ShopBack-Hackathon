import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, getDocs, query, where } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNs0dmj_xnh1BTd7F-31nZVH385mIYAK4",
  authDomain: "nus-shopback-hackathon.firebaseapp.com",
  projectId: "nus-shopback-hackathon",
  storageBucket: "nus-shopback-hackathon.firebasestorage.app",
  messagingSenderId: "342825868584",
  appId: "1:342825868584:web:605359965b201836ea041d"
};

export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
export const auth = getAuth(app);

export async function newUserSignUp(email : string, password : string) {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error("Error: ", error)
    }
}


export async function createUserData(username : string) {
    try {
        const response = await addDoc(collection(database, "users"), {
            "username" : username,
            "streak" : [],
            "purchases" : [],
            "missions" : []
        })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export async function getUserData(username : string) {
    try {
        const response = await getDocs(query(collection(database, "users"), where("username", "==", username)))
        return response.docs[0].data()
    } catch (error) {
        console.log("Error:", error)
    }
}