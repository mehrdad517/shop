import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import promise from 'redux-promise';
import {composeWithDevTools} from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import auth from "./reducers/auth";
import {createBrowserHistory} from "history";
import { routerMiddleware } from 'connected-react-router'
import { connectRouter } from 'connected-react-router'
import exportedEqual from "react-select/src/internal/react-fast-compare";
export const history = createBrowserHistory();

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth
});

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history),
);

export default function configureStore(preloadedState) {
    const store = createStore(
        persistedReducer, // root reducer with router state
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                thunk,
                promise
            ),
        ),
    );

    const persistor = persistStore(store);

    return {store, persistor};
}



