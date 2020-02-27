import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Pagination from "react-js-pagination";
import Checkbox from "@material-ui/core/Checkbox";
import {toast} from "react-toastify";
import Chip from "@material-ui/core/Chip";
class ProductCategoryBrands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: 1,
            chipList: [],
            title: '',
            entities: [],
            entity: null, // checked item
        };
        this.api = new Api();
    }

    componentDidMount() {

        this.api.fetchProductCategory(this.props.match.params.id).then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    entity: response
                })
            }
        });

        this.handleRequest();
    }

    async handleChangeSearchInput(event) {
        let title = event.target.value;
        await new Promise(resolve => {
            resolve(this.setState({
                page: 1,
                title
            }));
        });

        this.handleRequest();

    }

    async handlePageChange(page) {

        await new Promise((resolve => {
            resolve(this.setState({
                page: page
            }));
        }));

        this.handleRequest()
    }

    handleRequest() {

        this.api.getProductCategoryBrands(this.props.match.params.id).then((response) => {
           if (typeof response != "undefined") {
               this.setState({
                   chipList: response
               });
           }
        }).catch((error) => {
            toast.error(error)
        });

        this.api.getAllBrandsWithChecked(this.props.match.params.id, {page: this.state.page, title: this.state.title}).then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    entities: response,
                    loading: false
                })
            }
        }).catch((error) => {
            toast.error(error);
        });

    }

    chipDeleteable(id) {
        this.setState({
            loading: true
        });

        let instance = new Api();
        instance.storeProductCategoryBrands(this.props.match.params.id, {
            brands: id
        }).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.setState({
                        loading: false,
                    });
                    this.handleRequest();
                    toast.success(response.msg);
                }
            }
        }).catch((error) => {
            toast.error(error);
        })
    }

    handleChangeAttr(event) {

        this.setState({
            loading: true
        });

        let instance = new Api();
        instance.storeProductCategoryBrands(this.props.match.params.id, {
            brands: event.target.value
        }).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.setState({
                        loading: false,
                    });
                    this.handleRequest();
                    toast.success(response.msg);
                }
            }
        }).catch((error) => {
            toast.error(error);
        })
    }

    render() {

        return (
            <div className={'content'}>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0', borderRadius: '30px'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>دسته بندی <b style={{ color:'blue'}}>{this.state.entity && this.state.entity.label}</b></h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید به صورت گروهی برندها را تغییر دهید.</p>
                                <p style={{ color: '#ff5b60'}}>کلیه زیر شاخه ها برندها  را به ارث میبرند.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/categories'>
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
                                    <Typography><b>جستجو در لیست</b></Typography>
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
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
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
                    <Box style={{ display:'flex', justifyContent: 'center', flexWrap:'wrap'}}>
                        {this.state.chipList && this.state.chipList.map((chip, index) => {
                            return(
                                <Chip key={index} style={{ margin: '7px 5px'}} onDelete={() => this.chipDeleteable(chip.id)} label={chip.title} />
                            );
                        })}
                    </Box>
                    <div style={{ position: 'relative', marginTop: '15px'}}>
                        <Box boxShadow={2} style={{ backgroundColor: (!this.state.loading ? '#fff' : 'rgb(0,0,0, 0.5)'), padding: '25px', borderRadius: '7px'}}>
                            <Grid container>
                                {this.state.entities.data && this.state.entities.data.map((entity, index) => {
                                    return(
                                        <Grid key={index} item xs={6} sm={3}>
                                            <FormControlLabel  control={
                                                <Checkbox
                                                    value={entity.id}
                                                    checked={Boolean(entity.checked)}
                                                    onChange={this.handleChangeAttr.bind(this)}
                                                    name='brands'
                                                />
                                            } label={entity.title} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                        <Pagination
                            activePage={this.state.page}
                            itemsCountPerPage={52}
                            totalItemsCount={this.state.entities.total}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                        {this.state.loading && <CircularProgress color={"secondary"} size={25} />}
                    </div>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        states: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCategoryBrands);
