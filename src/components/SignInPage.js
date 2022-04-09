import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function SignInPage(props) {
    const signIn = ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            props.setCurrentUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    return (
        <div className="sign-in-container container">
            <div onClick = {signIn} className="sign-in-btn btn">Sign In With Google</div>
        </div>
    );
}
