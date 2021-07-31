import * as actions from '../actions/actionTypes';

const initalState = {
    json: [],
    loading: false,
}

const jsonReducers = (state = initalState, action) => {
    switch (action.type) {
        case actions.UPDATE_JSON:
            return {
                ...state,
                json: action.payload,
            }
        case actions.LOADING_JSON:
            return {
                ...state,
                loading: true
            }
        case actions.LOADED_JSON:
            return {
                ...state,
                loading: false
            }
    }
    return state;
}

export default jsonReducers;
