import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import InboxIcon from '@material-ui/icons/Inbox';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GroupIcon from '@material-ui/icons/Group';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import LockIcon from '@material-ui/icons/Lock';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import {CircularProgress} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {toast} from "react-toastify";
import Api from "../api";
import {AuthSetting, stickySetting} from "../actions/auth";

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form : {
                register: this.props.auth.setting && this.props.auth.setting.register != undefined ? this.props.auth.setting.register : false,
                maintenance_mode: this.props.auth.setting && this.props.auth.setting.maintenance_mode != undefined ? this.props.auth.setting.maintenance_mode : false,
                basket: this.props.auth.setting && this.props.auth.setting.basket != undefined ? this.props.auth.setting.basket : false,
                android: this.props.auth.setting && this.props.auth.setting.android != undefined ? this.props.auth.setting.android : false,
                ios: this.props.auth.setting && this.props.auth.setting.ios != undefined ? this.props.auth.setting.ios : false,
                user_dashboard: this.props.auth.setting && this.props.auth.setting.user_dashboard != undefined ? this.props.auth.setting.user_dashboard : false,
                admin_panel: this.props.auth.setting && this.props.auth.setting.admin_panel != undefined ? this.props.auth.setting.admin_panel : false,
            }
        };

        this.api = new Api();

    }

    handleChangeSetting = (event) => {
        let form = this.state.form;
        form[event.target.name] = event.target.checked;
        this.setState({
            form
        });

        this.api.updateStickySetting(this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    // update redux setting object
                    this.props.stickySetting();
                } else {
                    toast.error(response.msg);
                }
            }

            this.setState({
                loading: false,
            });
        })
    };

    handleClose = () => {
        this.props.onClose();
    };


    render() {
        return (
            <div className='sidebar' style={{ width: '300px'}}>
                {this.props.auth.permissions ? <List component="nav" aria-label="main mailbox folders">
                    {Boolean(this.props.auth.permissions.product.index.access) ? <ListItem component={Link} onClick={this.handleClose} to='/products'>
                        <ListItemIcon>
                            <LocalParkingIcon />
                        </ListItemIcon>
                        <ListItemText primary="محصولات" />
                    </ListItem>: ''}

                    {Boolean(this.props.auth.permissions.product_category.index.access) === true ?  <ListItem component={Link} onClick={this.handleClose} to='/products/categories'>
                        <ListItemIcon>
                            <AccountTreeIcon />
                        </ListItemIcon>
                        <ListItemText primary="دسته بندی محصولات" />
                    </ListItem>: ''}

                    {Boolean(this.props.auth.permissions.brand.index.access) ?  <ListItem component={Link} onClick={this.handleClose} to='/products/brands'>
                        <ListItemIcon>
                            <BrandingWatermarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="برندها" />
                    </ListItem>: ''}

                    {Boolean(this.props.auth.permissions.group_attribute.index.access) ?  <ListItem component={Link} onClick={this.handleClose} to='/products/attributes'>
                        <ListItemIcon>
                            <EditAttributesIcon />
                        </ListItemIcon>
                        <ListItemText primary="ویژگی ها" />
                    </ListItem>: ''}

                    <Divider/>
                    {Boolean(this.props.auth.permissions.order.index.access) ? <ListItem component={Link} onClick={this.handleClose} to='/orders'>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="سفارشات" />
                    </ListItem> : ''}

                    {Boolean(this.props.auth.permissions.anbar.index.access) ? <ListItem component={Link} onClick={this.handleClose} to='/anbar'>
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="انبار" />
                    </ListItem> : ''}

                    <Divider/>
                    {Boolean(this.props.auth.permissions.user.index.access) ? <ListItem component={Link} onClick={this.handleClose} to='/users'>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="کاربران" />
                    </ListItem> : ''}

                    {Boolean(this.props.auth.permissions.role.set_permission.access) ? <ListItem component={Link} onClick={this.handleClose} to='/users/access/control/list'>
                        <ListItemIcon>
                            <LockIcon />
                        </ListItemIcon>
                        <ListItemText primary="نقش ها و سطوح دسترسی" />
                    </ListItem> : ''}
                    <Divider/>
                    <ListItem component={Link} onClick={this.handleClose} to='/setting'>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="تنظیمات سایت" />
                    </ListItem>
                    <Divider/>
                </List> : <CircularProgress color={"secondary"} />}
                {this.props.auth.setting && <List>
                    <ListItem>
                        <ListItemIcon>
                            <SupervisorAccountIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="پنل ادمین" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='admin_panel'
                                checked={Boolean(this.state.form.admin_panel)}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                onChange={this.handleChangeSetting.bind(this)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="پنل کاربر" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='user_dashboard'
                                checked={Boolean(this.state.form.user_dashboard)}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                onChange={this.handleChangeSetting.bind(this)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="خرید" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='basket'
                                checked={Boolean(this.state.form.basket)}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                onChange={this.handleChangeSetting.bind(this)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <HowToRegIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="ثبت نام" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='register'
                                checked={Boolean(this.state.form.register)}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                onChange={this.handleChangeSetting.bind(this)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AndroidIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="اپ اندروید" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='android'
                                checked={Boolean(this.state.form.android)}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                onChange={this.handleChangeSetting.bind(this)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AppleIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="اپ ios" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='ios'
                                checked={Boolean(this.state.form.ios)}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                onChange={this.handleChangeSetting.bind(this)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <SettingsInputCompositeIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="حالت به روز رسانی" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='maintenance_mode'
                                checked={Boolean(this.state.form.maintenance_mode)}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                onChange={this.handleChangeSetting.bind(this)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        stickySetting: function () {
            dispatch(stickySetting());
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);
