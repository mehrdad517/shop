import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from "./header";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Api from "../api";
import {toast} from "react-toastify";
import {AuthSetting} from "../actions/auth";
import auth from "../reducers/auth";

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            social_media: [],
            communication_channel: [],
            form : {
                name: '',
                meta_title: '',
                meta_description: '',
                introduce: '',
            }
        };

        this.api = new Api();
    }

    componentDidMount() {

        this.props.authSetting(window.location.host);

        let interval = setInterval(() => {
            if (this.props.auth.setting) {
                let form = this.state.form;
                form['name'] = this.props.auth.setting.name;
                form['meta_title'] = this.props.auth.setting.meta_title;
                form['meta_description'] = this.props.auth.setting.meta_description;
                form['introduce'] = this.props.auth.setting.introduce;
               this.setState({
                   form
               });
               clearInterval(interval);
            }
        }, 1);

        this.api.socialMedia().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    social_media: response
                })
            }
        });

        this.api.communicationChannel().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    communication_channel: response
                })
            }
        })
    }


    handleChangeElement(event) {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form,
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            loading: true,
        });


        this.api.updateSetting(window.location.host, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    this.props.authSetting(window.location.host);
                } else {
                    toast.error(response.msg);
                }
            }

            this.setState({
                loading: false,
            });
        })


    }


    render() {
        console.log(this.state);
        return (
            <div>
                <Header/>
                <Container>
                    <Box>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>تنظیمات</h2>
                                <p style={{ color: '#8e8e8e'}}>تنظیمات سایت و اپ را انجام دهید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/dashboard'>
                                        <Button variant="contained" color="default" >
                                            <NavigationIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{ marginTop: '20px'}}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                        <Paper style={{ padding: '30px 20px'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        label="نام سایت"
                                        variant="filled"
                                        margin='dense'
                                        value={this.state.form.name}
                                        fullWidth
                                        name='name'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        label="متا عنوان"
                                        variant="filled"
                                        margin='dense'
                                        value={this.state.form.meta_title}
                                        fullWidth
                                        name='meta_title'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        label="متا توضیحات"
                                        variant="filled"
                                        margin='dense'
                                        value={this.state.form.meta_description}
                                        fullWidth
                                        name='meta_description'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        label="معرفی سایت"
                                        variant="filled"
                                        margin='dense'
                                        value={this.state.form.introduce}
                                        fullWidth
                                        name='introduce'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                        <Grid item xs={12}>
                            <Button
                                disabled={this.state.loading}
                                style={{ marginTop: '15px'}}
                                type="submit"
                                variant="contained"
                                color={"primary"}
                            >
                                ذخیره تنظیمات
                            </Button>
                        </Grid>
                        </form>
                    </Box>
                </Container>
            </div>
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
        authSetting: function (domain) {
            dispatch(AuthSetting(domain));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting);
