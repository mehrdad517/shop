import Api from "../api";
import {AUTH_PERMISSIONS} from "../actionTypes";

export function authPermissions(role) {
    return function (dispatch) {
        new Api().rolePermissions(role).then((response) => {
            dispatch({'type' : AUTH_PERMISSIONS, 'payload' : response});
        }).catch((error) => {
            console.log(error);
        })
    }
}




