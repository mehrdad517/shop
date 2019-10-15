import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Checkbox, Snackbar} from "@material-ui/core";
import {fetchRoles} from "../../../actions/userBundleAction";
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

class Acl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permissions : [],
            checkedItems : new Map(),
            loading: false,
            form:{role_key: null}, // role and permission
            snackbar: {open: false, msg: ''}
        };
        this.api = new Api();
    }

    async setAttr(response) {
        await new Promise((resolve => {
            resolve(this.setState({
                permissions : response
            }));
        }));

        await new Promise((resolve => {
            resolve(response.map((permission) => {
                permission.actions.map((action) => {
                    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(action.id, false) }));
                });
            }));
        }));

        await new Promise(resolve => {
            resolve(this.setState({
                loading: true
            }));
        })
    }


    componentDidMount() {
        this.props.fetchRoles();
        this.api.fetchPermissions().then((response) => {
            this.setAttr(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    handleChangeInput(event)  {
        if (this.state.form.role_key) {
            let val = event.target.value;
            if (event.target.checked) {
                this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, true)}));
            } else {
                this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, false)}));
            }
        } else {
            this.setState({
                snackbar: {
                    open: true,
                    msg: 'هیچ نقشی انتخاب نشده است.'
                }
            })
        }

    };

    handleRoleChange(event) {
        this.setState({
            loading: false
        });
        let val = event.target.value;
        this.state.checkedItems.forEach((key, value) => {
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(value, false)}));
        }) ;
        this.props.states.roles.map((role) => {
            if (role.key === val) {
                this.state.permissions.map((permission) => {
                    permission.actions.map((action) => {
                        role.permission.map((item, index) => {
                            if (item.key === action.id) {
                                this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(action.id, true)}));
                            }
                        });
                    });
                });
            }
        });
        this.setState({
            form:{
                role_key: val,
            },
            loading: true
        })
    };

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.form.role_key) {
            this.setState({
                snackbar: {open: true, msg: 'هیچ نقشی انتخاب نشده است.'}
            })
            return;
        }

        let permissions = [];
        let i = 0;
        this.state.checkedItems.forEach((key, value) => {
            if (key) {
                permissions[i] = value;
                i++;
            }
        }) ;

        this.api.roleSetPermissions(this.state.form.role_key, {'permissions': permissions}).then((response) => {
            if (response.status) {
                this.props.fetchRoles();
            }
            this.setState({
                snackbar: {open: true, msg: response.msg}
            })
        }).catch((error) => {
            console.log(error);
        })
    }


    handleCheckAll(controller)
    {
        if (this.state.form.role_key) {
            this.state.permissions.map((permission) => {
                if (controller === permission.controller) {
                    permission.actions.map((action) => {
                        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(action.id, (!this.state.checkedItems.get(action.id) ? true : false) )}));
                    })
                }
            })
        } else {
            this.setState({
                snackbar: {
                    open: true,
                    msg: 'یک نقش را انتخاب کنید.'
                }
            })
        }

    }

    render() {
        if (!this.state.loading) {
            return(<CircularProgress color={"secondary"} />);
        }
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
                        <RoleCreate />
                    </Box>
                    <Box boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px'}}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Grid container>
                                {this.props.states.roles && this.props.states.roles.map((role, i) => {
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
                            {this.state.permissions.map((permission, index) => {
                                return(
                                    <Grid style={{margin: '30px 0'}} key={index}  container>
                                        <Grid  item xs={12}>
                                            <h3><Chip clickable={true} onClick={() => this.handleCheckAll(permission.controller)} color="default"  label={ permission.controller} /></h3>
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
                            <Grid item xs={12} style={{ justifyContent: 'flex-end', display: 'flex'}}>
                                <Button variant="outlined" color="secondary" type='submit' >
                                    به روز رسانی
                                </Button>
                            </Grid>
                        </form>
                    </Box>
                </Container>
                <Snackbar
                    autoHideDuration={4500}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.msg}
                    onClose={() => this.setState({snackbar:{open: false,msg: ''}})}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        states: state.userBundleReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRoles: function () {
            dispatch(fetchRoles());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Acl);
