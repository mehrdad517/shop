import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Checkbox, Snackbar} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import Chip from "@material-ui/core/Chip";
import Radio from "@material-ui/core/Radio";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoleCreate from "./role/create";
import {Link} from 'react-router-dom'
import {toast} from "react-toastify";

class Acl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            roles: [],
            permissions: [],
            checkedItems: new Map(),
            form: {
                role_key : '',
            }
        };

        this.api = new Api();
    }


    componentDidMount() {
        this.handleRequest();
    }

    async fetchRoles() {
        let roles;
        await new Promise(resolve => {
            resolve(this.api.fetchRoles().then((response) => {
                if (typeof response != "undefined") {
                    roles = response;
                }
            }));
        });
        this.setState({
            roles
        })
    }


    async handleRequest()
    {
        let permissions;

        this.fetchRoles();

        await this.api.fetchPermissions().then((response) => {
            if (typeof response != "undefined") {
                permissions = response;
                response.map((permission) => {
                    permission.actions.map((action) => {
                        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(action.id, false)}));
                    });
                });
            }
        });

        await new Promise(resolve => {
            resolve(this.setState({
                permissions,
                loading: false
            }));
        })
    }

    handleChangeInput(event) {
        if (this.state.form.role_key) {
            let val = event.target.value;
            if (event.target.checked) {
                this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, true)}));
            } else {
                this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, false)}));
            }
        } else {
            toast.error('هیچ نقشی را انتخاب نکرده اید.');
        }

    };

    handleRoleChange(event) {
        let val = event.target.value;
        this.setState({
           loading : true,
            form: {
                role_key: val
            },
        });
        this.state.checkedItems.forEach((key, value) => {
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(value, false)}));
        });

        this.api.rolePermissions(val, true).then((response) => {
            response.map((permission) => {
                permission.actions.map((action) => {
                    if (parseInt(action.access) === 1) {
                        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(action.id, true)}));
                    }
                });
            });
            this.setState({

                permissions: response,
                loading: false
            });
        })
    };


    handleCheckAll(controller)
    {

        if (this.state.form.role_key) {
            this.state.permissions.map((permission) => {
                if (controller === permission.controller.value) {
                    permission.actions.map((action) => {
                        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(action.id, !this.state.checkedItems.get(action.id) )}));
                    })
                }
            })
        }

    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.form.role_key) {
            toast.error('هیچ نقشی انتخاب نشده است.');
            return;
        }

        this.setState({
            loading: true
        });

        let permissions = [];
        let i = 0;
        this.state.checkedItems.forEach((key, value) => {
            if (key) {
                permissions[i] = value;
                i++;
            }
        }) ;

        this.api.roleSetPermissions(this.state.form.role_key, {'permissions': permissions}).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    this.setState({
                        loading: false
                    });
                } else {
                    toast.error(response.msg);
                }
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    render() {

        return (
            <div className={'content'}>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0', borderRadius: '30px'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>مدیریت نقش ها و سطوح دسترسی</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید سطوح دسترسی را مدیریت کنید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/users'>
                                        <Button variant="contained" color="default" >
                                            <NavigationIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {this.props.auth.permissions && this.props.auth.permissions.role.store.access ? <RoleCreate handleRequest={() => this.fetchRoles()} /> : ''}
                    </Box>
                    <Box className='animated fadeIn' boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px'}}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Grid container>
                                {this.state.roles && this.state.roles.map((role, i) => {
                                    return (
                                        <Grid  key={i} item xs={12} sm={3}>
                                            <FormControlLabel key={i} control={
                                                <Radio
                                                    checked={(this.state.form.role_key ? this.state.form.role_key : false ) === role.key}
                                                    value={role.key}
                                                    name="role_key[]"
                                                    onChange={this.handleRoleChange.bind(this)}
                                                />
                                            } label={role.title ? role.title : role.key} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            {this.state.permissions && this.state.permissions.map((permission, index) => {
                                return(
                                    <Grid style={{margin: '30px 0'}} key={index}  container>
                                        <Grid  item xs={12}>
                                            <h3><Chip clickable={true} onClick={() => this.handleCheckAll(permission.controller.value)} color="default"  label={ permission.controller.key} /></h3>
                                        </Grid>
                                        {permission.actions.map((action, index) => {
                                            return(
                                                <Grid key={index}  item sm={4}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                key={index}
                                                                value={action.id}
                                                                name={action.id}
                                                                checked={this.state.checkedItems.get(action.id)}
                                                                onChange={this.handleChangeInput.bind(this)}
                                                            />
                                                        }
                                                        label={action.title}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                )
                            })}
                            {this.props.auth.permissions && this.props.auth.permissions.role.set_permission.access ? <Grid item xs={12} style={{ justifyContent: 'flex-end', display: 'flex'}}>
                                <Button disabled={this.state.loading} variant="outlined" color="secondary" type='submit' >
                                    به روز رسانی
                                </Button>
                            </Grid> : ''}
                        </form>
                        {this.state.loading ? <CircularProgress style={{ zIndex: 9999}} color={"secondary"} /> : ''}
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Acl);
