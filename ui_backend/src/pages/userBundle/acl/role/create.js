import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {fetchRoles} from "../../../../actions/userBundleAction";
import {Snackbar, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from "@material-ui/core/Grid";
import Api from "../../../../api";

class RoleCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            snackbar: {
              open: false,
              message: ''
            },
            errors : {
                key: false,
                title: false
            },
            form: {
                key: '',
                title: '',
            }
        }

        this.api = new Api();
    }


    handleChangeElement = (event) => {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form,
        })
    };

    handleSubmit (event) {
        event.preventDefault();

       this.api.createRole(this.state.form).then((response) => {
            if (response.status) {
                this.props.fetchRoles();
                this.setState({
                    open: false,
                    snackbar : {
                        open: true,
                        message: 'عملیات موفق'
                    },
                    form:{
                        key: '',
                        title: '',
                    }
                })
            } else {
                this.setState({
                    snackbar : {
                        open: true,
                        message: response.msg
                    },
                })
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open : false
        })
    }

    handleCloseSnackbar = () => {
        this.setState({
            snackbar : {
                open : false
            }
        })
    }


    render() {
        return (
            <div>
                <Tooltip title="افزودن نقش">
                    <IconButton onClick={this.handleClickOpen}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <form dir='rtl' onSubmit={this.handleSubmit.bind(this)}>
                    <DialogTitle id="form-dialog-title">ایجاد نقش جدید</DialogTitle>
                    <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        label="اسلاگ"
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='key'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        label="نام کاربر"
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='title'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>
                            انصراف
                        </Button>
                        <Button color="primary" autoFocus type='submit'>
                            ارسال اطلاعات
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
                <Snackbar
                    autoHideDuration={1500}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    onClose={this.handleCloseSnackbar}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRoles : function () {
            dispatch(fetchRoles());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoleCreate);
