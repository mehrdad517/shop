import { FETCH_ROLES, FETCH_USER, FETCH_USERS} from "./../actionTypes";
import Api from "../api";

export function fetchUser(id) {
    return function (dispatch) {
        new Api().fetchUser(id).then((response) => {
            dispatch({'type' : FETCH_USER, 'payload' : response});
        }).catch((error) => {
            console.log(error);
        })
    }
}


export function fetchUsers(object = {page: 1, limit: 10, sort_type: 'desc', sort_field: 'id', search: {}}) {
    return function (dispatch) {
        new Api().fetchUsers(object).then((response) => {
            dispatch({'type' : FETCH_USERS, 'payload' : response});
        }).catch((error) => {
            console.log(error);
        })
    }
}



export function fetchRoles() {
    return function (dispatch) {
        new Api().fetchRoles().then((response) => {
            dispatch({'type' : FETCH_ROLES, 'payload' : response});
        }).catch((error) => {
            console.log(error);
        })
    }
}




