import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Api from "../../../api";
import MenuItem from "@material-ui/core/MenuItem";
import {toast} from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

class HyperlinkEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            form: {
                label: '',
                status: 1,
                external_link: ''
            }
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.api.getHyperlink(this.props.entity).then((response) => {
            if (typeof response != "undefined") {

                this.setState({
                    loading: false,
                    form: {
                        label: response.label,
                        status: response.status,
                        external_link: response.external_link
                    }
                })
            }
        }).catch((error) => {
            console.log(error);
        })
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

        this.api.updateHyperlink(this.props.entity, this.state.form).then((response) => {
            if (typeof response != "undefined") {

                if (response.status) {
                    toast.success(response.msg);
                    this.props.handleRequest();
                    setTimeout(() => {
                        this.props.onClose();
                    }, 500);
                } else {
                    toast.error(response.msg);
                }

                this.setState({
                    loading: false
                });
            }
        }).catch((error) => {
            console.log(error);
        })

    }


    render() {
        return (
            <form dir='rtl' onSubmit={this.handleSubmit.bind(this)}>
                <DialogTitle id="form-dialog-title">ویرایش</DialogTitle>
                <DialogContent>
                    {this.state.loading && <CircularProgress size={15} color={"secondary"}  />}
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                label="عنوان"
                                variant="filled"
                                margin='dense'
                                value={this.state.form.label}
                                fullWidth
                                name='label'
                                onChange={this.handleChangeElement.bind(this)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="وضعیت"
                                value={this.state.form.status}
                                variant="filled"
                                margin='dense'
                                fullWidth
                                name='status'
                                onChange={this.handleChangeElement.bind(this)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                <MenuItem value={1}>فعال</MenuItem>
                                <MenuItem value={0}>غیرفعال</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                style={{ textAlign: "left"}}
                                label="لینک"
                                variant="filled"
                                margin='dense'
                                value={this.state.form.external_link}
                                fullWidth
                                name='external_link'
                                onChange={this.handleChangeElement.bind(this)}
                                helperText={'در صورت خالی بودن لینک به محتوای داخلی متصل میشود.'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => this.props.onClose()}>
                        انصراف
                    </Button>
                    <Button disabled={this.state.loading} color="primary" autoFocus type='submit'>
                        ارسال اطلاعات
                    </Button>
                </DialogActions>
            </form>
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
)(HyperlinkEdit);
