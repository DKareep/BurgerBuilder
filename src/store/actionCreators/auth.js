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

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = expiresIn => {

    return dispatch => {
        setTimeout( ()=> {
            dispatch(logout())
        }, expiresIn * 1000)
    }
}

export const auth = (email, password, btnType) => {
    return dispatch => {
        dispatch(authStart())
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD6ClRLraawFwjA-UxE4Spo5W6jAlvVS7s';
        if(btnType === 'signin'){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD6ClRLraawFwjA-UxE4Spo5W6jAlvVS7s';
        }
        const authToken = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url, authToken)
        .then((response) => {
            const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(authLogout(+response.data.expiresIn))
            // console.log(response)
        })
        .catch(error => {
                      dispatch(authFail(error.response.data.error.message))
        })

    }
}

export const authRedirect= path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}



export const authCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expiresIn = new Date(localStorage.getItem('expirationDate'))
        if(!token) {
            dispatch(logout());
    
        } else {
            if(expiresIn < new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token,userId))
                authLogout((new Date().getTime()- expiresIn.getTime())/1000)
            }
        }
    }
   
}