import * as actions from './actionTypes';
import axios from 'axios';

export const json_update = () => async dispatch => {

    // getting file 

    // await fetch('https://cors-anywhere.herokuapp.com/http://tarif.oguzydz.me/tarif_test.json', {
    //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //     // mode: 'no-cors', // no-cors, *cors, same-origin
    //     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin',
    //     headers: {
    //         Accept: 'application/json',
    //         'Accept-encoding': 'gzip, deflate',
    //         'Content-Type': 'application/json',
    //     },
    //     // body: JSON.stringify(dbUser),
    // })
    //     .then(response => {
    //         // dispatch({
    //         //     type: actions.UPDATE_JSON,
    //         //     payload: response
    //         // })
    //         console.log(response)
    //     })
    //     // .then(() => {
    //     //     dispatch({
    //     //         type: actions.LOADING_JSON,
    //     //     })
    //     // })
    //     .catch(error => console.log('ERROR: ', error));


    axios({
        method: "POST",
        url: "http://tarif.oguzydz.me/tarif.json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        // data: formData
    }).then(res => {
        dispatch({
            type: actions.LOADING_JSON
        })
        dispatch({
            type: actions.UPDATE_JSON,
            payload: res.data
        })


    }).then(() => {
        dispatch({
            type: actions.LOADED_JSON
        })
    }).catch(err => {
        console.log(err)
    })

}

