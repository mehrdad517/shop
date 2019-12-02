import axios from "axios";
import {toast} from 'react-toastify';

class Api {

    haeders() {
        let auth = JSON.parse(localStorage.getItem('persist:root')).auth;
        let token = JSON.parse(auth).token;
        return {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
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


    // auto complete
    async autoComplete(table, term) {
        return axios.get(`http://localhost:8000/api/backend/filter/${table}`, {
            headers: this.haeders(),
            params: term
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }


    /* auth api*/

    async login(object) {
        return axios.post(`http://localhost:8000/api/login`, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }




    /* anbar */
    async fetchAnbar(object) {
        return axios.get('http://localhost:8000/api/backend/anbar/', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    // orderBundle
    async fetchOrders(object) {
        return axios.get('http://localhost:8000/api/backend/orders/', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async fetchOrder(id) {
        return axios.get('http://localhost:8000/api/backend/orders/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async fetchOrderStatus()
    {
        return axios.get('http://localhost:8000/api/backend/orders/status', {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }


    async updateOrder(id, object) {
        return axios.put('http://localhost:8000/api/backend/orders/' + id, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async orderFractiveRequest(id, object) {
        return axios.post(`http://localhost:8000/api/backend/orders/${id}/fractive-request`, object, {
            headers: this.haeders(),
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

    async fetchProduct(id) {
        return axios.get('http://localhost:8000/api/backend/products/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async createProduct(object) {
        return axios.post('http://localhost:8000/api/backend/products', object, {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async updateProduct(id, object) {
        return axios.put('http://localhost:8000/api/backend/products/' + id, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async  changeProductStatus(id, object) {
        return  axios.put(`http://localhost:8000/api/backend/products/${id}/change/status`, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async getProductAttributesPins(id) {
        return axios.get(`http://localhost:8000/api/backend/products/${id}/pins`,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    async storeProductPins(id, object) {
        return axios.post(`http://localhost:8000/api/backend/products/${id}/pins`, object,{
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

    // in edit from get product id
    // if checked new category send all of checked item to api
    // result response contain all attributes (category attributes) with value (form product)
    async getProductAttributes(id, object) {
        return axios.get(`http://localhost:8000/api/backend/products/${id}/categories/${object}/attributes`,{
            headers: this.haeders(),
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }


    // attributes
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
        return  axios.put(`http://localhost:8000/api/backend/users/${id}/change-password`, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    // change password
    async  changeStatus(id, object) {
        return  axios.put(`http://localhost:8000/api/backend/users/${id}/change-status`, object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }


    //    fetch all permissions
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
        return  axios.put('http://localhost:8000/api/backend/users/roles/' + id + '/permissions', object, {
            headers: this.haeders()
        }).then((response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    /* auth api */
    async rolePermissions(role, map = false){
        return axios.get(`http://localhost:8000/api/backend/users/roles/${role}/permissions`, {
            headers: this.haeders(),
            params: {map: map}
        }).then( (response) => {
            return this.dispatchResponse(response);
        }).catch((error) => {
            toast.error(error.message);
        })
    }



}


export default Api
