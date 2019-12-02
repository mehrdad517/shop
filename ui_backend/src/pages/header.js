import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "./sidebar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import {Fade} from "@material-ui/core";
import Logout from "../logout";


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logout: false, // logout dialog
            // menu
            open: false,
            anchorEl: null
        };
    }


    render() {

        const handleClick = event => {
            this.setState({
                anchorEl: true
            })
        };

        const handleClose = () => {
            this.setState({
                anchorEl : null
            });
        };


        return (
            <div style={{ flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start"  color="inherit" aria-label="menu" onClick={() => this.setState({ open: true})}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" >
                            دیجی عطار
                        </Typography>
                        <div style={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex'}}>
                            <IconButton  color={"inherit"} style={{ textAlign: 'left'}} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                                <AccountCircleRoundedIcon />
                            </IconButton>
                            <Menu
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                id="fade-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose}>ویرایش پروفایل</MenuItem>
                                <MenuItem onClick={handleClose}>تغییر رمز</MenuItem>
                                <MenuItem onClick={() => this.setState({logout: true})}>
                                    <Typography>خروج از سایت</Typography>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={this.state.open} onClose={() => this.setState({ open: false})}>
                    <Sidebar onClose={() => this.setState({ open: false})} />
                </Drawer>
                <Logout open={this.state.logout} onClose={() => this.setState({ logout: false})} />
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
