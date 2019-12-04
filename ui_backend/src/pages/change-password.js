import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {toast} from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Api from "../api";
import {AUTH_CHANGE_LOGIN} from "../actionTypes";
import {push} from "connected-react-router";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class AuthChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            loading: false,
            form: {
                password: ''
            },
        };

        this.api = new Api();
    }

    handleChangeElement(event) {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        this.setState({
            loading: true
        });

        this.api.AuthChangePassword(this.state.form).then((response) => {
            if (typeof response != "undefined") {

                if (response.status) {
                    toast.success(response.msg);
                    setTimeout( () => {
                        this.props.onClose();
                    }, 500);

                    this.props.logoutReducer( {
                        login: false,
                        user: null,
                        token: null,
                    });


                    let interval = setInterval(() => {
                        if (!this.props.auth.login) {
                            toast.info('مجددا وارد سایت شوید.');
                            this.props.redirect();
                            clearInterval(interval);
                        }
                    }, 1500)

                } else {
                    toast.error(response.msg)
                }

            }

        }).catch((error) => {
            console.log(error);
        })
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
                <DialogTitle id="alert-dialog-title">تغییر رمز عبور</DialogTitle>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <DialogContent>
                        {this.state.loading ? <CircularProgress style={{ zIndex: '99999'}} size={15} color={"secondary"} /> : ''}
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    label="رمز عبور"
                                    variant="filled"
                                    value={this.state.form.password}
                                    margin='dense'
                                    fullWidth
                                    name='password'
                                    onChange={this.handleChangeElement.bind(this)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={this.state.loading} type='submit' color="primary">
                            تغییر رمز
                        </Button>
                    </DialogActions>
                </form>
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
        logoutReducer: function (payload) {
            dispatch({
                type: AUTH_CHANGE_LOGIN,
                payload
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
)(AuthChangePassword);
