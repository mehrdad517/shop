import Api from "../api";
import {AUTH_PERMISSIONS, FETCH_SETTING} from "../actionTypes";

export function authPermissions(role) {
    return function (dispatch) {
        new Api().rolePermissions(role).then((response) => {
            dispatch({'type' : AUTH_PERMISSIONS, 'payload' : response});
        }).catch((error) => {
            console.log(error);
        })
    }
}


export function AuthSetting(domain) {
    return function (dispatch) {
        new Api().setting(domain).then((response) => {
            dispatch({'type' : FETCH_SETTING, 'payload' : response});
        }).catch((error) => {
            console.log(error);
        })
    }
}




