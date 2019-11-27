import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import promise from 'redux-promise';
import {composeWithDevTools} from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import auth from "./reducers/auth";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    auth,
}));

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, promise)));
export const persistor = persistStore(store);
