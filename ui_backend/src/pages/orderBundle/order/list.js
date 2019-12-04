import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Box, CircularProgress, Tooltip} from "@material-ui/core";
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
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Api from "../../../api";
import Chip from "@material-ui/core/Chip";
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';
import {delivery, items, status, transport} from "../helper";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link} from "react-router-dom";
import ExcelDownload from '../excel/excel'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import EditIcon from '@material-ui/icons/Edit';

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
                from_date: '',
                to_date: '',
                user_id: ''
            },
            page: 1,
            limit: 10,
            sort_field: 'id',
            sort_type: 'desc',

            status: [],
            transport: [],
            delivery: [],
            items: [],
            options: [],
        }
    }

    componentDidMount() {

        let instance = new Api();
        instance.fetchOrderStatus().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    status: response.order_status,
                    transport: response.transport_status,
                    delivery: response.delivery_status,
                    items: response.items_status,
                })
            }
        });

        this.handleRequest();
    }

    autoCompleteHandleSelect = (id) =>
    {
        let filter = this.state.filter;
        filter.user_id = id;
        this.setState({
            filter
        });

        this.handleRequest();

    };

    async autoCompleteHandleChange(event)
    {
        let instance = new Api();
        instance.autoComplete('users', {'term': event.target.value}).then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    options: response
                })
            }
        });

    }



    async handleChangeLimit(event) {
        let limit = event.target.value;
        await new Promise((resolve => {
            resolve(this.setState({
                limit: parseInt(limit),
                page:  1,
                loading:true,
            }));
        }));

        await this.handleRequest()
    }

    setSelectedDay(value, name) {
        let filter = this.state.filter;
        filter[name] = value;
        this.setState({
            filter,
        });
        this.handleRequest();
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
                    from_date : this.state.filter.from_date ? this.state.filter.from_date.locale('es').format('YYYY/M/D HH:mm:ss') : '',
                    to_date : this.state.filter.to_date ? this.state.filter.to_date.locale('es').format('YYYY/M/D HH:mm:ss'): '',
                    order_status: this.state.filter.order_status,
                    transport_status: this.state.filter.transport_status,
                    delivery_status: this.state.filter.delivery_status,
                    items_status: this.state.filter.items_status,
                    user_id: this.state.filter.user_id
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
                    });
                    // toast.success('لیست بارگزاری شد.')
                }
            }).catch((error) => {
                console.log(error);
            }));
        }));

    }

    render() {

        return (
            <div className='content'>
                <CircularProgress style={{display: (this.state.loading ? 'block' : 'none'), zIndex: '9999'}} color={"secondary"} />
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
                                    <Grid item xs={12} sm={4} md={3}>
                                        <Autocomplete
                                            onChange={((event, value) => this.autoCompleteHandleSelect(value ? value.id : ''))}
                                            options={this.state.options}
                                            getOptionLabel={option => option.name + ' - ' + option.mobile}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    margin={"dense"}
                                                    label="کاربر"
                                                    variant="filled"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={this.autoCompleteHandleChange.bind(this)}
                                                />
                                            )}
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
                                                    <MenuItem key={key} value={sts.key}>{sts.value}</MenuItem>
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
                                                    <MenuItem key={key} value={sts.key}>{sts.value}</MenuItem>
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
                                                    <MenuItem key={key} value={sts.key}>{sts.value}</MenuItem>
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
                                                    <MenuItem key={key} value={sts.key}>{sts.value}</MenuItem>
                                                );
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <div className='datepicker-input-container '>
                                            <label>از تاریخ</label>
                                            <DatePicker
                                                value={this.state.filter.from_date}
                                                isGregorian={false}
                                                onChange={(value) => this.setSelectedDay(value,'from_date')}
                                            />

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <div className='datepicker-input-container '>
                                            <label>تا تاریخ</label>
                                            <DatePicker
                                                value={this.state.filter.to_date}
                                                isGregorian={false}
                                                onChange={(value) => this.setSelectedDay(value,'to_date')}
                                            />

                                        </div>
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
                            <ExcelDownload data={this.state.entities.data} />
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
                                    <th onClick={() => this.handleChangeSort('total_price')}>قیمت کل (تومان)&nbsp;{this.state.sort_field === 'total_price' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
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
                                        <tr className={ (parseInt(index)%2 === 0) ? 'animated slideInLeft' : 'animated slideInRight'} key={index}>
                                            <td>{entity.id}</td>
                                            <td>{entity.user ? entity.user.name : '-'}</td>
                                            <td>{entity.total_price}</td>
                                            <td>
                                                <Tooltip title="وضعیت">
                                                    <Chip size={"small"} variant={"outlined"} color={status()[entity.order_status.key].color}  label={entity.order_status.value} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="حمل و نقل">
                                                    <Chip size={"small"} variant={"outlined"} color={transport()[entity.transport_status.key].color}  label={entity.transport_status.value} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="تحویل">
                                                    <Chip size={"small"} variant={"outlined"} color={delivery()[entity.delivery_status.key].color}  label={entity.delivery_status.value} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="سلامت کالا">
                                                    <Chip size={"small"} variant={"outlined"} color={items()[entity.items_status.key].color}  label={entity.items_status.value} />
                                                </Tooltip>
                                            </td>
                                            <td style={{ direction:'rtl'}}>{moment(entity.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                                            <td style={{ display:'flex', 'direction': 'row', justifyContent: 'center'}}>
                                                <Tooltip title="مشاهده سفارش">
                                                    <Link to={`/orders/${entity.id}`}>
                                                        <IconButton>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                                {this.props.auth.permissions && Boolean(this.props.auth.permissions.order.update.access) ? <Tooltip title="تغییر وضعیت">
                                                    <Link to={`/orders/${entity.id}/edit-status`}>
                                                        <IconButton>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip> : ''}
                                                {this.props.auth.permissions && Boolean(this.props.auth.permissions.order.fractive_request.access) ? <Tooltip title="کسری و معیوبی">
                                                    <Link to={`/orders/${entity.id}/fractive-request`}>
                                                        <IconButton>
                                                            <FindReplaceIcon />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>: ''}

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
    return {
        auth: state.auth
    };
}

export default connect(
    mapStateToProps,
)(OrderList);
