import axios from "axios";

class Api {

    async haeders() {
        return {
            'Accept': 'application/json',
            "cache-control": "no-cache",
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': ''
        }
    }

    // check response after receive
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


    // fetch user form db
    async fetchUser(id) {
        return axios.get('http://localhost:8000/api/backend/users/' + id).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    // create user
    async  createUser(object) {
        return  axios.post('http://localhost:8000/api/backend/users', object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    // edit user
    async  editUser(id, object) {
        return  axios.put('http://localhost:8000/api/backend/users/' + id, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    // change password
    async  changePasswordUser(id, object) {
        return  axios.put(`http://localhost:8000/api/backend/users/${id}/change/password`, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    // change password
    async  changeStatus(id, object) {
        return  axios.put(`http://localhost:8000/api/backend/users/${id}/change/status`, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }


    //    fetch permissions
    async fetchPermissions() {
        return axios.get('http://localhost:8000/api/backend/users/permissions').then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

}


export default Api
