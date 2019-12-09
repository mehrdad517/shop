import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Api from "../api";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import {toast} from "react-toastify";
import {AUTH_LOGOUT, UPDATE_USER} from "../actionTypes";
import {push} from "connected-react-router";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class AuthEditProfile extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            loading: false,
            form: {
                name: '',
            },
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.setState({
            form: {
                name: this.props.auth.user.name,
            }
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
        });
        this.api.AuthEditProfile(this.state.form).then((response) => {
            if (response.status) {
                toast.success('پروفایل با موفقیت ویرایش شد.');
            }

            this.setState({
                loading: false
            });
            
            this.props.updateUser(response.user);

            setTimeout( () => {
                this.props.onClose();
            }, 500);

        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.props.onClose()}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-title">ویرایش کاربر</DialogTitle>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <DialogContent>
                        {this.state.loading ? <CircularProgress style={{ zIndex: '99999'}} size={15} color={"secondary"} /> : ''}
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
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={this.state.loading} type='submit' color="primary">
                            ذخیره اطلاعات
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


function mapDispatchToProps(dispatch) {
    return {
        updateUser: function(user) {
          dispatch({type : UPDATE_USER, payload: user});
        },
        redirect: function () {
            dispatch(push('/'));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthEditProfile);
