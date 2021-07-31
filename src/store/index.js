//redux bileşenleri import ediliyor.
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

// Persist data için gerekli kütüphane ve storage import ediliyor. 
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';


// Reducer Importing
import tarifReducers from '../store/reducers/tarifReducers';
import jsonReducers from '../store/reducers/jsonReducers';

const rootReducer = combineReducers({
    tarifReducers,
    jsonReducers,
})


// redux-persist ayarları
const persistConfig = {
    // key: "root",
    key: "v1.2.1",
    debug: true,
    storage,
}

// kalıcı data ile reducer'ları combine ediyor.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store ve kalıcıtör export ediliyor.
export let store = createStore(persistedReducer, applyMiddleware(thunk))
export let persistor = persistStore(store)