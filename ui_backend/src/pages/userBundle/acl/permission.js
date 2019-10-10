import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Checkbox from "@material-ui/core/Checkbox";
import {CircularProgress, FormControlLabel, Icon, RadioGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import Header from './../../header'
import Container from "@material-ui/core/Container";
import NavigationIcon from '@material-ui/icons/Navigation'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import CreateRole from './role/create'
import {fetchPermissions, fetchRoles} from "../../../actions/userBundleAction";
import {FETCH_ROLE} from "../../../actions/actionTypes";

class Permission extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    handlePermissionChecked(action) {
        let role = this.props.entities.role;
        if (role) {
            let permissions = role.permission;
            for (let i = 0 ; i < permissions.length ; i++) {
                if (action.id === permissions[i].key && action.method === permissions[i].method) {
                    return true;
                }
            }
        }

        return  false;
    }

    handleRoleChange (event) {
        this.props.entities.roles.map((role) => {
            if (role['key'] === event.target.value) {
                this.props.changeRole(role);
            }
        })
    };

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
                                        <Grid item sm={6}>
                                            {this.props.entities.roles.map((role, index) => {
                                                return (
                                                    <Grid item sm={4}>
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
                                        <Grid item  sm={6} style={{textAlign:'left'}}>
                                            <CreateRole />
                                        </Grid>
                                    </Grid>
                                    {this.props.entities.permissions.map((item, index) => {
                                        return (
                                            <Container key={index} style={{ margin: '50px 0'}}>
                                                <h3><Chip  color="default"   label={ item.controller} /></h3>
                                                <Grid  container>
                                                    {item.actions.map((action, index) => {
                                                        return(
                                                            <Grid key={index} item xs={12} sm={4}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.handlePermissionChecked(action) === true ? true : ''}
                                                                            value={action.key}
                                                                            name='ch[]'
                                                                            color='secondary'
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
        fetchData: async function () {
            await new Promise((resolve => {
                resolve(dispatch(fetchPermissions()));

            }));
            await new Promise((resolve => {
                resolve(dispatch(fetchRoles()));
            }));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Permission);
