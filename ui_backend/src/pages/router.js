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
import BlogCategory from './blogBundle/category/index'
import BlogContent from './blogBundle/content/list'
import Ticket from './ticketBundle/list'

import './../assets/styles/style.scss'
import ContentCreate from "./blogBundle/content/create";
import ContentEdit from "./blogBundle/content/edit";

class Router extends Component {

    componentDidMount() {

        if (!this.props.auth.login) {
            this.props.redirect();
        }
    }


    render() {
        return (
            <>
                {!this.props.auth.login ?
                    <ConnectedRouter  history={ history }>
                        <Route component={Login} path='/' exact={true}/>
                        <Route component={ResetPassword} path='/password/reset'/>
                    </ConnectedRouter>
                    :
                    <ConnectedRouter  history={ history }>
                        <Header/>
                        <Route component={Index} path='/' exact={true}/>
                        <Route component={AnbarList} path='/anbar' exact={true}/>

                        <Route component={OrderList} path='/orders' exact={true}/>
                        <Route component={OrderView} exact={true} path='/orders/:id'/>
                        <Route component={OrderFractiveRequest} path='/orders/:id/fractive-request'/>
                        <Route component={OrderEditStatus} path='/orders/:id/edit-status'/>

                        <Route component={ProductList} path='/products' exact={true}/>
                        <Route component={CreateProduct} path='/products/create'/>
                        <Route component={EditProduct} path='/products/edit/:id'/>
                        <Route component={ProductPins} path='/products/pins/:id'/>

                        <Route component={GroupAttributeList} path='/products/attributes' exact={true}/>
                        <Route component={AttributeEdit} path='/products/attributes/:id'/>

                        <Route component={BrandList} path='/brands' exact={true}/>
                        <Route component={BrandEdit} path='/brands/:id'/>

                        <Route component={ProductCategory} path='/categories' exact={true}/>
                        <Route component={ProductCategoryAttribute} path='/categories/:id/attributes' />

                        <Route component={UserList} path='/users' exact={true}/>
                        <Route component={Acl} path='/users/access/control/list'/>
                        <Route component={Setting} path={'/setting'} exact={true}/>

                        <Route component={BlogContent} path='/blog/contents' exact={true}/>
                        <Route component={ContentCreate} path='/blog/contents/create'/>
                        <Route component={ContentEdit} path='/blog/contents/:id/edit'/>
                        <Route component={BlogCategory} path='/blog/categories' exact={true}/>

                        <Route component={Ticket} path={'/tickets'} exact={true} />

                    </ConnectedRouter>
                }
            </>
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
