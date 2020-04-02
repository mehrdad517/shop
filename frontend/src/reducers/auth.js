
// Export for unit testing
import {AUTH_LOGIN, AUTH_LOGOUT} from "../types";
import Cookies from "universal-cookie";
import moment from "moment";

export const initialState = {
  login: false,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGOUT:
      return {
        ...state,
        login: false,
        data: []
      };
    case AUTH_LOGIN:
      const cookies = new Cookies();
      cookies.set('auth', action.payload, { path: '/', expires: moment().add(1, "year").toDate() });
      return {
        ...state,
        login: true,
        data: action.payload
      };
    default:
      return state;
  }
};
