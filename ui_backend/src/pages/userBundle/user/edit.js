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
import {fetchUser, fetchUsers} from "../../../actions/userBundleAction";
import Api from "../../../api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {FETCH_USER} from "../../../actions/actionTypes";


class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            form: {
                name: '',
                mobile: '',
                role_key: ''
            },
            open: true, // modal open
            snackbar: {
                open: false,
                msg: ''
            },
        };

        this.api = new Api();
    }

    async componentDidMount() {

        this.props.resetUser();

        this.props.fetchUser(this.props.id);
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
        this.api.editUser(this.props.id ,this.state.form).then((response) => {
            if (response.status) {
                this.setState({
                    open: false,
                    snackbar: {
                        open: true,
                        msg: response.msg,
                    }
                }, () => {
                    this.props.fetchUsers();
                });
            } else {
                this.setState({
                    snackbar: {
                        open: true,
                        msg: response.msg,
                    }
                });
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        if (!this.props.states.user) {
            return ( <div><DialogContent style={{ minHeight: '300px', width: '300px'}}><CircularProgress /></DialogContent></div>);
        }
        return (
            <div>
                <DialogTitle id="alert-dialog-title">کاربر <span>{this.props.states.user.name}</span></DialogTitle>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    label="نام کاربر"
                                    variant="filled"
                                    value={this.state.form.name ? this.state.form.name : this.props.states.user.name}
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
                                    value={this.state.form.mobile ? this.state.form.mobile : this.props.states.user.mobile}
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
                                    value={this.state.form.role_key ? this.state.form.role_key : this.props.states.user.role_key}
                                    variant="filled"
                                    margin='dense'
                                    fullWidth
                                    name='role_key'
                                    onChange={this.handleChangeElement.bind(this)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    {this.props.states.roles && this.props.states.roles.map((role, index) => {
                                        return <MenuItem key={index} value={role.key}>{role.title ? role.title : role.key}</MenuItem>
                                    })}
                                </TextField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' color="primary">
                            ذخیره اطلاعات
                        </Button>
                    </DialogActions>
                </form>
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
    return {
        states: state.userBundleReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: function (id) {
            dispatch(fetchUser(id));
        },
        resetUser: function () {
            dispatch({type: FETCH_USER, payload: null});
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserEdit);
