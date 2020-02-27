import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {toast} from "react-toastify";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Api from "../../../api";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

class ProductListCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products:[],
            options: [],
            form: {
                title: '',
                order: 1,
                status: 1,
            },
        };

        this.api = new Api();
    }


    handleChangeElement = (event) => {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form,
        });
    };

    handleSubmit (event) {
        event.preventDefault();

        this.setState({
            loading: true
        });

        this.state.form['products'] = this.state.products;
        this.api.postProductList(this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    setTimeout(() => {
                        this.props.history.push('/product-lists')
                    }, 500);

                } else {
                    toast.error(response.msg);
                }
            }
            this.setState({
                loading: false
            });
        }).catch((error) => {
            toast.error(error);
            this.setState({
                loading: false
            });
        })
    }

    autoCompleteHandleSelect = (selected) =>
    {
        let products = [];
        selected.forEach((value) => {
            products.push(value.id);
        });
        this.setState({
            products
        });


    };


    async autoCompleteHandleChange(event)
    {
        this.setState({
            loading: true
        });

        let instance = new Api();
        let term = event.target.value;
        instance.autoComplete('products', {'term': event.target.value}).then((response) => {
            if (typeof response != "undefined") {
                if (response.length > 0 ) {
                    this.setState({
                        options: response,
                        loading: false,
                    })
                }
                this.setState({
                    loading: false
                })
            }
        });

    }

    render() {
        console.log(this.state);
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>افزودن لیست جدید</h2>
                                <p style={{ color: '#8e8e8e'}}>لیست جدید اضافه کنید و محصولات را انتخاب کنید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/product-lists'>
                                        <Button variant="contained" color="default" >
                                            <NavigationIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <ExpansionPanel expanded={true}>
                                <ExpansionPanelSummary
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography><b>اطلاعات</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="عنوان"
                                                variant="filled"
                                                margin='dense'
                                                value={this.state.form.title}
                                                fullWidth
                                                name='title'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                label="اولویت"
                                                variant="filled"
                                                margin='dense'
                                                value={this.state.form.order}
                                                fullWidth
                                                name='order'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
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
                                            <div style={{ position: "relative"}}>
                                                <Autocomplete
                                                    multiple
                                                    freeSolo
                                                    size={"small"}
                                                    onChange={((event, value) => this.autoCompleteHandleSelect(value))}
                                                    options={this.state.options}
                                                    getOptionLabel={option => option.name}
                                                    renderInput={params => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            margin={"dense"}
                                                            label="محصولات"
                                                            variant="filled"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            onChange={this.autoCompleteHandleChange.bind(this)}
                                                        />
                                                    )}
                                                />
                                                {this.state.loading && <CircularProgress color={"secondary"} size={15} />}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                            {Boolean(this.props.auth.permissions.gallery.store.access) && <Box style={{ margin: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button disabled={this.state.loading} variant='contained' color='primary' type="submit">ایجاد</Button>
                            </Box>}
                        </form>
                    </Box>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(
    mapStateToProps,
)(ProductListCreate);


