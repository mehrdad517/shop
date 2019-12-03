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


class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            form: {
                name: '',
                mobile: '',
                role_key: ''
            },
            snackbar: {
                open: false,
                msg: ''
            },
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.api.fetchUser(this.props.id).then((response) => {
            this.setState({
                form: {
                    name: response.name,
                    role_key: response.role_key
                }
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
        this.api.editUser(this.props.id ,this.state.form).then((response) => {
            if (response.status) {
                this.props.handleRequest();
            }
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
        if (this.state.form.name === '') {
            return ( <div><DialogContent style={{ minHeight: '400px', width: '400px'}}><CircularProgress color={"secondary"} /></DialogContent></div>);
        }
        return (
            <div>
                <DialogTitle id="alert-dialog-title">ویرایش کاربر</DialogTitle>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <DialogContent>
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
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' color="primary">
                            ذخیره اطلاعات
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
    return {};
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserEdit);
