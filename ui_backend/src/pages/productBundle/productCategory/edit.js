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

class ProductCategoryEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            form: {
                label: '',
                slug: '',
                meta_title: '',
                meta_description: '',
                status: 1
            }
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.api.fetchProductCategory(this.props.entity).then((response) => {
            this.setState({
                form: {
                    label: response.label,
                    slug: response.slug,
                    meta_title: response.meta_title,
                    meta_description: response.meta_description,
                    status: response.status
                }
            })
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
        this.api.updateProductCategory(this.props.entity, this.state.form).then((response) => {
            if (response.status) {
                this.setState({
                    open: false,
                });
                this.props.onClose();
                this.props.handleRequest();
            } else {
                this.props.handleSnackbar({open: true, msg: response.msg});
            }
        }).catch((error) => {
            console.log(error);
        })

    }


    render() {
        console.log(this.props.entity[0])
        return (
                    <form dir='rtl' onSubmit={this.handleSubmit.bind(this)}>
                        <DialogTitle id="form-dialog-title">ویرایش</DialogTitle>
                        <DialogContent>
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
                                <Grid item xs={12} >
                                    <TextField
                                        label="اسلاگ"
                                        variant="filled"
                                        margin='dense'
                                        value={this.state.form.slug}
                                        fullWidth
                                        name='slug'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        label="متا عنوان"
                                        variant="filled"
                                        margin='dense'
                                        value={this.state.form.meta_title}
                                        fullWidth
                                        name='meta_title'
                                        onChange={this.handleChangeElement.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        label="متا توضیحات"
                                        variant="filled"
                                        margin='dense'
                                        value={this.state.form.meta_description}
                                        fullWidth
                                        name='meta_description'
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
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={() => this.props.onClose()}>
                                انصراف
                            </Button>
                            <Button color="primary" autoFocus type='submit'>
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
)(ProductCategoryEdit);
