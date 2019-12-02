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
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Api from "../api";
import {toast} from "react-toastify";

import {AUTH_CHANGE_LOGIN} from "../actionTypes";

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            username: '',
            password: '',
        }
    }

    componentDidMount() {

        if (this.props.auth.login) {
            this.props.history.push('/dashboard');
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
                    toast.success('با موفقیت وارد شدید.');
                    this.setState({
                        loading: false,
                    });
                    this.handleRequest(response);
                } else {
                    toast.error(response.message);
                }
            }
        })
    };

    handleRequest(response)
    {
        this.props.changeLoginReducer({
            login: true,
            user: response.user,
            token: response.token
        });

        let interval = setInterval(() => {
            if (this.props.auth.login) {
                this.props.history.push('/dashboard');
                clearInterval(interval);
            }
        }, 1);
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" className={this.props.auth.login ? 'animated fadeOut' : ''}>
                <CssBaseline />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "Shabnam", marginTop: '25%'}}>
                    <Avatar style={{ backgroundColor: "red"}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ورود به پنل
                    </Typography>
                    <form onSubmit={this.handleSubmit.bind(this)}  noValidate>
                        <TextField
                            variant="outlined"
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
                            variant="outlined"
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
                                <Link href="#" variant="body2">
                                    رمز عبور خود را فراموش کرده اید؟ کلیک کنید
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © '}
                        {new Date().getFullYear()}
                        {'.'}
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
        changeLoginReducer :  function (payload) {
            dispatch({
                type : AUTH_CHANGE_LOGIN,
                payload
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
