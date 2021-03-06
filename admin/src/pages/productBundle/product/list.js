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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {toast} from "react-toastify";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Link} from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CurrencyFormat from "react-currency-format";
import Chip from "@material-ui/core/Chip";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            checked: [],
            expanded: [],
            entities : [],
            loading: true,
            filter: {
                status: -1,
                count: -1,
                discount: -1,
                brand_id: -1,
                package_type_id: -1
            },
            page: 1,
            brands: [],
            packageTypes: [],
            limit: 10,
            sort_field: 'id',
            sort_type: 'desc',
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

    async handleRequest() {
        let instance = new Api();

        instance.fetchProducts({
            filter: this.state.filter,
            sort_field: this.state.sort_field,
            sort_type: this.state.sort_type,
            page: this.state.page,
            limit: this.state.limit
        }).then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    entities: response,
                    loading: false,
                })
            }
        }).catch((error) => {
            console.log(error);
        })


        instance.fetchBrands().then((response) => {
            this.setState({
                brands: response.data
            });
        }).catch((error) => {
            toast(error);
        });

        instance.fetchPackageTypes().then((response) => {
            this.setState({
                packageTypes: response.data
            });
        }).catch((error) => {
            toast(error);
        });

    }

    render() {
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>مدیریت محصولات</h2>
                                <p style={{ color: '#8e8e8e'}}>کلیه محصولات در این صفحه لیست شده اند.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="contained" color="default" >
                                        <NavigationIcon />
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
                                    <Typography><b>جستجو در لیست</b></Typography>
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
                                            label="برند"
                                            value={this.state.filter.brand_id}
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='brand_id'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        >
                                            <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                            {this.state.brands && this.state.brands.map((brand, index) => {
                                                return(
                                                    <MenuItem key={index + 1} value={brand.id}>{brand.title}</MenuItem>
                                                );
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            select
                                            label="واحد"
                                            value={this.state.filter.package_type_id}
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='package_type_id'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        >
                                            <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                            {this.state.packageTypes && this.state.packageTypes.map((package_type, index) => {
                                                return(
                                                    <MenuItem key={index + 1} value={package_type.id}>{package_type.title}</MenuItem>
                                                );
                                            })}
                                        </TextField>
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
                                <TextField
                                    select
                                    value={this.state.limit}
                                    margin='dense'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChangeLimit.bind(this)}
                                >
                                    <MenuItem  value="10">10</MenuItem>
                                    <MenuItem  value="20">20</MenuItem>
                                    <MenuItem  value="30">30</MenuItem>
                                    <MenuItem  value="50">50</MenuItem>
                                    <MenuItem  value="100">100</MenuItem>
                                    <MenuItem  value="200">200</MenuItem>
                                </TextField>
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
                            <Tooltip title="افزودن">
                                <Link to='/products/create'>
                                <IconButton>
                                    <AddCircleIcon />
                                </IconButton>
                                </Link>
                            </Tooltip>
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
                                    <th onClick={() => this.handleChangeSort('package_type_id')}>واحد&nbsp;{this.state.sort_field === 'package_type_id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('price')}>قیمت (تومان)&nbsp;{this.state.sort_field === 'price' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('discount')}>تخفیف (درصد)&nbsp;{this.state.sort_field === 'discount' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('weight')}>وزن پستی (گرم)&nbsp;{this.state.sort_field === 'weight' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
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
                                            <td><b>{product.title.substr(0, 40) + '...'}</b></td>
                                            <td>{product.brand ? product.brand.title : '-'}</td>
                                            <td><CurrencyFormat value={product.count}  displayType={'text'} thousandSeparator={true}  /></td>
                                            <td>{product.package_type ? product.package_type.title : '-'}</td>
                                            <td><CurrencyFormat value={product.price}  displayType={'text'} thousandSeparator={true}  /></td>
                                            <td><CurrencyFormat value={product.discount}  displayType={'text'} thousandSeparator={true}  /></td>
                                            <td><CurrencyFormat value={product.weight}  displayType={'text'} thousandSeparator={true}  /></td>
                                            <td><CurrencyFormat value={product.sales_number}  displayType={'text'} thousandSeparator={true}  /></td>
                                            <td>
                                                <Tooltip title="وضعیت">
                                                    <Chip size={"small"} variant={"outlined"} color={product.status ? "primary": "secondary"}  label={product.status ? 'فعال' : 'غیرفعال'} />
                                                </Tooltip>
                                            </td>
                                            <td style={{ display:'flex', 'direction': 'row', justifyContent: 'center'}}>
                                                <Tooltip title="تغییر قیمت و موجودی">
                                                    <Link to={`/products/pins/${product.id}`}>
                                                        <IconButton>
                                                            <LocalOfferIcon />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip title="ویرایش">
                                                    <Link to={`/products/edit/${product.id}`}>
                                                        <IconButton>
                                                            <CreateIcon />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
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
                {this.state.loading && <CircularProgress color={"secondary"} />}
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
