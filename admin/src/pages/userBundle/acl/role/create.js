import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Snackbar, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from "@material-ui/core/Grid";
import Api from "../../../../api";
import {toast} from "react-toastify";
import validator from 'validator';
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
        };

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

        if (!validator.isAlpha(this.state.form.key)) {
            toast.error('اسلاگ را به حروف لاتین وارد نمایید.');
            return;
        }


       this.api.createRole(this.state.form).then((response) => {
           if (typeof response != "undefined") {
               if (response.status) {
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
                   this.props.handleRequest();
               } else {
                   this.setState({
                       snackbar : {
                           open: true,
                           message: response.msg
                       },
                   })
               }
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
    };


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
                                        helperText='بدون فاصله و انگلیسی وارد کنید.'
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoleCreate);
