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
import Api from "../../../api";
import Chip from "@material-ui/core/Chip";
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link} from "react-router-dom";

class AnbarList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            loading: true,
            entities : [],
            filter: {
                from_date: '',
                to_date: ''
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


    setSelectedDay(value, name) {
        let filter = this.state.filter;
        filter[name] = value;
        this.setState({
            filter,
        });
        this.handleRequest();
    };


    async handleRequest() {
        let instance = new Api();

        await new Promise((resolve => {
            resolve(instance.fetchAnbar({
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
                    });
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
                                <h2>مدیریت انبار</h2>
                                <p style={{ color: '#8e8e8e'}}>کلیه فاکتورهای تجمیعی در این صفحه لیست شده اند.</p>
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
                                    <th>تعداد</th>
                                    <th>ار سفارش</th>
                                    <th>تا سفارش</th>
                                    <th onClick={() => this.handleChangeSort('created_at')}>تاریخ&nbsp;{this.state.sort_field === 'created_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <td>مشاهده سفارشات</td>
                                    <th>عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.entities && this.state.entities.map(( entity, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{entity.id}</td>
                                            <td>{entity.count}</td>
                                            <td>{entity.min}</td>
                                            <td>{entity.max}</td>
                                            <td style={{ direction:'rtl'}}>{moment(entity.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                                            <td>
                                                <Tooltip title="مشاهده سفارشات">
                                                    <Link to={`/orders/${entity.id}`}>
                                                        <IconButton>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="تولید بارکد">
                                                    <Chip size={"small"} variant={"outlined"} color={entity.barcode ? 'primary' : 'default'} clickable={true}  label='تولید بارکد' />
                                                </Tooltip>&nbsp;|&nbsp;
                                                <Tooltip title="برچسب انبار">
                                                    <Chip size={"small"} variant={"outlined"} color={entity.barcode ? 'primary' : 'default'} clickable={true}  label='برچسب انبار' />
                                                </Tooltip>&nbsp;|&nbsp;
                                                <Tooltip title="فاکتور کالا">
                                                    <Chip size={"small"} variant={"outlined"} color={entity.barcode ? 'primary' : 'default'} clickable={true}  label='فاکتور کالا' />
                                                </Tooltip>&nbsp;|&nbsp;
                                                <Tooltip title="خروج از انبار">
                                                    <Chip size={"small"} variant={"outlined"} color={entity.barcode ? 'primary' : 'default'} clickable={true}  label='خروج از انبار' />
                                                </Tooltip>&nbsp;|&nbsp;
                                                <Tooltip title="ارسال اطلاعات">
                                                    <Chip size={"small"} variant={"outlined"} color={entity.barcode ? 'primary' : 'default'} clickable={true}  label='ارسال اطلاعات' />
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(AnbarList);
