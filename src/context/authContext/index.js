import React,{ useEffect,useState,useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.creatContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function Authprovider({ Children }) {
    const[currentUser, setCurrentUser] = useState(null);
    const[userLoggedIn, setUserLoggedin] = useState(false);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

 async function initializeUser(user) {
    if (user) {
        setCurrentUser({ ...user }); 
        setUserLoggedin(true);
    } else {
        setCurrentUser(null);
        setUserLoggedin(false);
    }

    setLoading(false);
}


    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
