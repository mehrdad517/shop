import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import promise from 'redux-promise';
import userBundleReducer from './reducers/userBundleReducer'
import {composeWithDevTools} from "redux-devtools-extension";

export default createStore(combineReducers({
    userBundleReducer
}), composeWithDevTools(applyMiddleware(thunk, promise)));
