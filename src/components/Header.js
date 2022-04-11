import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Header(props) {
    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                props.setCurrentUser(undefined);
            })
            .catch((error) => {
                console.log("error signing out");
            });
    };
    return (
        <div className="header">
            <div className="nav">
                <div className="nav-title">Task Manager</div>
                {props.currentUser && (
                    <div onClick={signOutUser} className="btn sign-out-btn">
                        Sign Out
                    </div>
                )}
            </div>
        </div>
    );
}
