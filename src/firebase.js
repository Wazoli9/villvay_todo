import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJx6NnMIRP9jsF0xZnb22NtRm135M_PD0",
    authDomain: "villvay-todo.firebaseapp.com",
    projectId: "villvay-todo",
    storageBucket: "villvay-todo.appspot.com",
    messagingSenderId: "908426692342",
    appId: "1:908426692342:web:942b3ae2f420e3d37e4ed7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
