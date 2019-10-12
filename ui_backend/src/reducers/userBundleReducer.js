import {} from "../actions/actionTypes";
import {FETCH_ROLES} from "../actions/actionTypes";
import {FETCH_ROLE} from "../actions/actionTypes";
import {FETCH_PERMISSIONS} from "../actions/actionTypes";
import {FETCH_USERS} from "../actions/actionTypes";

const initialState = {
    users: [],
    user: null,
    permissions:[],
    roles: [],
    role: null,
    aclPageLoading: false
};

export default  function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS:
            return  {
                ...state,
                users: action.payload
            };
        case FETCH_PERMISSIONS:
            return {
                ...state,
                aclPageLoading: true,
                permissions: action.payload,
            };
        case FETCH_ROLES:
            return {
                ...state,
                aclPageLoading: true,
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
