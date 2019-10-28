import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import {Route} from 'react-router-dom';
import UserList from './pages/userBundle/user/list';
import ProductList from './pages/productBundle/product/list'
import CreateProduct from './pages/productBundle/product/create'
import GroupAttributeList from './pages/productBundle/GroupAttribute/list'
import BrandList from './pages/productBundle/brand/list';
import BrandEdit from './pages/productBundle/brand/edit';
import ProductCategory from './pages/productBundle/productCategory/index'
import AttributeEdit from './pages/productBundle/GroupAttribute/edit'
import ProductCategoryAttribute from './pages/productBundle/productCategory/attribute';
import Acl from "./pages/userBundle/acl/acl";
import MainLayout from "./pages/layout/main";
import {ToastContainer} from "react-toastify";

import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import 'shabnam-font/dist/font-face.css';
import './assets/styles/style.scss'
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Provider store={store}>
            <MainLayout>
                <Route component={UserList} path='/users' exact={true} />
                <Route component={Acl} path='/users/access/control/list' />
                <Route component={ProductList} path='/products' exact={true} />
                <Route component={CreateProduct} path='/products/create' />
                <Route component={BrandList} path='/products/brands' exact={true} />
                <Route component={BrandEdit} path='/products/brands/:id' />
                <Route component={ProductCategory} path='/products/categories' exact={true} />
                <Route component={ProductCategoryAttribute} path='/products/categories/attributes/:id' />
                <Route component={GroupAttributeList} path='/products/attributes' exact={true} />
                <Route component={AttributeEdit} path='/products/attributes/:id' />
            </MainLayout>
            <ToastContainer position="top-left"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl
                            pauseOnVisibilityChange
                            draggable={false}
                            pauseOnHover />
        </Provider>
    );
}

export default App;
