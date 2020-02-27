import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Api from "../../../api";
import {toast} from "react-toastify";
import {Typography} from "@material-ui/core";


class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            form: {
                password: ''
            },
        };

        this.api = new Api();
    }

    handleChangeElement(event) {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.api.changePasswordUser(this.props.id ,this.state.form).then((response) => {
            if (typeof response != "undefined") {

                if (response.status) {
                    toast.success(response.msg);
                    setTimeout( () => {
                        this.props.onClose();
                    }, 500)
                } else {
                    toast.error(response.msg)
                }

            }

        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <DialogTitle id="alert-dialog-title"><Typography component={"h1"}>تغییر رمز عبور</Typography></DialogTitle>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <DialogContent>
                        {/*&nbsp;<Typography color={"secondary"} component={"span"}>{this.props.auth.user.name}</Typography>*/}
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    label="رمز عبور"
                                    variant="filled"
                                    value={this.state.form.password}
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
                        <Button type='submit' color="primary">
                            تغییر رمز
                        </Button>
                    </DialogActions>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);
