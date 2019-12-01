import {AUTH_CHANGE_LOGIN, AUTH_PERMISSIONS} from "./../actionTypes";

const initialState = {
    login: false,
    user: null,
    token: null,
    permissions: [],
};

export default  function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload
            };
        case AUTH_CHANGE_LOGIN:
            return {
                ...state,
                login: action.payload.login,
                user: action.payload.user,
                token: action.payload.token
            }
        default:
            return state;
    }
}
