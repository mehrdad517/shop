import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Box, CircularProgress, Tooltip} from "@material-ui/core";
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
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {toast} from "react-toastify";
import Api from "../../api";
import Chip from "@material-ui/core/Chip";
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';
import {delivery, items, status, transport} from "./helper";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            loading: true,
            entities : [],
            filter: {
                id: '',
                order_status: -1,
                transport_status: -1,
                delivery_status: -1,
                items_status: -1,
                from_date: moment()
            },
            page: 1,
            limit: 50,
            sort_field: 'id',
            sort_type: 'desc',
            transport: transport(),
            delivery: delivery(),
            items: items(),
            status: status(),
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

    setSelectedDay = (value) => {
        let filter = this.state.filter;
        filter.from_date = value;
        //this.setState({
        //    filter
        //});

        //this.handleRequest();
    };

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

        await new Promise((resolve => {
            resolve(instance.fetchOrders({
                filter: {
                    id: this.state.filter.id,
                    from_date : this.state.filter.from_date.locale('es').format('YYYY/M/D HH:mm:ss'),
                    order_status: this.state.filter.order_status,
                    transport_status: this.state.filter.transport_status,
                    delivery_status: this.state.filter.delivery_status,
                    items_status: this.state.filter.items_status,
                },
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
                    toast.success('لیست بارگزاری شد.')
                }
            }).catch((error) => {
                console.log(error);
            }));
        }));

    }

    render() {
        if (this.state.loading) {
            return (<CircularProgress color={"secondary"} />);
        }
        console.log(this.state);
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>مدیریت سفارشات</h2>
                                <p style={{ color: '#8e8e8e'}}>کلیه سفارشات در این صفحه لیست شده اند.</p>
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
                                    <Typography>جستجو در لیست</Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            id="outlined-name"
                                            label="کد سفارش"
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
                                            select
                                            label="وضعیت"
                                            value={this.state.filter.order_status}
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='order_status'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        >
                                            <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                            {this.state.status.map((sts, key) => {
                                                return(
                                                    <MenuItem key={key} value={key}>{sts.title}</MenuItem>
                                                );
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            select
                                            label="حمل و نقل"
                                            value={this.state.filter.transport_status}
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='transport_status'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        >
                                            <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                            {this.state.transport.map((sts, key) => {
                                                return(
                                                    <MenuItem key={key} value={key}>{sts.title}</MenuItem>
                                                );
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            select
                                            label="تحویل مرسوله"
                                            value={this.state.filter.delivery_status}
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='delivery_status'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        >
                                            <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                            {this.state.delivery.map((sts, key) => {
                                                return(
                                                    <MenuItem key={key} value={key}>{sts.title}</MenuItem>
                                                );
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            select
                                            label="تعدیل کالا"
                                            value={this.state.filter.items_status}
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='items_status'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        >
                                            <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                            {this.state.items.map((sts, key) => {
                                                return(
                                                    <MenuItem key={key} value={key}>{sts.title}</MenuItem>
                                                );
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid item>
                                        <DatePicker
                                            value={this.state.filter.from_date}
                                            isGregorian={false}
                                            onChange={this.setSelectedDay.bind(this)}
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
                                    <th onClick={() => this.handleChangeSort('user_id')}>کاربر&nbsp;{this.state.sort_field === 'user_id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('total_price')}>قیمت کل&nbsp;{this.state.sort_field === 'total_price' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('order_status')}>وضعیت&nbsp;{this.state.sort_field === 'order_status' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('transport_status')}>حمل و نقل&nbsp;{this.state.sort_field === 'transport_status' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('delivery_status')}>تحویل&nbsp;{this.state.sort_field === 'delivery_status' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('items_status')}>تعدیل کالا&nbsp;{this.state.sort_field === 'items_status' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('created_at')}>تاریخ&nbsp;{this.state.sort_field === 'created_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th>عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.entities.data && this.state.entities.data.map(( entity, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{entity.id}</td>
                                            <td>{entity.user ? entity.user.name : '-'}</td>
                                            <td>{entity.total_price}</td>
                                            <td>
                                                <Tooltip title="وضعیت">
                                                    <Chip size={"small"} variant={"outlined"} color={this.state.status[entity.order_status] && this.state.status[entity.order_status].color}  label={this.state.status[entity.order_status] && this.state.status[entity.order_status].title} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="حمل و نقل">
                                                    <Chip size={"small"} variant={"outlined"} color={this.state.transport[entity.transport_status] && this.state.transport[entity.transport_status].color}  label={this.state.transport[entity.transport_status] && this.state.transport[entity.transport_status].title} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="تحویل">
                                                    <Chip size={"small"} variant={"outlined"} color={this.state.delivery[entity.delivery_status] && this.state.delivery[entity.delivery_status].color}  label={this.state.delivery[entity.delivery_status] && this.state.delivery[entity.delivery_status].title} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="سلامت کالا">
                                                    <Chip size={"small"} variant={"outlined"} color={this.state.items[entity.items_status] && this.state.items[entity.items_status].color}  label={this.state.items[entity.items_status] && this.state.items[entity.items_status].title} />
                                                </Tooltip>
                                            </td>
                                            <td style={{ direction:'rtl'}}>{moment(entity.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</td>
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(OrderList);
