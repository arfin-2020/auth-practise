import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './config';
import { UserContext } from '../../App';


const Login = () => { 
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
    const handleWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {  
    const {displayName,email}= result.user;
    const signInUser = {name: displayName,email};
    setLoggedInUser(signInUser);
    // console.log('google user',signInUser);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log('google error',errorCode,errorMessage);
  });  
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleWithGoogle}>Sign in with google</button>
           
        </div>
    );
};

export default Login;