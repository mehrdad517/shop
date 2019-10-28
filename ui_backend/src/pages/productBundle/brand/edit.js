import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Api from "../../../api";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import NavigationIcon from "@material-ui/icons/Navigation";
import {CircularProgress} from "@material-ui/core";
import {  toast } from 'react-toastify';

class BrandEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            form: {
                title: '',
                slug: '',
                meta_title: '',
                meta_description: '',
                status: 1,
                content: ''
            }
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.api.fetchBrand(this.props.match.params.id).then((response) => {
            this.setState({
                form: {
                    title: response.title,
                    content: response.content,
                    slug: response.slug,
                    meta_title: response.meta_title,
                    meta_description: response.meta_description,
                    status: response.status,
                },
                loading: true,
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
        // let history = useHistory();
        event.preventDefault();
        this.api.updateBrand(this.props.match.params.id , this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    this.props.history.push('/products/brands');
                } else {
                    toast.error(response.msg);
                }
            }
        }).catch((error) => {
            console.log(error);
        })

    }


    render() {
        if (this.state.loading === false) {
            return <CircularProgress color={"secondary"} />
        }
        return (
            <div className={'content'}>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0', borderRadius: '30px'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>ویرایش اطلاعات</h2>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/products/brands'>
                                        <Button variant="contained" color="default" >
                                            <NavigationIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box  boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px'}}>
                        <form dir='rtl' onSubmit={this.handleSubmit.bind(this)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
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
                                <Grid item xs={12} >
                                    <TextField
                                        label="محتوا"
                                        variant="filled"
                                        margin='normal'
                                        value={this.state.form.content}
                                        fullWidth
                                        multiline
                                        name='content'
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
                                <Grid item xs={12} style={{ justifyContent: 'flex-end', display: 'flex'}}>
                                    <Button color="primary" variant={"contained"} type='submit'>
                                        ارسال اطلاعات
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
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
)(BrandEdit);
