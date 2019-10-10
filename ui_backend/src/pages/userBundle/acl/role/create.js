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
import {Snackbar} from "@material-ui/core";
import Add from '@material-ui/icons/Add'

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

        axios.post('http://localhost:8000/api/backend/users/roles', this.state.form).then((response) => {
            if (response.data.status) {
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
                        message: response.data.msg
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
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    <Add />&nbsp;نقش جدید
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <form dir='rtl' onSubmit={this.handleSubmit.bind(this)}>
                    <DialogTitle id="form-dialog-title">ایجاد نقش جدید</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            یک نقش جدید ایجاد کنید و سطح دسترسی لازم را برای نقش مورد نظر  قرار دهید.
                                <TextField style={{textAlign:'right'}}
                                           name='key'
                                           autoFocus
                                           margin="dense"
                                           id="name"
                                           label="اسلاگ"
                                           type="text"
                                           fullWidth
                                           onChange={this.handleChangeElement}
                                           error={this.state.errors.key}
                                />
                                <TextField style={{textAlign:'right'}}
                                           name='title'
                                           autoFocus
                                           margin="dense"
                                           id="name"
                                           label="عنوان"
                                           type="text"
                                           fullWidth
                                           onChange={this.handleChangeElement}
                                           error={this.state.errors.title}
                                />
                        </DialogContentText>
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
)(Create);
