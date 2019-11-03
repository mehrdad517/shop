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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Api from "../../api";
import Chip from "@material-ui/core/Chip";
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            loading: true,
            entities : [],
            filter: {
                id: '',
                status: -1,
                transport: -1,
                from_date: moment()
            },
            page: 1,
            limit: 50,
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

    setSelectedDay = (value) => {
        let filter = this.state.filter;
        filter.from_date = value;
        this.setState({
            filter
        });

        this.handleRequest();
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
        console.log('xxx')
        let instance = new Api();

        await new Promise((resolve => {
            resolve(instance.fetchOrders({
                filter: {
                    id: this.state.filter.id,
                    from_date : this.state.filter.from_date.locale('es').format('YYYY/M/D HH:mm:ss'),
                    status: this.state.filter.status,
                    transport: this.state.filter.transport,
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
                                    <DatePicker
                                        value={this.state.filter.from_date}
                                        isGregorian={false}
                                        onChange={this.setSelectedDay.bind(this)}
                                    />
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
                                            <MenuItem key={1} value={1}>تایید شده</MenuItem>
                                            <MenuItem key={2} value={0}>در انتظار</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            select
                                            label="حمل و نقل"
                                            value={this.state.filter.transport}
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
                                            <MenuItem key={1} value={0}>در انتظار</MenuItem>
                                            <MenuItem key={2} value={1}>در صف ارسال</MenuItem>
                                            <MenuItem key={3} value={2}>خروج از انبار</MenuItem>
                                            <MenuItem key={4} value={3}>مرجوعی</MenuItem>
                                            <MenuItem key={5} value={4}>تحویل مشتری</MenuItem>
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
                                    <th onClick={() => this.handleChangeSort('user_id')}>کاربر&nbsp;{this.state.sort_field === 'user_id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('total_price')}>قیمت کل&nbsp;{this.state.sort_field === 'total_price' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('status')}>وضعیت&nbsp;{this.state.sort_field === 'status' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('transport')}>حمل و نقل&nbsp;{this.state.sort_field === 'transport' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
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
                                                        {entity.status === 1 ?   <Chip size={"small"} variant={"outlined"} color="primary"  label="تایید شده" /> :    <Chip size={"small"} variant={"outlined"} color="secondary" label="در انتظار" /> }
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="حمل و نقل">
                                                    {entity.transport === 1 ?   <Chip size={"small"} variant={"outlined"} color="primary"  label="تحویل مشتری" /> :    <Chip size={"small"} variant={"outlined"} color="secondary" label="خروج از انبار" /> }
                                                </Tooltip>
                                            </td>
                                            <td>{entity.created_at}</td>
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
