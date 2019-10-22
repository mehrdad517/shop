import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Api from "../../../api";

class ProductCategoryEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            form: {
                label: '',
            }
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.api.fetchProductCategory(this.props.entity).then((response) => {
            this.setState({
                form: {
                    label: response.label
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
        this.api.updateAttribute(this.props.entity, this.state.form).then((response) => {
            if (response.status) {
                this.setState({
                    open: false,
                    form:{
                        label: '',
                    }
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
