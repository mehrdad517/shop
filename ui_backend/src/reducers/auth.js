import {AUTH_PERMISSIONS} from "./../actionTypes";

const initialState = {
    login: false,
    user: null,
    token: null,
    permissions: [],
};

export default  function appReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload
            };
        default:
            return state;
    }
}
