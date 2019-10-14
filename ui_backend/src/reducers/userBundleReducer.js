import {} from "../actions/actionTypes";
import {FETCH_ROLES} from "../actions/actionTypes";
import {FETCH_ROLE} from "../actions/actionTypes";
import {FETCH_PERMISSIONS} from "../actions/actionTypes";
import {FETCH_USERS} from "../actions/actionTypes";
import {CREATE_USER} from "../actions/actionTypes";
import {FETCH_USER} from "../actions/actionTypes";

const initialState = {
    users: [],
    user: null,
    permissions:[],
    roles: [],
    role: null,
};

export default  function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS:
            return  {
                ...state,
                users: action.payload
            };
        case FETCH_USER:
            return  {
                ...state,
                user: action.payload
            };
        case FETCH_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload,
            };
        case FETCH_ROLES:
            return {
                ...state,
                roles: action.payload,
            };
        case FETCH_ROLE:
            return {
                ...state,
                role: action.payload,
            };
        default:
            return state;
    }
}
