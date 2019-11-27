import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import promise from 'redux-promise';
import {composeWithDevTools} from "redux-devtools-extension";
import auth from "./reducers/auth";

export default createStore(combineReducers({
    auth,
}), composeWithDevTools(applyMiddleware(thunk, promise)));
