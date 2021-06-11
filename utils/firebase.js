import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/analytics";
import {loginSocial} from "./user"

const prodConfig = {
    apiKey: "AIzaSyCmDX-pMXRNVNkyIphZcR6yBdBSqPys1_g",
    authDomain: "ranstouring-prod.firebaseapp.com",
    databaseURL: "https://ranstouring-prod.firebaseio.com",
    projectId: "ranstouring-prod",
    storageBucket: "ranstouring-prod.appspot.com",
    messagingSenderId: "733733567067",
    measurementId: "G-BGS3S1K4GD"
};

const devConfig = {
    /*apiKey: "AIzaSyC8FimX5-w42Zcsf9nALmxlEw4b1135OKc",
    authDomain: "r2r-dev-2020.firebaseapp.com",
    databaseURL: "https://r2r-dev-2020.firebaseio.com",
    projectId: "r2r-dev-2020",
    storageBucket: "r2r-dev-2020.appspot.com",
    messagingSenderId: "496350443313",*/
    apiKey: "AIzaSyCmDX-pMXRNVNkyIphZcR6yBdBSqPys1_g",
    authDomain: "ranstouring-prod.firebaseapp.com",
    databaseURL: "https://ranstouring-prod.firebaseio.com",
    projectId: "ranstouring-prod",
    storageBucket: "ranstouring-prod.appspot.com",
    messagingSenderId: "733733567067",
    measurementId: "G-BGS3S1K4GD"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
    firebase.analytics();
}

const db = firebase.database();
const auth = firebase.auth();

var Gprovider = new firebase.auth.GoogleAuthProvider();
var Fprovider = new firebase.auth.FacebookAuthProvider();

const signGoogle = () => {
    console.log('masuk');
    
    auth.signInWithPopup(Gprovider).then(function (result) {
        console.log(result);
        
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.user.ma;
        // The signed-in user info.
        console.log(token);

        loginSocial(token)
        
        var user = result.user;
        // ...
    }).catch(function (error) {
        console.log(error.code);
        
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

    
}

const signFacebook = () => {
    console.log('masuk');
    
    auth.signInWithPopup(Fprovider).then(function (result) {
        console.log(result);
        
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.user.ma;
        loginSocial(token);
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        console.log(error);
        
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

export { db, auth, signGoogle, signFacebook };