import * as actions from './actionTypes';
import firebase from 'firebase';
import 'firebase/database';
import axios from 'axios';


const firebaseConfig = {
    apiKey: "AIzaSyAJ160IgoOR6uRumJ_j20JciGzKoNMQU1Q",
    authDomain: "neyesek-401c8.firebaseapp.com",
    databaseURL: "https://neyesek-401c8.firebaseio.com",
    projectId: "neyesek-401c8",
    storageBucket: "neyesek-401c8.appspot.com",
    messagingSenderId: "512674340518",
    appId: "1:512674340518:web:05e219738deb961e215e67",
    measurementId: "G-5Y443DSYW7"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export const login = ({ user, token }) => async dispatch => {
    const setUser = {
        // id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        givenName: user.givenName,
        familyName: user.familyName,
        createdAt: new Date().getTime(),
        expoPushToken: token,
    }

    dispatch({
        type: actions.LOGIN,
        payload: setUser
    })

    // kullanıcı kontrolü eğer kullanıcı varsa en son giriş tarihi ekle
    const userRef = firebase.database().ref('users/' + user.id);
    userRef.once('value', snapshot => {
        const updateUser = {
            name: setUser.name,
            email: setUser.email,
            photoUrl: setUser.photoUrl,
            givenName: setUser.givenName,
            familyName: setUser.familyName,
            createdAt: snapshot.val().createdAt,
            expoPushToken: setUser.expoPushToken,
            lastLogged: new Date().getTime()
        }
        userRef.update(updateUser)
    })

    // Burada aynı zamanda firebase storage kullanıcıyı kaydediyoruz!
    firebase.database().ref('users/' + user.id).set(setUser).catch(error => console.log(error))


    // Veritabanına da gönderiliyor.

    const dbUser = {
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "expoPushToken": token,
        "photoUrl": user.photoUrl,
        "givenName": user.givenName,
        "familyName": user.familyName,
        "createdAt": new Date().getTime(),
        "lastLogged": new Date().getTime(),
    }

    // const request = async () => {
    //     await fetch('https://cors-anywhere.herokuapp.com/http://oguzydz.me/user.php', {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         // mode: 'no-cors', // no-cors, *cors, same-origin
    //         // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin',
    //         headers: {
    //             Accept: 'application/json',
    //             'Accept-encoding': 'gzip, deflate',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(dbUser),
    //     })
    //         .then(response => console.log(response))
    //         .catch(error => console.log('ERROR: ', error));
    // }

    // request();


}


export const logout = () => async dispatch => {
    dispatch({
        type: actions.LOGOUT
    })
}



export const random_tarif = () => async dispatch => {
    dispatch({
        type: actions.RANDOM_TARIF
    })
}


export const ana_yemek = () => async dispatch => {
    dispatch({
        type: actions.ANA_YEMEK
    })
}

export const corba = () => async dispatch => {
    dispatch({
        type: actions.CORBA
    })
}

export const add_fav = (yemekid) => async dispatch => {
    dispatch({
        type: actions.ADD_FAV,
        payload: yemekid
    })
}


export const remove_fav = (yemekid) => async dispatch => {
    dispatch({
        type: actions.REMOVE_FAV,
        payload: yemekid
    })
}

