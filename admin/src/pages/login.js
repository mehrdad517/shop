import React, {Component} from 'react';
import {connect} from 'react-redux';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Api from "../api";
import {toast} from "react-toastify";
import { push } from 'connected-react-router'
import {AUTH_LOGIN} from "../actionTypes";
import {CircularProgress} from "@material-ui/core";

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            username: '',
            password: '',
        }

    }


    handleInputChange(event) {
        let form = this.state;
        form[event.target.name] = event.target.value;
        this.setState({
            username: form['username'],
            password: form['password']
        })
    };

    async handleSubmit(e){
        e.preventDefault();
        this.setState({
            loading: true,
        });
        new Api().login({username: this.state.username, password: this.state.password}).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.props.login(response);
                    toast.success('با موفقیت وارد شدید.');

                } else {
                    toast.error(response.message);
                }
            }
            this.setState({
                loading: false,
            });
        })
    };

    render() {
        return (
            <Container component="main" maxWidth="xs" className={this.props.auth.login ? 'animated fadeOut' : 'animated fadeIn'}>
                <CssBaseline />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "Shabnam", marginTop: '25%'}}>
                    <Avatar style={{ backgroundColor: "#f50057", marginBottom: '15px'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        نوآفرینان دنیای زیبایی هیراد
                    </Typography>
                    <form onSubmit={this.handleSubmit.bind(this)}  noValidate style={{ marginTop: '30px'}}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="نام کاربری"
                            name="username"
                            autoComplete="email"
                            autoFocus
                            value={this.state.username}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="رمز عبور"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <Button style={{ margin: '15px 0'}} disabled={this.state.loading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                        >
                            ورود
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Typography variant={"button"} component={Link} to='/password/reset'>
                                    رمز عبور خود را فراموش کرده اید؟ کلیک کنید
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <div style={{ position: 'relative', width: '100%', top: '20px'}}>
                    {this.state.loading && <CircularProgress color={"secondary"} size={25} />}
                </div>
                <Box mt={8}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © '}
                        <span style={{ fontFamily: 'tahoma'}}> {new Date().getFullYear()}</span>
                    </Typography>
                </Box>
            </Container>
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
        login :  function (payload) {
            dispatch({
                type : AUTH_LOGIN,
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
)(Login);
