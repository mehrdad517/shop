import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import {toast} from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import Api from "../../api";

class RegionEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            form: {
                label: '',
                is_posting: '',
                is_bearing: '',
                is_delivery: '',
                in_person: '',
                status: 1
            }
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.api.getRegion(this.props.entity).then((response) => {
            if (typeof response != "undefined") {

                this.setState({
                    loading: false,
                    form: {
                        label: response.label,
                        status: response.status,
                        is_posting: response.is_posting,
                        is_bearing: response.is_bearing,
                        is_delivery: response.is_delivery,
                        in_person: response.in_person,
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

        this.api.updateRegion(this.props.entity, this.state.form).then((response) => {
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

            <form onSubmit={this.handleSubmit.bind(this)}>
                <DialogTitle id="form-dialog-title">ویرایش</DialogTitle>
                <DialogContent>
                    {this.state.loading && <CircularProgress size={15} color={"secondary"}  />}
                    <Grid container spacing={0}>
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
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="ارسال با پست"
                                value={this.state.form.is_posting}
                                variant="filled"
                                margin='dense'
                                fullWidth
                                name='is_posting'
                                onChange={this.handleChangeElement.bind(this)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                <MenuItem value={1}>فعال</MenuItem>
                                <MenuItem value={0}>غیرفعال</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="ارسال باربری"
                                value={this.state.form.is_bearing}
                                variant="filled"
                                margin='dense'
                                fullWidth
                                name='is_bearing'
                                onChange={this.handleChangeElement.bind(this)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                <MenuItem value={1}>فعال</MenuItem>
                                <MenuItem value={0}>غیرفعال</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="پیک موتوری"
                                value={this.state.form.is_delivery}
                                variant="filled"
                                margin='dense'
                                fullWidth
                                name='is_delivery'
                                onChange={this.handleChangeElement.bind(this)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                <MenuItem value={1}>فعال</MenuItem>
                                <MenuItem value={0}>غیرفعال</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="دریافت حضوری"
                                value={this.state.form.in_person}
                                variant="filled"
                                margin='dense'
                                fullWidth
                                name='in_person'
                                onChange={this.handleChangeElement.bind(this)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                <MenuItem value={1}>فعال</MenuItem>
                                <MenuItem value={0}>غیرفعال</MenuItem>
                            </TextField>
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
)(RegionEdit);
