import React, {Component} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Api from "../api";
import {toast} from "react-toastify";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

class ResetPassword extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            sentSMS: false,
            validated: false,
            counter: 120,
            username: '',
            code: '',
            token: '',
            password: '',
            confirm_password: '',
        };

        this.api = new Api();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.counter === 0) {
            window.location.reload();
        }
    }


    handleInputChange(event) {
        let form = this.state;
        form[event.target.name] = event.target.value;
        this.setState({
            username: form['username'],
            code: form['code'],
            password: form['password']
        })
    };

    async handleSubmit(e){
        e.preventDefault();

        this.setState({
            loading: true,
        });

        if (this.state.validated) {

            if (this.state.password === '') {
                toast.error('رمز عبور را وارد نکرده اید.');
                this.setState({
                    loading: false
                });
                return ;
            }

            if (this.state.password != this.state.confirm_password) {
                toast.error('رمز عبور یکسان وارد نکرده اید.');
                this.setState({
                    loading: false
                });
                return ;
            }

            this.api.passwordValidationCode({
                mobile: this.state.username,
                token: this.state.token,
                code: this.state.code,
                password: this.state.password
            }).then((response) => {
                if (typeof response != "undefined") {
                    if (response.status) {
                        toast.success(response.msg);
                        setTimeout(() => {
                            this.props.history.push('/');
                        }, 1000);
                    } else {
                        toast.error(response.msg)
                    }
                }

                this.setState({
                    loading: false
                })
            })

        } else if (this.state.sentSMS) {

            if (this.state.username === '' || this.state.code === '' || !this.state.sentSMS) {
                toast.error('کد تایید را وارد نکرده اید.');
                this.setState({
                   loading: false
                });
                return ;
            }

            this.api.verifyValidationCode({
                mobile: this.state.username,
                token: this.state.token,
                code: this.state.code
            }).then((response) => {
                if (typeof response != "undefined") {
                    if (response.status) {
                        toast.info(response.msg);
                        this.setState({
                            validated: true,
                            token: response.token,
                        })
                    } else {
                        toast.error(response.msg);
                    }
                }
                this.setState({
                    loading: false
                })
            })

        } else {

            if (this.state.username === '') {
                toast.error('شماره موبایل را وارد نکرده اید.');
                this.setState({
                    loading: false
                });
                return ;
            }

            this.api.sendValidationCode({
                'mobile' : this.state.username
            }).then((response) => {
                if (typeof response != "undefined") {
                    if (response.status) {
                        toast.info(response.msg);
                        this.setState({
                            sentSMS: true,
                            token: response.token
                        });
                        let interval = setInterval(() => {
                            if (this.state.counter === 0) {
                                clearInterval(interval);
                            } else {
                                this.setState({
                                    counter: this.state.counter - 1
                                })
                            }
                        }, 1000);
                    } else {
                        toast.error(response.msg);
                    }
                }

                this.setState({
                    loading: false
                })
            });
        }


    };

    render() {
        return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "Shabnam", marginTop: '25%'}}>
                        <Avatar style={{ backgroundColor: "#f50057"}}>
                            <PermPhoneMsgIcon />
                        </Avatar>
                        <Typography style={{ marginTop: '10px'}} component="h1" variant="h5">
                            بازیابی رمز عبور
                        </Typography>
                        <form onSubmit={this.handleSubmit.bind(this)}  noValidate>
                            {this.state.validated ?
                                <div>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="رمز عبور جدید"
                                        name="password"
                                        type="password"
                                        autoFocus
                                        value={this.state.password}
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="تکرار رمز عبور"
                                        name="confirm_password"
                                        type="password"
                                        value={this.state.confirm_password}
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </div> : ''}
                            {!this.state.sentSMS && !this.state.validated ?
                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="شماره موبایل"
                                name="username"
                                autoComplete="email"
                                autoFocus
                                value={this.state.username}
                                onChange={this.handleInputChange.bind(this)}
                            /> : '' }
                            {this.state.sentSMS && !this.state.validated ?  <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="code"
                                label="کد تایید"
                                type="text"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.code}
                                onChange={this.handleInputChange.bind(this)}
                                helperText={ 'کد دریافتی را وارد نمایید' + ' (' + this.state.counter+ ')'}
                            /> : ''}

                            <Button style={{ margin: '15px 0'}} disabled={this.state.loading}
                                           type="submit"
                                           fullWidth
                                           variant="contained"
                                           color={"secondary"}
                        >
                            {this.state.validated ? 'تغییر رمز عبور' : (this.state.sentSMS ? 'تایید کد' : 'ارسال کد فعال سازی')}
                        </Button>
                            <Button
                                    onClick={() => this.props.history.push('/')}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color={"primary"}
                            >
                                بازگشت به صفحه ورود
                            </Button>
                        </form>
                    </div>
                </Container>
        );
    }
}

export default ResetPassword;
