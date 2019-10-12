import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import {Tooltip} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

class UserCreate extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            open: false,
            form: {
                role_key: ''
            }
        }
    }

    handleChangeElement(event) {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form : form
        });
    }

    handleSubmit(event) {
        event.preventDefault();

    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div>
                <Tooltip title="افزودن کاربر">
                    <IconButton  aria-label="delete" onClick={this.handleClickOpen.bind(this)}>
                        <PersonAddIcon />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">افزودن کاربر جدید</DialogTitle>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                    <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        id="outlined-name"
                                        label="نام کاربر"
                                        variant="filled"
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
                                        id="outlined-name"
                                        label="ایمیل"
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='email'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        id="outlined-name"
                                        label="موبایل"
                                        variant="filled"
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
                                        id="outlined-name"
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
                        <Button type='submit' onClick={this.handleClose.bind(this)} color="primary">
                            کنسل
                        </Button>
                        <Button type='submit' color="primary">
                            ذخیره اطلاعات
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(UserCreate);
