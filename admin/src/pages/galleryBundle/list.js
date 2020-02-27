import React, {Component} from 'react';
import {connect} from 'react-redux';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import NavigationIcon from "@material-ui/icons/Navigation";
import {Box, Tooltip} from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SortIcon from '@material-ui/icons/Sort';
import Pagination from "react-js-pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from '@material-ui/core/MenuItem';
import SyncIcon from '@material-ui/icons/Sync';
import Api from "../../api";
import {Link} from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Chip from "@material-ui/core/Chip";
import CreateIcon from "@material-ui/icons/Create";
import moment from 'moment-jalaali'

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            entities: [],
            users: [], // Filter
            filter: {
                status: -1,
                created_by: -1
            },
            page: 1,
            limit: 10,
            sort_field: 'id',
            sort_type: 'desc',
        };

        this.api = new Api();

        this.handleRequest = this.handleRequest.bind(this);
    }

    componentDidMount() {
        this.handleRequest()
    }

    async handleChangeLimit(event) {

        let limit = event.target.value;
        await new Promise((resolve => {
            resolve(this.setState({
                limit: parseInt(limit),
                page:  1,
                loading: true,
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

        this.api.autoComplete('users/accessible').then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    users : response
                });
            }
        });

        await this.api.getGalleries({
            filter: this.state.filter,
            sort_field: this.state.sort_field,
            sort_type: this.state.sort_type,
            page: this.state.page,
            limit: this.state.limit
        }).then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    entities: response,
                    loading: false
                })
            }
        });

    }

    render() {
        return (
            <div className='content'>
                <CircularProgress style={{display: (this.state.loading ? 'block' : 'none'), zIndex: '9999'}} color={"secondary"} />
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>گالری تصاویر و اسلایدها</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید گالری تصاویر و اسلایدایجاد کنید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Link to='/' style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="contained" color="default" >
                                        <NavigationIcon />
                                    </Button>
                                </Link>
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
                                            select
                                            label="کاربران"
                                            variant="filled"
                                            value={this.state.filter.created_by}
                                            margin='dense'
                                            fullWidth
                                            name='created_by'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        >
                                            <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                            {this.state.users && this.state.users.map((user, index) => {
                                                return(
                                                    <MenuItem key={index} value={user.id}>{user.name}</MenuItem>
                                                );
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            select
                                            label="وضعیت"
                                            variant="filled"
                                            value={this.state.filter.status}
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
                                    itemsCountPerPage={this.state.entities && this.state.entities.per_page}
                                    totalItemsCount={this.state.entities && this.state.entities.total}
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
                            {Boolean(this.props.auth.permissions.gallery.store.access) ?  <Tooltip title="افزودن">
                                <Link to={'/galleries/create'}>
                                    <IconButton>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip> : ''}
                        </div>
                        <div style={{ overflowX: 'auto'}}>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th onClick={() => this.handleChangeSort('id')}>#&nbsp;{ this.state.sort_field === 'id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('title')}>عنوان&nbsp;{this.state.sort_field === 'title' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('created_by')}>ایجاد کننده&nbsp;{this.state.sort_field === 'created_by' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th>تعداد فایل</th>
                                    <th onClick={() => this.handleChangeSort('is_slider')}>اسلایدر&nbsp;{this.state.sort_field === 'is_slider' ? (this.state.sort_type === 'desc' ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>) : <SortIcon/>}</th>
                                    <th onClick={() => this.handleChangeSort('status')}>وضعیت&nbsp;{this.state.sort_field === 'status' ? (this.state.sort_type === 'desc' ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>) : <SortIcon/>}</th>
                                    <th onClick={() => this.handleChangeSort('created_at')}>تاریخ ایجاد&nbsp;{this.state.sort_field === 'created_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th>عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.entities.data  && this.state.entities.data.map((entity, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{entity.id}</td>
                                            <td>{entity.title}</td>
                                            <td>{entity.created_by.name}</td>
                                            <td>{entity.files.length}</td>
                                            <td>
                                                <Tooltip title="وضعیت">
                                                    <Chip size={"small"} variant={"outlined"} color={entity.is_slider ? "primary": "secondary"}  label={entity.is_slider ? 'هست' : 'نیست'} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="وضعیت">
                                                    <Chip size={"small"} variant={"outlined"} color={entity.status ? "primary": "secondary"}  label={entity.status ? 'فعال' : 'غیرفعال'} />
                                                </Tooltip>
                                            </td>
                                            <td style={{ direction: 'ltr'}}>{moment(entity.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                                            <td>
                                                {Boolean(this.props.auth.permissions.gallery.update.access) ? <Tooltip title="ویرایش">
                                                    <Link to={`/galleries/${entity.id}/edit/`}>
                                                        <IconButton>
                                                            <CreateIcon />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip> : '-' }

                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            activePage={this.state.page}
                            itemsCountPerPage={this.state.entities && this.state.entities.per_page}
                            totalItemsCount={this.state.entities && this.state.entities.total}
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

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Gallery);
