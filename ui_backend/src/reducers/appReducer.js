import {CHANGE_HTTP_CODE} from "../actions/actionTypes";

const initialState = {
    login: false,
    user: null,
    token: null,
    http_status: 200
};

export default  function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_HTTP_CODE:
            return {
                ...state,
                http_status: action.payload
            };
        default:
            return state;
    }
}
