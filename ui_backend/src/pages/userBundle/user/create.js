import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import {Snackbar, Tooltip} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Api from "../../../api";
import {toast} from "react-toastify";

class UserCreate extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            form: {
                name: '',
                mobile: '',
                role_key: '',
            },
            open: false, // modal open
            snackbar: {
                open: false,
                msg: ''
            },
        };

        this.api = new Api();
    }

    handleChangeElement(event) {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form : form,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.api.createUser(this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    this.setState({
                        open: false,
                    }, () => {
                        this.props.handleRequest();
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
            <div>
                <Tooltip title="افزودن کاربر">
                    <IconButton  aria-label="delete" onClick={() => this.setState({ open: true})}>
                        <PersonAddIcon />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">افزودن کاربر جدید</DialogTitle>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        label="نام کاربر"
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='name'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        label="موبایل"
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='mobile'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="نقش"
                                        value={this.state.form.role_key}
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='role_key'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    >
                                        {this.props.roles && this.props.roles.map((role, index) => {
                                            return <MenuItem key={index} value={role.key}>{role.title ? role.title : role.key}</MenuItem>
                                        })}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        type='password'
                                        label="رمز عبور"
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='password'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.setState({open: false})} color="primary">
                                کنسل
                            </Button>
                            <Button type='submit' color="primary">
                                ذخیره اطلاعات
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Snackbar
                    autoHideDuration={1500}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.msg}
                    onClose={() => this.setState({snackbar:{open: false,msg: ''}})}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCreate);
