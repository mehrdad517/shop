import React, {Component} from 'react';
import { Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from "./login";
import ResetPassword from "./reset-password";
import Index from "./index";
import AnbarList from "./orderBundle/anbar/list";
import OrderList from "./orderBundle/order/list";
import OrderView from "./orderBundle/order/show";
import OrderFractiveRequest from "./orderBundle/order/fractiveReqest";
import OrderEditStatus from "./orderBundle/order/edit/status";
import ProductList from "./productBundle/product/list";
import CreateProduct from "./productBundle/product/create";
import EditProduct from "./productBundle/product/edit";
import ProductPins from "./productBundle/product/pins";
import BrandList from "./productBundle/brand/list";
import BrandEdit from "./productBundle/brand/edit";
import ProductCategory from "./productBundle/productCategory";
import ProductCategoryAttribute from "./productBundle/productCategory/attribute";
import GroupAttributeList from "./productBundle/GroupAttribute/list";
import AttributeEdit from "./productBundle/GroupAttribute/edit";
import UserList from "./userBundle/user/list";
import Acl from "./userBundle/acl/acl";
import Setting from "./setting";
import {history} from "../store";
import {ConnectedRouter} from "connected-react-router";
import Header from "./header";
import {push} from 'connected-react-router';


import './../assets/styles/style.scss'

class Router extends Component {

    componentDidMount() {

        if (!this.props.auth.login) {
            this.props.redirect();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (!this.props.auth.login) {
            this.props.redirect();
        }
    }


    render() {
        return (
            <ConnectedRouter  history={ history }>
                {this.props.auth.login ? <Header /> : ''}
                <Route component={Login} path='/' exact={true} />
                <Route component={ResetPassword} path='/password/reset' />
                <Route component={Index} path='/dashboard' exact={true} />
                <Route component={AnbarList} path='/anbar' exact={true} />
                <Route component={OrderList} path='/orders' exact={true} />
                <Route component={OrderView} exact={true} path='/orders/:id' />
                <Route component={OrderFractiveRequest} path='/orders/:id/fractive-request' />
                <Route component={OrderEditStatus} path='/orders/:id/edit-status' />
                <Route component={ProductList} path='/products' exact={true} />
                <Route component={CreateProduct} path='/products/create' />
                <Route component={EditProduct} path='/products/edit/:id' />
                <Route component={ProductPins} path='/products/pins/:id' />
                <Route component={BrandList} path='/products/brands' exact />
                <Route component={BrandEdit} path='/products/brands/:id' />
                <Route component={ProductCategory} path='/products/categories' axact />
                <Route component={ProductCategoryAttribute} path='/products/categories/attributes/:id' />
                <Route component={GroupAttributeList} path='/products/attributes' exact />
                <Route component={AttributeEdit} path='/products/attributes/:id' />
                <Route component={UserList} path='/users' exact={true} />
                <Route component={Acl} path='/users/access/control/list' />
                <Route component={Setting} path={'/setting'} />
            </ConnectedRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        redirect: function () {
            dispatch(push('/'));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router);
