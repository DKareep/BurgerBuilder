import * as actionTypes from './actionTypes';
import axios from 'axios';
// import * as admin from 'firebase-admin';

// var serviceAccount = require('./brugercart-firebase-adminsdk-rejr7-3c52f0cbc6.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://brugercart.firebaseio.com"
//   });

//   var uid = "some-uid";
// let cToken;
// admin.auth().createCustomToken(uid)
//   .then(function(customToken) {
//     // Send token back to client
//     console.log(" creating custom token:", customToken);
//     cToken = customToken;
//   })
//   .catch(function(error) {
//     console.log("Error creating custom token:", error);
//   });

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {

        dispatch(authStart())
        const authToken = {
          
            email: email,
            password: password,
            returnSecureToken: true
        }


        const auth = {
            token: cToken,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD6ClRLraawFwjA-UxE4Spo5W6jAlvVS7s', authToken)
        .then((response) => {
            dispatch(authSuccess(response))
        })
        .catch(error => {
            dispatch(authFail(error))
        })

    }
}