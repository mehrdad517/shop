import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Box, CircularProgress, Snackbar, Tooltip} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";


import Container from "@material-ui/core/Container";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Pagination from "react-js-pagination";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SortIcon from '@material-ui/icons/Sort';
import SyncIcon from '@material-ui/icons/Sync';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            news: '',
            entities : [],
            loading: false,
            filter: {
                status: -1,
                count: -1,
                discount: -1
            },
            page: 1,
            limit: 10,
            sort_field: 'id',
            sort_type: 'desc',
            snackbar: {
              open: false,
              msg: null
            }
        }
    }

    componentDidMount() {
        this.handleRequest();
    }

    async handleChangeLimit(event) {
        let limit = event.target.value;
        await new Promise((resolve => {
            resolve(this.setState({
                    limit: parseInt(limit),
                    page:  1
            }));
        }));

        await this.handleRequest()
    }

    async handleChangeSearchInput(event) {
        let filter = this.state.filter;
        filter[event.target.name] = event.target.value;
        await new Promise((resolve => {
            resolve(this.setState({
                filter,
                page: 1
            }));
        }));

        this.handleRequest();

    }

    async handleChangeSort(parameter) {
        await new Promise((resolve => {
            resolve(this.setState({
                    sort_field : parameter,
                    sort_type : (this.state.sort_type === 'desc' ? 'asc' : 'desc'),
                    page: 1
            }));
        }));

        await this.handleRequest();

    }

    async handlePageChange(page) {

        await new Promise((resolve => {
            resolve(this.setState({
                    page: page
            }));
        }));

        await this.handleRequest()
    }


    changeStatus(id, status) {
        this.setState({
            loading: false,
        });
        let instance = new Api();
        instance.changeProductStatus(id, {'status' : status}).then((response) => {
            if (response.status) {
                this.handleRequest();
            }
            this.setState({
                snackbar: {
                    open: true,
                    msg: response.msg
                },
                loading: true
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    async handleRequest() {
        let instance = new Api();

        instance.fetchProductCategories().then((response) => {
            this.setState({
                news : response
            });
        })
        instance.fetchProducts({
            filter: this.state.filter,
            sort_field: this.state.sort_field,
            sort_type: this.state.sort_type,
            page: this.state.page,
            limit: this.state.limit
        }).then((response) => {
                this.setState({
                    entities: response,
                    loading: true,
                    snackbar: {
                        open: true,
                        msg: 'لیست بارگزاری گردید.'
                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        if (!this.state.loading) {
            return (<CircularProgress color={"secondary"} />);
        }
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                {this.state.news}
                                <h2>مدیریت محصولات</h2>
                                <p style={{ color: '#8e8e8e'}}>کلیه محصولات در این صفحه لیست شده اند.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="contained" color="default" >
                                        بازگشت&nbsp;<NavigationIcon />
                                    </Button>
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
                                <Grid item xs={12} sm={4} md={3} >
                                    <TextField
                                        id="outlined-name"
                                        label="کد محصول"
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='id'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeSearchInput.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} >
                                    <TextField
                                        id="outlined-name"
                                        label="نام محصول"
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
                                <Grid item xs={12} sm={4} md={3} >
                                    <TextField
                                        select
                                        label="موجودی"
                                        value={this.state.filter.count}
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='count'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeSearchInput.bind(this)}
                                    >
                                        <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                        <MenuItem key={1} value={1}>دارد</MenuItem>
                                        <MenuItem key={2} value={0}>ندارد</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} >
                                    <TextField
                                        select
                                        label="وضعیت"
                                        value={this.state.filter.status}
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='status'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeSearchInput.bind(this)}
                                    >
                                        <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                        <MenuItem key={1} value={1}>فعال</MenuItem>
                                        <MenuItem key={2} value={0}>غیرفعال</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} >
                                    <TextField
                                        select
                                        label="تخفیف"
                                        value={this.state.filter.discount}
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='discount'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeSearchInput.bind(this)}
                                    >
                                        <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                        <MenuItem key={1} value={1}>دارد</MenuItem>
                                        <MenuItem key={2} value={0}>ندارد</MenuItem>
                                    </TextField>
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
                    <Box style={{ margin: '20px 0 0 0'}}>
                        <Grid container alignItems="center" >
                            <Grid item xs={4} sm={6}>
                                <FormControl>
                                    <NativeSelect
                                        value={this.state.limit}
                                        onChange={this.handleChangeLimit.bind(this)}
                                        name="age"
                                        inputProps={{ 'aria-label': 'age' }}
                                    >
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={8} sm={6}>
                                <Pagination
                                    activePage={this.state.page}
                                    itemsCountPerPage={this.state.entities.per_page}
                                    totalItemsCount={this.state.entities.total}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange.bind(this)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <div style={{ display: 'flex', direction: 'row', justifyContent: 'flex-end'}}>
                            <Tooltip title="سینک">
                                <IconButton onClick={() => this.handleRequest()} >
                                    <SyncIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div style={{ overflowX: 'auto'}}>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th onClick={() => this.handleChangeSort('id')}>#&nbsp;{ this.state.sort_field === 'id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('title')}>نام &nbsp;{this.state.sort_field === 'title' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('brand_id')}>برند &nbsp;{this.state.sort_field === 'brand_id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('count')}>موجودی&nbsp;{this.state.sort_field === 'count' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('price')}>قیمت&nbsp;{this.state.sort_field === 'price' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('discount')}>تخفیف&nbsp;{this.state.sort_field === 'discount' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('sales_number')}>تعداد فروش&nbsp;{this.state.sort_field === 'sales_number' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('status')}>وضعیت&nbsp;{this.state.sort_field === 'status' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th>عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.entities.data && this.state.entities.data.map((product, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>{product.title}</td>
                                            <td>{product.brand.title}</td>
                                            <td>{product.count}</td>
                                            <td>{product.price}</td>
                                            <td>{product.discount}</td>
                                            <td>{product.sales_number}</td>
                                            <td>
                                                <Tooltip title="تغییر وضعیت">
                                                    <IconButton onClick={() => this.changeStatus(product.id, !product.status)}>
                                                        {product.status === 1 ? <CheckCircleIcon color='primary' /> :  <RemoveCircleOutlineIcon color='secondary' /> }
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                            <td style={{ display:'flex', 'direction': 'row', justifyContent: 'center'}}>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            activePage={this.state.page}
                            itemsCountPerPage={this.state.entities.per_page}
                            totalItemsCount={this.state.entities.total}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </Box>
                </Container>
                <Snackbar
                    autoHideDuration={4500}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.msg}
                    onClose={() => this.setState({snackbar:{open: false,msg: null}})}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ProductList);
