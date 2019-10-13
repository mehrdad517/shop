import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import promise from 'redux-promise';
import {composeWithDevTools} from "redux-devtools-extension";
import userBundleReducer from './reducers/userBundleReducer'
import appReducer from "./reducers/appReducer";

export default createStore(combineReducers({
    appReducer,
    userBundleReducer,
}), composeWithDevTools(applyMiddleware(thunk, promise)));
