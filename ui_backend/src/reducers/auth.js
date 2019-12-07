import {AUTH_LOGIN, AUTH_LOGOUT, UPDATE_SETTING} from "./../actionTypes";

const initialState = {
    login: false,
    user: null,
    token: null,
    setting: null,
    permissions: [],
};

export default  function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                login: true,
                user: action.payload.user,
                token: action.payload.token,
                permissions: action.payload.permissions,
                setting: action.payload.setting
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                login: false,
                user: null,
                token: null,
                setting: null,
                permissions: []
            };
        case UPDATE_SETTING:
            return {
                ...state,
                setting: action.payload
            }
        default:
            return state;
    }
}
