import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Snackbar} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Api from "../../../api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {fetchUser} from "../../../actions/userBundleAction";
import {FETCH_USER} from "./../../../actionTypes";


class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            form: {
                password: ''
            },
            snackbar: {
                open: false,
                msg: ''
            },
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.props.resetUser();
        this.props.fetchUser(this.props.id)
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
            this.setState({
                snackbar: {
                    open: true,
                    msg: response.msg,
                }
            });

            setTimeout( () => {
                this.props.onClose();
            }, 500)

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
                <Snackbar
                    autoHideDuration={4500}
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
            dispatch(fetchUser(id))
        },
        resetUser: function () {
            dispatch({type: FETCH_USER, payload: null});
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);
