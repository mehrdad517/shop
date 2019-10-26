import axios from "axios";
import {toast} from 'react-toastify';
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
            toast.error(error.message);
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
            toast.error(error.message);
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
            toast.error(error.message);
        })
    }

    async fetchAttributes(object) {
        return axios.get('http://localhost:8000/api/backend/products/attributes', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async fetchAttribute(id) {
        return axios.get('http://localhost:8000/api/backend/products/attributes/' + id,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async createAttribute(object) {
        return axios.post('http://localhost:8000/api/backend/products/attributes', object,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async updateAttribute(id, object) {
        return axios.put('http://localhost:8000/api/backend/products/attributes/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }



    // brand
    async fetchBrands(object) {
        return axios.get('http://localhost:8000/api/backend/products/brands', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async fetchBrand(id) {
        return axios.get('http://localhost:8000/api/backend/products/brands/' + id,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async createBrand(object) {
        return axios.post('http://localhost:8000/api/backend/products/brands', object,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async updateBrand(id, object) {
        return axios.put('http://localhost:8000/api/backend/products/brands/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
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
            toast.error(error.message);
        })
    }

    async fetchProductCategory(id) {
        return axios.get('http://localhost:8000/api/backend/products/categories/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async createProductCategories(object) {
        return axios.post('http://localhost:8000/api/backend/products/categories', object ,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async updateProductCategory(id, object) {
        return axios.put('http://localhost:8000/api/backend/products/categories/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async storeProductCategoryAttribute(id, object) {
        return axios.post(`http://localhost:8000/api/backend/products/categories/${id}/attributes`, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async getProductCategoryAttributes(id) {
        return axios.get(`http://localhost:8000/api/backend/products/categories/${id}/attributes`,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }



    // fetch user form db
    async fetchUser(id) {
        return axios.get('http://localhost:8000/api/backend/users/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    // create user
    async  createUser(object) {
        return  axios.post('http://localhost:8000/api/backend/users', object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    // edit user
    async  editUser(id, object) {
        return  axios.put('http://localhost:8000/api/backend/users/' + id, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    // change password
    async  changePasswordUser(id, object) {
        return  axios.put(`http://localhost:8000/api/backend/users/${id}/change/password`, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    // change password
    async  changeStatus(id, object) {
        return  axios.put(`http://localhost:8000/api/backend/users/${id}/change/status`, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }


    //    fetch permissions
    async fetchPermissions() {
        return axios.get('http://localhost:8000/api/backend/users/permissions', {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }
    // fetch roles
    async fetchRoles() {
        return axios.get('http://localhost:8000/api/backend/users/roles', {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    // role create
    async createRole(object) {
        return  axios.post('http://localhost:8000/api/backend/users/roles', object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    // set permissions for role
    async  roleSetPermissions(id, object) {
        return  axios.put('http://localhost:8000/api/backend/users/roles/' + id, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

}


export default Api
