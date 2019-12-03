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
            username: '',
            code: '',
            token: '',
            password: ''
        };

        this.api = new Api();
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

            this.api.passwordValidationCode({
                mobile: this.state.username,
                token: this.state.token,
                code: this.state.code,
                password: this.state.password
            }).then((response) => {
                if (typeof response != "undefined") {
                    if (response.status) {
                        toast.success(response.msg);
                        history.push('/');
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
                            loading: false
                        })
                    } else {
                        toast.error(response.msg);
                    }
                }
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
                        })
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
        console.log(this.state);
        return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "Shabnam", marginTop: '25%'}}>
                        <Avatar style={{ backgroundColor: "#f50057"}}>
                            <PermPhoneMsgIcon />
                        </Avatar>
                        <Typography style={{ marginTop: '10px'}} component="h1" variant="h5">
                            اعتبارسنجی
                        </Typography>
                        <form onSubmit={this.handleSubmit.bind(this)}  noValidate>
                            {this.state.validated ? <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="رمز عبور جدید"
                                name="password"
                                autoFocus
                                value={this.state.password}
                                onChange={this.handleInputChange.bind(this)}
                            /> : ''}
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
                            /> : ''}

                            <Button style={{ margin: '15px 0'}} disabled={this.state.loading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color={this.state.validated ? 'secondary' : this.state.sentSMS ? 'primary' : 'secondary'}
                            >
                                {this.state.validated ? 'تغییر رمز عبور' : (this.state.sentSMS ? 'تایید کد دریافتی' : 'ارسال کد فعال سازی')}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Typography component={Link} to='/'>
                                        بازگشت به صفحه ورود
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
        );
    }
}

export default ResetPassword;
