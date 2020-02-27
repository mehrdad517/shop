import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Snackbar} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Api from "../../../api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {toast} from "react-toastify";


class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            loading: true,
            form: {
                name: '',
                role_key: '',
                status: ''
            },
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.api.fetchUser(this.props.id).then((response) => {
            this.setState({
                form: {
                    name: response.name,
                    role_key: response.role_key,
                    status: response.status
                },
                loading: false
            })
        }).catch((errors) => {
            console.log(errors);
        })

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
        this.setState({
            loading: true
        })
        this.api.editUser(this.props.id ,this.state.form).then((response) => {
            if (response.status) {
                this.props.handleRequest();
            }
            this.setState({
                loading: false
            });

            setTimeout( () => {
                this.props.onClose();
            }, 500)

        }).catch((error) => {
            toast.error(error);
        })
    }

    render() {
        return (
            <div>
                <DialogTitle id="alert-dialog-title">ویرایش کاربر</DialogTitle>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <DialogContent>
                        {this.state.loading && <CircularProgress  size={20} color={"secondary"} />}
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    label="نام کاربر"
                                    variant="filled"
                                    value={this.state.form.name}
                                    margin='dense'
                                    fullWidth
                                    name='name'
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
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="وضعیت"
                                    variant="filled"
                                    value={this.state.form.status}
                                    margin='dense'
                                    fullWidth
                                    name='status'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChangeElement.bind(this)}
                                >
                                    <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                    <MenuItem key={1} value={1}>فعال</MenuItem>
                                    <MenuItem key={2} value={0}>غیرفعال</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={this.state.loading} type='submit' color="primary">
                            ذخیره اطلاعات
                        </Button>
                    </DialogActions>
                </form>
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
)(UserEdit);
