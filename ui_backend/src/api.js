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

    // change product status
    async  changeProductStatus(id, object) {
        return  axios.put(`http://localhost:8000/api/backend/products/${id}/change/status`, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }



    // fetch user form db
    async fetchUsers(object) {
        return axios.get('http://localhost:8000/api/backend/users', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    // fetch products form db
    async fetchProducts(object) {
        return axios.get('http://localhost:8000/api/backend/products/', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    async fetchAttributes(object) {
        return axios.get('http://localhost:8000/api/backend/products/attributes', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    async fetchAttribute(id) {
        return axios.get('http://localhost:8000/api/backend/products/attributes/' + id,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    async createAttribute(object) {
        return axios.post('http://localhost:8000/api/backend/products/attributes', object,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    async updateAttribute(id, object) {
        return axios.put('http://localhost:8000/api/backend/products/attributes/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    // category
    async fetchProductCategories(object) {
        return axios.get('http://localhost:8000/api/backend/products/categories', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    async fetchProductCategory(id) {
        return axios.get('http://localhost:8000/api/backend/products/categories/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    async createProductCategories(object) {
        return axios.post('http://localhost:8000/api/backend/products/categories', object ,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    async updateProductCategory(id, object) {
        return axios.put('http://localhost:8000/api/backend/products/categories/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }




    // fetch user form db
    async fetchUser(id) {
        return axios.get('http://localhost:8000/api/backend/users/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
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
        return axios.get('http://localhost:8000/api/backend/users/permissions', {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }
    // fetch roles
    async fetchRoles() {
        return axios.get('http://localhost:8000/api/backend/users/roles', {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    // role create
    async createRole(object) {
        return  axios.post('http://localhost:8000/api/backend/users/roles', object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    // set permissions for role
    async  roleSetPermissions(id, object) {
        return  axios.put('http://localhost:8000/api/backend/users/roles/' + id, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            console.log(error);
        })
    }

}


export default Api
