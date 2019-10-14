import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Checkbox, Tooltip} from "@material-ui/core";
import {fetchRoles} from "../../../actions/userBundleAction";
import permission from "./permission";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Header from "../../header";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Pagination from "react-js-pagination";
import IconButton from "@material-ui/core/IconButton";
import UserCreate from "../user/create";
import Chip from "@material-ui/core/Chip";

class Acl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permissions : [],
            checkedItems : new Map(),
            loading: false,
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

        await new Promise((resolve) => {
            resolve(this.props.states.roles.result.permission.map((permission) => {
                this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(permission.key, true) }));
            }));
        });

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
        let val = event.target.value;
        if (event.target.checked) {
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, true)}));
        }else {
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, false) }));
        }

    };

    render() {
        if (!this.state.loading) {
            return null
        }
        return (
            <div className={'content'}>
                <Header />
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>مدیریت کاربران</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید کاربران را مدیریت کنید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="contained" color="default" >
                                        بازگشت&nbsp;<NavigationIcon />
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box boxShadow={2} style={{ backgroundColor: '#fff'}}>
                        {this.state.permissions.map((permission) => {
                            return(
                                <Grid container>
                                    <Grid item xs={12}>
                                        <h3><Chip  color="default"   label={ permission.controller} /></h3>
                                    </Grid>
                                    {permission.actions.map((action, index) => {
                                        return(
                                            <Grid  item sm={4}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            key={index}
                                                            value={action.id}
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
                    </Box>
                </Container>
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
