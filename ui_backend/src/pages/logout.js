import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Api from "../api";
import Button from "@material-ui/core/Button";
import {CircularProgress} from "@material-ui/core";
import {push} from 'connected-react-router'
import {AUTH_LOGOUT} from "../actionTypes";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Logout extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loading: false,
        };

        this.api = new Api();
    }


    handleLogout()
    {
        this.setState({
            loading: true,
        });

        this.api.logout().then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.props.logout();
                    this.props.redirect();
                }
            }
        });
    }



    render() {
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.props.onClose()}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">آیا برای خروج مطمئن هستید؟</DialogTitle>
                <DialogContent>
                    <div style={{ display: this.state.loading ? 'block' : 'none'}}>
                        <CircularProgress size={18} color={"secondary"} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.onClose()} color="primary">
                        خیر
                    </Button>
                    <Button onClick={() => this.handleLogout()} color="primary">
                        بله خارج میشوم
                    </Button>
                </DialogActions>
            </Dialog>
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
        logout: function () {
            dispatch({
                type: AUTH_LOGOUT,
            });
        },
        redirect: function () {
            dispatch(push('/'));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);
