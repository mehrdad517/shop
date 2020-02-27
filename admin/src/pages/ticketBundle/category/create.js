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
import Api from "../../../api";
import {toast} from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

class TicketCategoryCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: false,
            form: {
                label: '',
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

        this.setState({
            loading: true
        });

        this.api.createTicketCategories({
            label: this.state.form.label,
            items: this.props.items
        }).then((response) => {
            if (typeof response != "undefined") {

                if (response.status) {
                    toast.success(response.msg);
                    this.props.handleRequest();
                    this.setState({
                        open: false,
                        form:{
                            label: ''
                        }
                    });

                } else {
                    toast.error(response.msg);
                }

                this.setState({
                    loading: false
                })
            }
        }).catch((error) => {
            console.log(error);
        })

    }


    render() {
        return (
            <div>
                <Tooltip title="افزودن دسته بندی جدید">
                    <IconButton onClick={() => this.setState({ open: true})}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
                <Dialog fullWidth open={this.state.open} onClose={() => this.setState({ open: false })} aria-labelledby="form-dialog-title">
                    <form dir='rtl' onSubmit={this.handleSubmit.bind(this)}>
                        <DialogTitle id="form-dialog-title">دسته بندی  جدید</DialogTitle>
                        <DialogContent>
                            {this.state.loading && <CircularProgress size={15} color={"secondary"}  />}
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        label="عنوان"
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='label'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText='با علامت , جدا کنید'
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={() => this.setState({open: false})}>
                                انصراف
                            </Button>
                            <Button disabled={this.state.loading} color="primary" autoFocus type='submit'>
                                ارسال اطلاعات
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

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TicketCategoryCreate);
