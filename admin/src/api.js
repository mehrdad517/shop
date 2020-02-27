import axios from "axios";
import {toast} from 'react-toastify';
import {env} from "./env";

class Api {

    haeders() {
        let token = 'initial token';
        // react persist
        let root = JSON.parse(localStorage.getItem('persist:root'));
        if (root) { // root key from persist
            token = JSON.parse(root.auth).token;
        }
        return {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    // check response after receive
    async dispatchResponse(response) {
        if (typeof  response != "undefined") {
            if (response.status === 401) {
                toast.error('مجددا وارد شوید.');
                localStorage.removeItem('persist:root');
                window.location.reload();
            } else {
                toast.error(response.statusText);
            }
        } else {
            toast.error('خطای سرور');
        }
    }


    // auto complete
    async autoComplete(url, term = null) {
        return axios.get( env.API[window.location.host]+ `/backend/filter/${url}`, {
            headers: this.haeders(),
            params: term
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }


    /* auth api*/
    async login(object) {
        return axios.post( env.API[window.location.host]+ `/login`, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async logout() {
        return axios.get( env.API[window.location.host]+ `/logout`, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }




    /* anbar */
    async fetchAnbar(object) {
        return axios.get( env.API[window.location.host]+ '/backend/anbar/', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // orderBundle
    async fetchOrders(object) {
        return axios.get( env.API[window.location.host]+ '/backend/orders/', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async fetchOrder(id) {
        return axios.get( env.API[window.location.host]+ '/backend/orders/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async fetchOrderStatus()
    {
        return axios.get( env.API[window.location.host]+ '/backend/orders/status', {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }


    async updateOrder(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/orders/' + id, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async orderFractiveRequest(id, object) {
        return axios.post( env.API[window.location.host]+ `/backend/orders/${id}/fractive-request`, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // fetch products form db
    async fetchProducts(object) {
        return axios.get( env.API[window.location.host]+ '/backend/products', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async fetchProduct(id) {
        return axios.get( env.API[window.location.host]+ '/backend/products/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createProduct(object) {
        return axios.post( env.API[window.location.host]+ '/backend/products', object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateProduct(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/products/' + id, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async  changeProductStatus(id, object) {
        return  axios.put( env.API[window.location.host]+ `/backend/products/${id}/change/status`, object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getProductAttributesPins(id) {
        return axios.get( env.API[window.location.host]+ `/backend/products/${id}/pins`,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async storeProductPins(id, object) {
        return axios.post( env.API[window.location.host]+ `/backend/products/${id}/pins`, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getProductCategoryAttributes(id) {
        return axios.get( env.API[window.location.host]+ `/backend/products/categories/${id}/attributes`,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getProductCategoryBrands(id) {
        return axios.get( env.API[window.location.host]+ `/backend/products/categories/${id}/brands`,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getProductCategoryPriceParameters(id) {
        return axios.get( env.API[window.location.host]+ `/backend/products/categories/${id}/priceParameters`,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // in edit from get content id
    // if checked new category send all of checked item to api
    // result response contain all attributes (category attributes) with value (form content)
    async getProductAttributes(id, object) {
        return axios.get( env.API[window.location.host]+ `/backend/products/${id}/categories/${object}/attributes`,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // attributes
    async fetchAttributes(object) {
        return axios.get( env.API[window.location.host]+ '/backend/products/attributes', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async fetchAttribute(id) {
        return axios.get( env.API[window.location.host]+ '/backend/products/attributes/' + id,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createAttribute(object) {
        return axios.post( env.API[window.location.host]+ '/backend/products/attributes', object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateAttribute(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/products/attributes/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }



    // brand
    async fetchBrands(object) {
        return axios.get( env.API[window.location.host]+ '/backend/products/brands', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async fetchBrand(id) {
        return axios.get( env.API[window.location.host]+ '/backend/products/brands/' + id,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createBrand(object) {
        return axios.post( env.API[window.location.host]+ '/backend/products/brands', object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateBrand(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/products/brands/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // category
    async fetchProductCategories(object) {
        return axios.get( env.API[window.location.host]+ '/backend/products/categories', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async fetchProductCategory(id) {
        return axios.get( env.API[window.location.host]+ '/backend/products/categories/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createProductCategories(object) {
        return axios.post( env.API[window.location.host]+ '/backend/products/categories', object ,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateProductCategory(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/products/categories/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async storeProductCategoryAttribute(id, object) {
        return axios.post( env.API[window.location.host]+ `/backend/products/categories/${id}/attributes`, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // get product category All Attributes With Checked
    getAllAttributesWithChecked(id, object) {
        return axios.get( env.API[window.location.host]+ `/backend/products/categories/${id}/getAllAttributesWithChecked`,{
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async storeProductCategoryBrands(id, object) {
        return axios.post( env.API[window.location.host]+ `/backend/products/categories/${id}/brands`, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    getAllBrandsWithChecked(id, object) {
        return axios.get( env.API[window.location.host]+ `/backend/products/categories/${id}/getAllBrandsWithChecked`,{
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async storeProductCategoryPriceParameters(id, object) {
        return axios.post( env.API[window.location.host]+ `/backend/products/categories/${id}/priceParameters`, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    getAllPriceParametersWithChecked(id, object) {
        return axios.get( env.API[window.location.host]+ `/backend/products/categories/${id}/getAllPriceParametersWithChecked`,{
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // package type
    async fetchPackageTypes(object) {
        return axios.get( env.API[window.location.host]+ '/backend/products/package-types', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async fetchPackageType(id) {
        return axios.get( env.API[window.location.host]+ '/backend/products/package-types/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createPackageType(object) {
        return axios.post( env.API[window.location.host]+ '/backend/products/package-types', object ,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updatePackageType(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/products/package-types/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }
    // price parameter
    async getPriceParameters(flat_mode = false) {
        return axios.get( env.API[window.location.host]+ '/backend/products/price-parameters', {
            headers: this.haeders(),
            params: {flat_mode: Boolean(flat_mode)}
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getPriceParameter(id) {
        return axios.get( env.API[window.location.host]+ '/backend/products/price-parameters/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createPriceParameter(object) {
        return axios.post( env.API[window.location.host]+ '/backend/products/price-parameters', object ,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updatePriceParameter(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/products/price-parameters/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // fetch user form db
    async fetchUsers(object) {
        return axios.get( env.API[window.location.host]+ '/backend/users', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async fetchUser(id) {
        return axios.get( env.API[window.location.host]+ '/backend/users/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // create user
    async  createUser(object) {
        return  axios.post( env.API[window.location.host]+ '/backend/users', object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // edit user
    async  editUser(id, object) {
        return  axios.put( env.API[window.location.host]+ '/backend/users/' + id, object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async  AuthEditProfile(object) {
        return  axios.post( env.API[window.location.host]+ '/change-profile', object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // change password
    async  changePasswordUser(id, object) {
        return  axios.put( env.API[window.location.host]+ `/backend/users/${id}/change-password`, object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async  AuthChangePassword(object) {
        return  axios.post( env.API[window.location.host]+ `/change-password`, object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }


    async  sendValidationCode(object) {
        return  axios.post( env.API[window.location.host]+ `/validation-code/send`, object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async  verifyValidationCode(object) {
        return  axios.post( env.API[window.location.host]+ `/validation-code/verify`, object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async  passwordValidationCode(object) {
        return  axios.post( env.API[window.location.host]+ `/validation-code/change-password`, object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }


    // change status
    async  changeStatus(id, object) {
        return  axios.put( env.API[window.location.host]+ `/backend/users/${id}/change-status`, object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }


    // fetch roles
    async fetchRoles() {
        return axios.get( env.API[window.location.host]+ '/backend/users/roles', {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // role create
    async createRole(object) {
        return  axios.post( env.API[window.location.host]+ '/backend/users/roles', object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // set permissions for role
    async  roleSetPermissions(id, object) {
        return  axios.put( env.API[window.location.host]+ '/backend/users/roles/' + id + '/permissions', object, {
            headers: this.haeders()
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    /* auth api */
    async rolePermissions(role, map = false){
        return axios.get( env.API[window.location.host]+ `/backend/users/roles/${role}/permissions`, {
            headers: this.haeders(),
            params: {map: map}
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // all api for setting
    async setting(){
        return axios.get( env.API[window.location.host]+ `/backend/setting`, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateSetting(object){
        return axios.put( env.API[window.location.host]+ `/backend/setting`, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async stickySetting(){
        return axios.get( env.API[window.location.host]+ `/backend/setting/sticky-setting`, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateStickySetting(object){
        return axios.put( env.API[window.location.host]+ `/backend/setting/sticky-setting`, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async domainLinks(){
        return axios.get( env.API[window.location.host]+ `/backend/setting/links`, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }


    /* reports */
    async salesReport(token){
        return axios.get( env.API[window.location.host]+ `/backend/reports/sales-daily-report`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async mapReports(token){
        return axios.get( env.API[window.location.host]+ `/backend/reports/map-reports`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // blog
    async getBlogCategories() {
        return axios.get( env.API[window.location.host]+ '/backend/blog/categories', {
            headers: this.haeders()
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getBlogCategory(id) {
        return axios.get( env.API[window.location.host]+ '/backend/blog/categories/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createBlogCategories(object) {
        return axios.post( env.API[window.location.host]+ '/backend/blog/categories', object ,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateBlogCategory(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/blog/categories/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // blog content
    async getContents(object) {
        return axios.get( env.API[window.location.host]+ '/backend/blog/contents', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getContent(id) {
        return axios.get( env.API[window.location.host]+ '/backend/blog/contents/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async postContent(object) {
        return axios.post( env.API[window.location.host]+ '/backend/blog/contents', object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async putContent(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/blog/contents/' + id, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // galleries
    async getGalleries(object) {
        return axios.get( env.API[window.location.host]+ '/backend/galleries', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getGallery(id) {
        return axios.get( env.API[window.location.host]+ '/backend/galleries/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async postGallery(object) {
        return axios.post( env.API[window.location.host]+ '/backend/galleries', object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async putGallery(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/galleries/' + id, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // product list
    async getProductLists(object) {
        return axios.get( env.API[window.location.host]+ '/backend/products/product-lists', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getProductList(id) {
        return axios.get( env.API[window.location.host]+ '/backend/products/product-lists/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async postProductList(object) {
        return axios.post( env.API[window.location.host]+ '/backend/products/product-lists', object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async putProductList(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/products/product-lists/' + id, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }


    /* Attachment File, Image video etc ... */
    async attachment(object) {
        return axios.post( env.API[window.location.host]+ '/backend/attachment', object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async unlink(params) {
        return axios.delete( env.API[window.location.host]+ '/backend/attachment', {
            params : params,
            headers: this.haeders(),
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // Ticket And Conversation
    async getTickets(object) {
        return axios.get( env.API[window.location.host]+ '/backend/tickets', {
            headers: this.haeders(),
            params: object
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async postTicket(object) {
        return axios.post( env.API[window.location.host]+ '/backend/tickets', object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async putTicket(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/tickets/' + id, object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // With Conversations
    async getTicketConversations(id) {
        return axios.get( env.API[window.location.host]+ '/backend/tickets/' + id + '/conversations', {
            headers: this.haeders()
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async postTicketConversations(id, object) {
        return axios.post( env.API[window.location.host]+ '/backend/tickets/' + id + '/conversations', object, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async deleteTicketConversations(ticket, id) {
        return axios.delete( env.API[window.location.host]+ '/backend/tickets/' + ticket + '/conversations/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getTicketCategories(flat_mode = false) {
        return axios.get( env.API[window.location.host]+ '/backend/tickets/categories', {
            headers: this.haeders(),
            params: {flat_mode: Boolean(flat_mode)}
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getTicketCategory(id) {
        return axios.get( env.API[window.location.host]+ '/backend/tickets/categories/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createTicketCategories(object) {
        return axios.post( env.API[window.location.host]+ '/backend/tickets/categories', object ,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateTicketCategory(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/tickets/categories/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

//     regions
    async getRegions(flat_mode = false) {
        return axios.get( env.API[window.location.host]+ '/backend/regions', {
            headers: this.haeders(),
            params: {flat_mode: Boolean(flat_mode)}
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getRegion(id) {
        return axios.get( env.API[window.location.host]+ '/backend/regions/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createRegions(object) {
        return axios.post( env.API[window.location.host]+ '/backend/regions', object ,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateRegion(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/regions/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async test() {
        return axios.get( env.API[window.location.host]+ '/products', {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    // hyper link
    async getHyperlinks(flat_mode = false) {
        return axios.get( env.API[window.location.host]+ '/backend/menu/hyperlinks', {
            headers: this.haeders(),
            params: {flat_mode: Boolean(flat_mode)}
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async getHyperlink(id) {
        return axios.get( env.API[window.location.host]+ '/backend/menu/hyperlinks/' + id, {
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async createHyperlinks(object) {
        return axios.post( env.API[window.location.host]+ '/backend/menu/hyperlinks', object ,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }

    async updateHyperlink(id, object) {
        return axios.put( env.API[window.location.host]+ '/backend/menu/hyperlinks/' + id, object,{
            headers: this.haeders(),
        }).then( (response) => {
            return response.data;
        }).catch((error) => {
            return this.dispatchResponse(error.response)
        })
    }





}


export default Api
