import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {fetchRoles} from "../../../../actions/userBundleAction";

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            if (response.status) {
                this.props.fetchRoles();
                this.setState({
                    open: false
                })
            } else {

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


    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    نقش جدید
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">ایجاد نقش جدید</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            یک نقش جدید ایجاد کنید و سطح دسترسی لازم را برای نقش مورد نظر  قرار دهید.
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <TextField style={{textAlign:'right'}}
                                           name='key'
                                           autoFocus
                                           margin="dense"
                                           id="name"
                                           label="ادمین"
                                           type="text"
                                           fullWidth
                                           onChange={this.handleChangeElement}
                                />
                                <TextField style={{textAlign:'right'}}
                                           name='title'
                                           autoFocus
                                           margin="dense"
                                           id="name"
                                           label="ادمین"
                                           type="text"
                                           fullWidth
                                           onChange={this.handleChangeElement}
                                />
                                <Button  color="primary" onClick={this.handleClose}>
                                    Cancel
                                </Button>
                                <Button type='submit' color="primary">
                                    Subscribe
                                </Button>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
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
