import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import {Route} from 'react-router-dom';

import UserList from './pages/userBundle/user/list';
import ProductList from './pages/productBundle/product/list'
import GroupAttributeList from './pages/productBundle/GroupAttribute/list'
import BrandList from './pages/productBundle/brand/list';

import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import 'shabnam-font/dist/font-face.css';


import './assets/styles/style.scss'
import Acl from "./pages/userBundle/acl/acl";
import MainLayout from "./pages/layout/main";



function App() {
    return (
            <Provider store={store}>
                <MainLayout>
                    <Route component={UserList} path='/users' exact={true} />
                    <Route component={Acl} path='/users/access/control/list' />
                    <Route component={ProductList} path='/products' exact={true} />
                    <Route component={GroupAttributeList} path='/products/attributes' />
                    <Route component={BrandList} path='/products/brands' />
                </MainLayout>
            </Provider>
    );
}

export default App;
