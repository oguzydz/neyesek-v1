//redux bileşenleri import ediliyor.
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

// Persist data için gerekli kütüphane ve storage import ediliyor. 
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';


// Reducer Importing
import tarifReducers from '../store/reducers/tarifReducers';

const rootReducer = combineReducers({
    tarifReducers
})


// redux-persist ayarları
const persistConfig = {
    key: "root",
    // key: "v1.1.8",
    debug: true,
    storage,
}

// kalıcı data ile reducer'ları combine ediyor.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store ve kalıcıtör export ediliyor.
export let store = createStore(persistedReducer, applyMiddleware(thunk))
export let persistor = persistStore(store)