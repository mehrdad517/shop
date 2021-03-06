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
import AppsIcon from '@material-ui/icons/Apps';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Avatar from "@material-ui/core/Avatar";
import CategoryIcon from '@material-ui/icons/Category';

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
                notify_order: this.props.auth.setting && this.props.auth.setting.notify_order != undefined ? this.props.auth.setting.notify_order : false,
                notify_register: this.props.auth.setting && this.props.auth.setting.notify_register != undefined ? this.props.auth.setting.notify_register : false,
                notify_ticket: this.props.auth.setting && this.props.auth.setting.notify_ticket != undefined ? this.props.auth.setting.notify_ticket : false,
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
                <div className='top'>
                    <Avatar sizes={25}/>
                    <span className='user-name'>{this.props.auth.user.name}</span>
                    <span className='role'>{this.props.auth.user.role}</span>
                    <span className='circle'></span>
                </div>
                {this.props.auth.permissions ? <List component="nav" aria-label="main mailbox folders">
                    <ListItem component={Link} onClick={this.handleClose} to='/'>
                        <ListItemIcon>
                            <AppsIcon />
                        </ListItemIcon>
                        <ListItemText primary="صفحه نخست" />
                    </ListItem>
                    <Divider />
                    {Boolean(this.props.auth.permissions.product_category.index.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/categories'>
                        <ListItemIcon>
                            <AccountTreeIcon />
                        </ListItemIcon>
                        <ListItemText primary="دسته بندی محصولات" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.product.index.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/products'>
                        <ListItemIcon>
                            <LocalParkingIcon />
                        </ListItemIcon>
                        <ListItemText primary="محصولات" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.region.index.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/product-lists'>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="محصولات آیتمی" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.brand.index.access) === true &&  <ListItem component={Link} onClick={this.handleClose} to='/brands'>
                        <ListItemIcon>
                            <BrandingWatermarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="برندها" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.group_attribute.index.access) === true &&  <ListItem component={Link} onClick={this.handleClose} to='/attributes'>
                        <ListItemIcon>
                            <EditAttributesIcon />
                        </ListItemIcon>
                        <ListItemText primary="ویژگی ها" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.product_package_type.index.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/package-type'>
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="واحدهای اندازه گیری" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.product_price_parameter.index.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/price-parameter'>
                        <ListItemIcon>
                            <LocalOfferIcon />
                        </ListItemIcon>
                        <ListItemText primary="پارامترهای قیمتی" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.region.index.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/regions'>
                        <ListItemIcon>
                            <MarkunreadMailboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="مناطق پستی" />
                    </ListItem>}
                    <Divider/>
                    {/*{Boolean(this.props.auth.permissions.order.index.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/orders'>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <InboxIcon />*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText primary="سفارشات" />*/}
                    {/*</ListItem>}*/}

                    {/*{Boolean(this.props.auth.permissions.anbar.index.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/anbar'>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <StoreIcon />*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText primary="انبار" />*/}
                    {/*</ListItem>}*/}
                    {/*<Divider/>*/}
                    {Boolean(this.props.auth.permissions.user.index.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/users'>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="کاربران" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.role.set_permission.access) === true && <ListItem component={Link} onClick={this.handleClose} to='/users/access/control/list'>
                        <ListItemIcon>
                            <LockIcon />
                        </ListItemIcon>
                        <ListItemText primary="نقش ها و سطوح دسترسی" />
                    </ListItem>}
                    <Divider/>
                    {Boolean(this.props.auth.permissions.gallery.index.access) === true &&
                    <ListItem component={Link} onClick={this.handleClose} to='/galleries'>
                        <ListItemIcon>
                            <BrokenImageIcon />
                        </ListItemIcon>
                        <ListItemText primary="گالری تصاویر و اسلایدر" />
                    </ListItem>}
                    <Divider/>
                    {Boolean(this.props.auth.permissions.blog_content.index.access) === true &&
                    <ListItem component={Link} onClick={this.handleClose} to='/blog/contents'>
                        <ListItemIcon>
                            <CollectionsBookmarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="مدیریت محتوا" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.blog_category.index.access) === true &&
                    <ListItem component={Link} onClick={this.handleClose} to='/blog/categories'>
                        <ListItemIcon>
                            <AccountTreeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="دسته بندی مطالب"/>
                    </ListItem>
                    }
                    <Divider />
                    {Boolean(this.props.auth.permissions.ticket.index.access) === true &&
                    <ListItem component={Link} onClick={this.handleClose} to='/tickets'>
                        <ListItemIcon>
                            <ContactMailIcon/>
                        </ListItemIcon>
                        <ListItemText primary="امور مشتریان"/>
                    </ListItem>
                    }
                    {Boolean(this.props.auth.permissions.ticket_category.index.access) === true &&
                    <ListItem component={Link} onClick={this.handleClose} to='/tickets/categories'>
                        <ListItemIcon>
                            <AccountTreeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="دسته بندی تیکت ها"/>
                    </ListItem>
                    }
                    <Divider />
                    {Boolean(this.props.auth.permissions.domain.update.access) === true &&
                    <ListItem component={Link} onClick={this.handleClose} to='/menu/hyperlink'>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="مدیریت منو و لینک ها" />
                    </ListItem>}
                    {Boolean(this.props.auth.permissions.domain.update.access) === true &&
                    <ListItem component={Link} onClick={this.handleClose} to='/setting'>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="تنظیمات سایت" />
                    </ListItem>}
                    <Divider/>
                </List> : <CircularProgress color={"secondary"} />}
                {this.props.auth.setting && Boolean(this.props.auth.permissions.domain.update_sticky.access) === true && <List>
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
                            <NotificationsActiveIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="اعلان ثبت نام" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='notify_register'
                                checked={Boolean(this.state.form.notify_register)}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                onChange={this.handleChangeSetting.bind(this)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <NotificationsActiveIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="اعلان خرید" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='notify_order'
                                checked={Boolean(this.state.form.notify_order)}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                onChange={this.handleChangeSetting.bind(this)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <NotificationsActiveIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="اعلان تیکت" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name='notify_ticket'
                                checked={Boolean(this.state.form.notify_ticket)}
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
