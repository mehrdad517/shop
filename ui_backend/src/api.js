import axios from "axios";
import {CHANGE_HTTP_CODE} from "./actions/actionTypes";
import header from "./pages/header";

class Api {

    async haeders() {
        return {
            'Accept': 'application/json',
            "cache-control": "no-cache",
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': ''
        }
    }

    async dispatchResponse(response) {
        if (response.status === 401) {
            return function (dispatch) {
                // sign out user
            }
        } else if (response.status === 500) {
            alert('500 error');
        }

        return response.data;
    }


    async fetchUser(id) {
        return axios.get('http://localhost:8000/api/backend/users/' + id).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    async  createUser(object) {
        return  axios.post('http://localhost:8000/api/backend/users', object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    async  editUser(id, object) {
        return  axios.put('http://localhost:8000/api/backend/users/' + id, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

}


export default Api
