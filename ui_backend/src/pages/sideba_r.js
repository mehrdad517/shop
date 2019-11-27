import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import {Link} from 'react-router-dom'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
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

export default class Sidebar extends Component{

    handleClose = () => {
        this.props.onClose();
    };

    render() {


        return (
            <div className='sidebar' style={{ width: '300px'}}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem component={Link} onClick={this.handleClose} to='/products'>
                        <ListItemIcon>
                            <LocalParkingIcon />
                        </ListItemIcon>
                        <ListItemText primary="محصولات" />
                    </ListItem>
                    <ListItem component={Link} onClick={this.handleClose} to='/products/categories'>
                        <ListItemIcon>
                            <AccountTreeIcon />
                        </ListItemIcon>
                        <ListItemText primary="دسته بندی محصولات" />
                    </ListItem>
                    <ListItem component={Link} onClick={this.handleClose} to='/products/brands'>
                        <ListItemIcon>
                            <BrandingWatermarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="برندها" />
                    </ListItem>
                    <ListItem component={Link} onClick={this.handleClose} to='/products/attributes'>
                        <ListItemIcon>
                            <EditAttributesIcon />
                        </ListItemIcon>
                        <ListItemText primary="ویژگی ها" />
                    </ListItem>
                    <Divider/>
                    <ListItem component={Link} onClick={this.handleClose} to='/orders'>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="سفارشات" />
                    </ListItem>
                    <ListItem component={Link} onClick={this.handleClose} to='/anbar'>
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="انبار" />
                    </ListItem>
                    <Divider/>
                    <ListItem component={Link} onClick={this.handleClose} to='/users'>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="کاربران" />
                    </ListItem>
                    <ListItem component={Link} onClick={this.handleClose} to='/users/access/control/list'>
                        <ListItemIcon>
                            <LockIcon />
                        </ListItemIcon>
                        <ListItemText primary="سطوح دسترسی" />
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemIcon>
                            <SettingsInputCompositeIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="سایت" />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={true}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
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
                                checked={true}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
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
                                checked={true}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
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
                                checked={false}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
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
                                checked={false}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </div>
        )
    }


}
