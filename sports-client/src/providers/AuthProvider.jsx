import React, { createContext, useState,useEffect } from 'react'

 import {
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut,
 } from "firebase/auth";
import { auth } from '../firebase/firebase.init';



export const AuthContext=createContext();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    // console.log(user);
    const createNewUser=(email,password)=>{
      return createUserWithEmailAndPassword(auth,email,password)
    }
    const userLogin = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      return signOut(auth);
    };
    const authInfo={
        user,
        setUser,
        createNewUser,
        logOut,
        userLogin

    };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => {
        unsubscribe();
      };
    }, []);


  return (
    <AuthContext.Provider value={authInfo}>
        {children}
        
    </AuthContext.Provider>
  )
}

export default AuthProvider
