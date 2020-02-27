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
import UserCreate from "./create";
import SyncIcon from '@material-ui/icons/Sync';
import UserEdit from "./edit";
import Dialog from "@material-ui/core/Dialog";
import ChangePassword from "./changePassword";
import Api from "../../../api";
import {Link} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment-jalaali'

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: [],
            roles: [],
            editDialog: false,
            changePasswordDialog: false,
            user_id: null,
            filter: {
                role_key: -1,
                status: -1
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

    changeStatus(id, status)
    {
        this.setState({
            loading:true
        });

        this.api.changeStatus(id, {'status' : status}).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.handleRequest();
                }
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    async handleRequest() {
        let roles ;
        let users ;
        await this.api.fetchRoles().then((response) => {
            if (typeof response != "undefined") {
                roles = response
            }
        });

        await this.api.fetchUsers({
            search: this.state.filter,
            sort_field: this.state.sort_field,
            sort_type: this.state.sort_type,
            page: this.state.page,
            limit: this.state.limit
        }).then((response) => {
            if (typeof response != "undefined") {
                users = response
            }
        });

        await this.setState({
            loading: false,
            users,
            roles,
        })

    }

    render() {
        return (
            <div className='content'>
                <CircularProgress style={{display: (this.state.loading ? 'block' : 'none'), zIndex: '9999'}} color={"secondary"} />
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>مدیریت کاربران</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید کاربران را مدیریت کنید.</p>
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
                                    <Typography>جستجو در لیست</Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            id="outlined-name"
                                            label="نام کاربر"
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='name'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            label="موبایل"
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='mobile'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            select
                                            label="نقش"
                                            variant="filled"
                                            value={this.state.filter.role_key}
                                            margin='dense'
                                            fullWidth
                                            name='role_key'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        >
                                            <MenuItem key={0} value={0}>انتخاب</MenuItem>
                                            {this.state.roles && this.state.roles.map((role, index) => {
                                                return <MenuItem key={index} value={role.key}>{role.title ? role.title : role.key}</MenuItem>
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
                                    itemsCountPerPage={this.state.users && this.state.users.per_page}
                                    totalItemsCount={this.state.users && this.state.users.total}
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
                            {this.props.auth.permissions.user && Boolean(this.props.auth.permissions.user.store.access) ? <UserCreate handleRequest={() => this.handleRequest()} roles={this.state.roles} />: ''}
                        </div>
                        <div style={{ overflowX: 'auto'}}>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th onClick={() => this.handleChangeSort('id')}>#&nbsp;{ this.state.sort_field === 'id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('name')}>نام &nbsp;{this.state.sort_field === 'name' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('role_key')}>نقش&nbsp;{this.state.sort_field === 'role_key' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('mobile')}>موبایل&nbsp;{this.state.sort_field === 'mobile' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('created_at')}>تاریخ ثبت نام&nbsp;{this.state.sort_field === 'created_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('status')}>وضعیت&nbsp;{this.state.sort_field === 'status' ? (this.state.sort_type === 'desc' ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>) : <SortIcon/>}</th>
                                    <th>عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.data  && this.state.users.data.map((user, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.role ? user.role.title ? user.role.title: user.role.key : '-'}</td>
                                            <td>{user.mobile}</td>
                                            <td style={{ direction: 'ltr'}}>{moment(user.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                                            <td>
                                                <Tooltip title="وضعیت">
                                                    <Chip size={"small"} variant={"outlined"} color={user.status ? "primary": "secondary"}  label={user.status ? 'فعال' : 'بلاک'} />
                                                </Tooltip>
                                            </td>
                                            <td style={{ display:'flex', 'direction': 'row', justifyContent: 'center'}}>
                                                {this.props.auth.permissions.user && Boolean(this.props.auth.permissions.user.update.access) ?  <Tooltip title="ویرایش کاربر">
                                                    <IconButton onClick={() =>this.setState({ editDialog: true, user_id: user.id})}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>: '' }
                                                {this.props.auth.permissions.user && Boolean(this.props.auth.permissions.user.change_password.access) ? <Tooltip title="تغییر رمز عبور">
                                                    <IconButton onClick={() =>this.setState({ changePasswordDialog: true, user_id: user.id})}>
                                                        <LockIcon />
                                                    </IconButton>
                                                </Tooltip>: '' }
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            activePage={this.state.page}
                            itemsCountPerPage={this.state.users && this.state.users.per_page}
                            totalItemsCount={this.state.users && this.state.users.total}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </Box>
                </Container>
                <Dialog open={this.state.editDialog}  onClose={() => this.setState({editDialog: false})}>
                    <UserEdit id={this.state.user_id} roles={this.state.roles}  handleRequest={() => this.handleRequest()} onClose={() => this.setState({editDialog: false})} />
                </Dialog>
                <Dialog open={this.state.changePasswordDialog}  onClose={() => this.setState({changePasswordDialog: false})}>
                    <ChangePassword id={this.state.user_id}  onClose={() => this.setState({changePasswordDialog: false})} />
                </Dialog>
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
)(UserList);
