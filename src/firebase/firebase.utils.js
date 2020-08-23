import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAGvizs7gKhYWwZB8QVgCHcTpNElKfKdds",
    authDomain: "crwn-clothing-b000f.firebaseapp.com",
    databaseURL: "https://crwn-clothing-b000f.firebaseio.com",
    projectId: "crwn-clothing-b000f",
    storageBucket: "crwn-clothing-b000f.appspot.com",
    messagingSenderId: "105913505166",
    appId: "1:105913505166:web:f064cd0dbd5fb2b3c680df",
    measurementId: "G-2JNHTYV4G8"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export default firebase;