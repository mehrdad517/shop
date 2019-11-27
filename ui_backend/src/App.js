import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter, Route} from 'react-router-dom';

import Main from './pages/main'
import OrderList from './pages/orderBundle/order/list';
import AnbarList from './pages/orderBundle/anbar/list';
import OrderView from "./pages/orderBundle/order/show";
import OrderFractiveRequest from "./pages/orderBundle/order/fractiveReqest";
import OrderEditStatus from "./pages/orderBundle/order/edit/status";


import ProductList from './pages/productBundle/product/list'
import CreateProduct from './pages/productBundle/product/create'
import EditProduct from './pages/productBundle/product/edit'
import GroupAttributeList from './pages/productBundle/GroupAttribute/list'
import BrandList from './pages/productBundle/brand/list';
import BrandEdit from './pages/productBundle/brand/edit';
import ProductCategory from './pages/productBundle/productCategory/index'
import AttributeEdit from './pages/productBundle/GroupAttribute/edit'
import ProductCategoryAttribute from './pages/productBundle/productCategory/attribute';
import UserList from './pages/userBundle/user/list';
import Acl from "./pages/userBundle/acl/acl";
import MainLayout from "./pages/layout/main";
import {ToastContainer} from "react-toastify";

import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import 'shabnam-font/dist/font-face.css';
import './assets/styles/style.scss'
import 'react-toastify/dist/ReactToastify.css';

import ProductPins from "./pages/productBundle/product/pins";

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import {authPermissions} from "./actions/auth";


const theme = createMuiTheme({
    direction: "rtl",
    overrides: {
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            text: {
                // Some CSS
                color: 'red',
            },
        },
    },
});
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <StylesProvider jss={jss}>
                    <MuiThemeProvider theme = { theme }>
                        <MainLayout>
                            <Route component={Main} path='/' exact={true} />
                            <Route component={OrderList} path='/orders' />
                            <Route component={AnbarList} path='/anbar' />
                            <Route component={OrderView} path='/orders/:id' />
                            <Route component={OrderFractiveRequest} path='/orders/:id/fractive-request' />
                            <Route component={OrderEditStatus} path='/orders/:id/edit-status' />

                            <Route component={ProductList} path='/products' />
                            <Route component={CreateProduct} path='/products/create' />
                            <Route component={EditProduct} path='/products/edit/:id' />
                            <Route component={ProductPins} path='/products/pins/:id' />
                            <Route component={BrandList} path='/products/brands' />
                            <Route component={BrandEdit} path='/products/brands/:id' />
                            <Route component={ProductCategory} path='/products/categories' />
                            <Route component={ProductCategoryAttribute} path='/products/categories/attributes/:id' />
                            <Route component={GroupAttributeList} path='/products/attributes' />
                            <Route component={AttributeEdit} path='/products/attributes/:id' />

                            <Route component={UserList} path='/users' exact={true} />
                            <Route component={Acl} path='/users/access/control/list' />
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
                    </MuiThemeProvider>
                </StylesProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
