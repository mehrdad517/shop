import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "./sidebar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import {Fade} from "@material-ui/core";
import Logout from "./logout";
import AuthChangePassword from "./change-password";
import AuthEditProfile from "./edit-profile";
import {Link} from "react-router-dom";
import FilterListIcon from '@material-ui/icons/FilterList';
import GrainIcon from '@material-ui/icons/Grain';
class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {
            profile: false,
            password: false,
            logout: false, // logout dialog
            // menu
            open: false,
            anchorEl: null
        };
    }


    render() {

        const handleClick = event => {
            this.setState({
                anchorEl : event.currentTarget
            })
        };

        const handleClose = () => {
            this.setState({
                anchorEl : null
            });
        };


        return (
            <div>
                <AppBar position="static">
                    <Toolbar  style={{ display: "flex", justifyContent:  'space-between' }}>
                        <IconButton edge="start"  color="inherit" aria-label="menu" onClick={() => this.setState({ open: true})}>
                            <MenuIcon />
                        </IconButton>
                        <Link to={'/'}>
                        <Typography variant="subtitle1" className="animated zoomIn" style={{ color:'#fff', display: "flex", justifyContent:'center'}}>
                            <GrainIcon />&nbsp;
                            <span>شرکت نوآوران دنیای زیبایی هیراد</span>
                        </Typography>
                        </Link>
                        <IconButton id='fade-menu' aria-haspopup="true" onClick={handleClick} style={{ color: '#fff'}}>
                            <AccountCircleRoundedIcon />
                        </IconButton>
                        <Menu
                            id="fade-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={() => this.setState({profile: true, anchorEl: null})}>ویرایش پروفایل</MenuItem>
                            <MenuItem onClick={() => this.setState({password: true, anchorEl: null})}>تغییر رمز</MenuItem>
                            <MenuItem onClick={() => this.setState({logout: true, anchorEl: null})}>
                                <Typography>خروج از سایت</Typography>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer  anchor="left" open={this.state.open} onClose={() => this.setState({ open: false})}>
                    <Sidebar onClose={() => this.setState({ open: false})} />
                </Drawer>
                <Logout open={this.state.logout} onClose={() => this.setState({ logout: false})} />
                <AuthChangePassword open={this.state.password} onClose={() => this.setState({ password: false})} />
                <AuthEditProfile open={this.state.profile} onClose={() => this.setState({ profile: false})} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(
    mapStateToProps
)(Header);
