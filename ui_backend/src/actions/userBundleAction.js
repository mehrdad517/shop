import axios from 'axios';
import {CHANGE_ACLPAGELOADING, FETCH_PERMISSIONS, FETCH_ROLE, FETCH_ROLES, FETCH_USERS} from "./actionTypes";

export function fetchRoles() {
    return function (dispatch) {
        axios.get('http://localhost:8000/api/backend/users/roles').then((response) => {
            dispatch({'type' : FETCH_ROLES, 'payload' : response.data});
        }).catch((error) => {
            console.log(error);
        })
    }
}

export function fetchPermissions() {
    return function (dispatch) {
        axios.get('http://localhost:8000/api/backend/users/permissions').then((response) => {
                dispatch({'type' : FETCH_PERMISSIONS, 'payload' : response.data});
        }).catch((error) => {
            console.log(error);
        })
    }
}


export function fetchUsers(object = {page: 1, limit: 10, sort_type: 'desc', sort_field: 'id', search: {}}) {
    return function (dispatch) {
        axios.get('http://localhost:8000/api/backend/users', {
            params: object
        }).then((response) => {
            dispatch({'type' : FETCH_USERS, 'payload' : response.data});
        }).catch((error) => {
            console.log(error);
        })
    }
}