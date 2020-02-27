import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Checkbox, DialogContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {toast} from "react-toastify";
import Api from "../../../api";
import CircularProgress from "@material-ui/core/CircularProgress";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class RolePermission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            permissions: [],
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.handleRequest();
    }


    handleRequest()
    {
        let permissions;

        this.api.rolePermissions(this.props.role.key, true).then((response) => {
            if (typeof response != "undefined") {
                permissions = response;
                this.setState({
                    permissions,
                    loading: false
                })
            }
        });

    }

    handleChangeInput(event, parent, child)
    {
        let permissions = this.state.permissions;
        permissions[parent]['actions'][child]['access'] = event.target.checked;
        this.setState({
            permissions
        })
    }



    handleCheckAll(parent)
    {
        let permissions = this.state.permissions;

        permissions[parent]['actions'].forEach((value, key) => {
            permissions[parent]['actions'][key]['access'] = true
        });

        this.setState({
            permissions
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.props.role.key) {
            toast.error('هیچ نقشی انتخاب نشده است.');
            return;
        }


        this.setState({
            loading: true
        });

        let permissions = [];
        let i = 0;
        this.state.permissions.map((parent) => {
            parent.actions.map((child) => {
                if (Boolean(child.access)) {
                    permissions[i] = child.id;
                    i++
                }
            })
        });

        this.api.roleSetPermissions(this.props.role.key, {'permissions': permissions}).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    this.setState({
                        loading: false
                    });
                    setTimeout(() => {
                        this.props.onClose();
                    }, 1000);

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
            <div>
                <AppBar style={{ position: 'relative'}}>
                    <Toolbar style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between"}}>
                        <Typography variant="h6">
                            {this.props.role && this.props.role.title ? this.props.role.title : this.props.role.key}
                        </Typography>
                        <IconButton edge="start" color="inherit" aria-label="close" onClick={() => this.props.onClose()}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent style={{ padding: '0 50px 50px 50px'}}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        {this.state.permissions && this.state.permissions.map((permission, parent) => {
                            return(
                                <Grid style={{margin: '30px 0'}} key={parent}  container>
                                    <Grid  item xs={12}>
                                        <h3><Chip clickable={true} onClick={() => this.handleCheckAll(parent)} color="default"  label={ permission.controller.key} /></h3>
                                    </Grid>
                                    {permission.actions.map((action, child) => {
                                        return(
                                            <Grid key={child}  item sm={4}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            key={child}
                                                            value={action.id}
                                                            name={action.id}
                                                            checked={Boolean(action.access)}
                                                            onChange={(event) => this.handleChangeInput(event, parent, child)}
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
                        {this.state.permissions.length > 0 ? <Button disabled={this.state.loading}  variant={"contained"} color="primary" type='submit' >
                            به روز رسانی
                        </Button>: ''}
                        {this.state.loading ? <CircularProgress color={"secondary"} size={20} /> : '' }
                    </form>
                </DialogContent>
            </div>


        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(RolePermission);
