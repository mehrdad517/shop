import React, {Component} from 'react';
import {connect} from 'react-redux';
import Checkbox from "@material-ui/core/Checkbox";
import {CircularProgress, FormControlLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import Header from './../../header'
import Container from "@material-ui/core/Container";
import NavigationIcon from '@material-ui/icons/Navigation';
import Radio from "@material-ui/core/Radio";
import CreateRole from './role/create'
import {fetchPermissions, fetchRoles} from "../../../actions/userBundleAction";
import {FETCH_ROLE} from "../../../actions/actionTypes";
import axios from "axios";

class Permission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                permissions: {}
            },
            checkedItems: new Map(),
        }
    }

    componentDidMount() {
        this.props.fetchData();
    }


    handleRoleChange (event) {
        this.setState({
            checkedItems : new Map()
        });

        this.props.entities.roles.map((role) => {
            if (role['key'] === event.target.value) {
                this.props.changeRole(role);
                let permissions = role.permissions;
                for (let i = 0 ; i < permissions.length ; i++) {
                    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(permissions[i].key, true) }));
                }

            }
        });


    };

    handlePermissionChange(event) {

        let value = event.target.value;

        let permissions = this.state.form.permissions;

        if (event.target.checked) {
            permissions[event.target.name] = value;
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(value, true) }));
        } else {
            delete permissions[event.target.name];
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(value, false) }));
        }

        this.setState({
            form: {
                permissions
            }
        })
    }

    handleFormSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8000/api/backend/users/roles/' + this.props.entities.role.key, this.state.form).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })

    }

    render() {
        return (
            <div>
                <Header />
                <div className='content' >
                    <div className='content-header'>
                        <Container>
                            <Grid container
                                  direction="row"
                                  alignItems="center"
                            >
                                <Grid item sm={6}>
                                    <h2>مدیریت نقش ها و سطوح دسترسی</h2>
                                    <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید سطح دسترسی برای هر نقش تعیین کنید.</p>
                                </Grid>
                                <Grid item sm={6} style={{ textAlign:'left'}}>
                                    <Button variant="contained" color="default">
                                        بازگشت&nbsp;<NavigationIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>

                    <Container>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className='content-body'>
                                    {!this.props.entities.aclPageLoading ? <CircularProgress style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                    }} color='primary' /> : ''}
                                    <Grid container>
                                        <Grid container sm={10}>
                                            {this.props.entities.roles && this.props.entities.roles.map((role, index) => {
                                                return (
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControlLabel key={index} control={
                                                            <Radio
                                                                checked={(this.props.entities.role ? this.props.entities.role.key : false) === role.key}
                                                                key={index}
                                                                value={role.key}
                                                                name="role[]"
                                                                onChange={this.handleRoleChange.bind(this)}
                                                            />
                                                        } label={role.title ? role.title : role.key} />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                        <Grid item  sm={2} style={{textAlign:'left'}}>
                                            <CreateRole />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <form onSubmit={this.handleFormSubmit.bind(this)}>

                                            {this.props.entities.role && this.props.entities.role.permissions.map((item, index) => {
                                                return (
                                                    <Container key={index} style={{ margin: '50px 0'}}>
                                                        <h3><Chip  color="default"   label={ item.controller} /></h3>
                                                        <Grid  container sm={12}>
                                                            {item.actions.map((action, index) => {
                                                                return(
                                                                    <Grid key={index} item sm={6}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.checkedItems.get(action.id)}
                                                                                    value={action.id}
                                                                                    color='secondary'
                                                                                    onChange={this.handlePermissionChange.bind(this)}
                                                                                    name={action.id}
                                                                                />
                                                                            }
                                                                            label={action.title}
                                                                        />
                                                                    </Grid>
                                                                );
                                                            })}
                                                        </Grid>
                                                    </Container>
                                                )
                                            })}
                                            <Button variant="contained" color="secondary" type='submit' >
                                                به روز رسانی
                                            </Button>
                                        </form>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        entities : state.userBundleReducer
    };
}

function mapDispatchToProps (dispatch) {
    return {
        changeRole: function(role) {
            dispatch({type: FETCH_ROLE, payload: role});
        },
        fetchData: function () {
            dispatch(fetchRoles());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Permission);
