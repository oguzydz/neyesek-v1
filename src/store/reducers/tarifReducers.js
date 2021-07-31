import * as actions from '../actions/actionTypes';

const initalState = {
    user: '',
    auth: false,
    favs: [],
}

const tarifReducers = (state = initalState, action) => {
    switch (action.type) {
        case actions.LOGIN:
            return {
                ...state,
                user: action.payload,
                auth: true
            }
        case actions.LOGOUT:
            return {
                ...state,
                user: '',
                auth: false
            }
        case actions.LOGIN_ANONYMOUS:
            return {
                ...state,
                user: action.payload,
            }
        case actions.ADD_FAV:
            return {
                ...state,
                favs: [
                    ...state.favs,
                    action.payload,
                ]
            }
        case actions.REMOVE_FAV:
            return {
                ...state,
                favs: [
                    ...state.favs.filter(item => item !== action.payload)
                    // ...state.favs
                ]
            }
    }
    return state;
}

export default tarifReducers;
