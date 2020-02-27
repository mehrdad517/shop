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
import ProductCategoryEdit from "./productBundle/productCategory/edit";
import ProductCategoryAttribute from "./productBundle/productCategory/attribute";
import ProductCategoryBrands from "./productBundle/productCategory/brands";
import ProductCategoryPriceParameters from "./productBundle/productCategory/priceParameters";
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
import TicketCategory from "./ticketBundle/category/index";
import './../assets/styles/style.scss'
import ContentCreate from "./blogBundle/content/create";
import ContentEdit from "./blogBundle/content/edit";
import BlogCategoryEdit from "./blogBundle/category/edit";
import PackageType from './productBundle/packageType/index'
import PriceParameter from './productBundle/priceParameter/index'
import Gallery from './galleryBundle/list'
import GalleryCreate from './galleryBundle/create'
import GalleryEdit from './galleryBundle/edit'
import ProductListItem from './productBundle/productList/list'
import ProductListCreate from './productBundle/productList/create'
import ProductListEdit from './productBundle/productList/edit'
import Region from "./regionBundle";
import Hyperlink from "./menuBundle/hyperlink/index";

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

                        <Route component={GroupAttributeList} path='/attributes' exact={true}/>
                        <Route component={AttributeEdit} path='/attributes/:id'/>

                        <Route component={BrandList} path='/brands' exact={true}/>
                        <Route component={BrandEdit} path='/brands/:id'/>

                        <Route component={ProductCategory} path='/categories' exact={true}/>
                        <Route component={ProductCategoryEdit} path='/categories/:id' exact={true}/>
                        <Route component={ProductCategoryAttribute} path='/categories/:id/attributes' exact />
                        <Route component={ProductCategoryBrands} path='/categories/:id/brands' exact />
                        <Route component={ProductCategoryPriceParameters} path='/categories/:id/price-parameters' exact />

                        <Route component={PackageType} path='/package-type' exact={true}/>

                        <Route component={PriceParameter} path='/price-parameter' exact={true}/>


                        <Route component={ProductListItem} path='/product-lists' exact={true}/>
                        <Route component={ProductListCreate} path='/product-lists/create'/>
                        <Route component={ProductListEdit} path='/product-lists/:id/edit'/>

                        <Route component={UserList} path='/users' exact={true}/>
                        <Route component={Acl} path='/users/access/control/list'/>
                        <Route component={Setting} path={'/setting'} exact={true}/>

                        <Route component={BlogContent} path='/blog/contents' exact={true}/>
                        <Route component={ContentCreate} path='/blog/contents/create'/>
                        <Route component={ContentEdit} path='/blog/contents/:id/edit'/>

                        <Route component={BlogCategory} path='/blog/categories' exact={true}/>
                        <Route component={BlogCategoryEdit} path='/blog/categories/:id' exact={true}/>

                        <Route component={Gallery} path='/galleries' exact={true}/>
                        <Route component={GalleryCreate} path='/galleries/create'/>
                        <Route component={GalleryEdit} path='/galleries/:id/edit'/>

                        <Route component={Ticket} path={'/tickets'} exact={true} />
                        <Route component={TicketCategory} path='/tickets/categories' exact={true}/>


                        <Route component={Region} path='/regions' exact={true}/>

                        <Route component={Hyperlink} path='/menu/hyperlink' exact={true}/>

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
