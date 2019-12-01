import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Snackbar, Tooltip} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from 'react-router-dom'
import AttributeCreate from "./../GroupAttribute/create";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Pagination from "react-js-pagination";
import Checkbox from "@material-ui/core/Checkbox";
import {toast} from "react-toastify";

class ProductCategoryAttribute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entities: [],
            entity: null,
            page: 1,
            loading: false,
            filter: {},
            snackbar: {open: false, msg: null},
            checkedItems : new Map(),
        };
        this.api = new Api();
    }

    componentDidMount() {
        this.handleRequest();
    }

    async handleChangeSearchInput(event) {
        let filter = this.state.filter;
        filter[event.target.name] = event.target.value;
        await new Promise((resolve => {
            resolve(this.setState({
                filter,
                page: 1,
                loading: false,
            }));
        }));

        this.handleRequest();

    }

    async handlePageChange(page) {

        await new Promise((resolve => {
            resolve(this.setState({
                page: page
            }));
        }));

        await this.handleRequest()
    }

    async handleRequest() {

        this.setState({
            loading: false
        });

        await new Promise((resolve => {
            resolve( this.api.fetchProductCategory(this.props.match.params.id).then((response) => {
                if (typeof  response != "undefined") {
                    this.setState({
                        entity: response,
                    });
                }
            }).catch((error) => {
                console.log(error);
            }));
        }));

        await new Promise((resolve => {
            resolve( this.api.fetchAttributes({filter: this.state.filter, page: this.state.page}).then((response) => {
                if (typeof  response != "undefined") {
                    this.setState({
                        entities: response,
                    });
                }
            }).catch((error) => {
                console.log(error);
            }));
        }));

        await new Promise(resolve => {
            resolve(this.api.getProductCategoryAttributes(this.props.match.params.id).then((response) => {
                response.forEach((key, value) => {
                    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(key.id, true)}));
                });
            }).catch((error) => {
                console.log(error);
            }));
        });

        await new Promise((resolve => {
            resolve(this.setState({
                loading: true,
                snackbar: {
                    open: true,
                    msg: 'لیست بارگزاری شد.'
                }
            }));
        }));

    }

    handleSnackbar(parameter) {
        this.setState({
            snackbar:{
                open: parameter.open,
                msg: parameter.msg
            }
        })
    }

    handleChangeAttr(event) {
        let val = parseInt(event.target.value);

        if (event.target.checked) {
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, true)}));
        } else {
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, false)}));
        }
        let instance = new Api();
        instance.storeProductCategoryAttribute(this.props.match.params.id, {
            attributes: event.target.value
        }).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.setState({
                        loading: true,
                    });
                    toast.success(response.msg);
                }
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className={'content'}>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0', borderRadius: '30px'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>دسته بندی <b style={{ color:'blue'}}>{this.state.entity ? this.state.entity.label : ''}</b></h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید به صورت گروهی ویژگی دسته بندی ها را تغییر دهید.</p>
                                <p style={{ color: '#8e8e8e'}}>کلیه زیر شاخه ها ویژگیها را به ارث میبرند.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/products/categories'>
                                        <Button variant="contained" color="default" >
                                            <NavigationIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{ margin: '20px 0'}} boxShadow={0}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div>
                                    <Typography>جستجو در لیست</Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={4} >
                                        <TextField
                                            id="outlined-name"
                                            label="عنوان"
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='title'
                                            helperText='پس از تغییر روی دکمه جستجو کلیک کنید'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onBlur={this.handleChangeSearchInput.bind(this)}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                <Button color="primary">
                                    جستجو
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <AttributeCreate handleRequest={this.handleRequest.bind(this)} handleSnackbar={this.handleSnackbar.bind(this)} />
                    </Box>
                    {!this.state.loading ? <CircularProgress color={"secondary"} /> : <div>
                        <Box boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px'}}>
                        <Grid container>
                            {this.state.entities.data.map((entity, index) => {
                                return(
                                    <Grid key={index} item xs={6} sm={3}>
                                        <FormControlLabel  control={
                                            <Checkbox
                                                value={entity.id}
                                                checked={this.state.checkedItems.get(entity.id)}
                                                onChange={this.handleChangeAttr.bind(this)}
                                                name='attribues'
                                            />
                                        } label={entity.title} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                        <Pagination
                            activePage={this.state.page}
                            itemsCountPerPage={this.state.entities.per_page}
                            totalItemsCount={this.state.entities.total}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        /></div> }

                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        states: state.userBundleReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCategoryAttribute);
