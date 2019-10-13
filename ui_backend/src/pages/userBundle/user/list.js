import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './../../header'
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
import {fetchRoles, fetchUsers} from "../../../actions/userBundleAction";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from "@material-ui/core/FormControl";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SortIcon from '@material-ui/icons/Sort';
import Pagination from "react-js-pagination";
import NativeSelect from "@material-ui/core/NativeSelect";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from '@material-ui/core/MenuItem';
import UserCreate from "./create";
import SyncIcon from '@material-ui/icons/Sync';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import UserEdit from "./edit";
import Dialog from "@material-ui/core/Dialog";


class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editDialog: false,
            user_id: null,
            filter: {
                role_key: 0
            },
            page: 1,
            limit: 10,
            sort_field: 'id',
            sort_type: 'desc',
        };
    }

    componentDidMount() {
        this.props.fetchRoles();
        this.props.fetchUsers();
    }

    async handleChangeLimit(event) {

        let limit = event.target.value;
        await new Promise((resolve => {
            resolve(this.setState({
                limit: parseInt(limit)
            }));
        }));

        await this.handleRequest()
    }

    handleChangeSearchInput(event) {
        let filter = this.state.filter;

        filter[event.target.name] = event.target.value;

        this.handleRequest();

    }

    async handleChangeSort(parameter) {
        await new Promise((resolve => {
            resolve(this.setState({
                sort_field : parameter,
                sort_type : (this.state.sort_type === 'desc' ? 'asc' : 'desc')
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

    handleRequest(request) {
        this.props.fetchUsers({
            search: this.state.filter,
            page: this.state.page,
            limit: this.state.limit,
            sort_field: this.state.sort_field,
            sort_type: this.state.sort_type
        });
    }

    render() {
        if (!this.props.entities.users.data) {
            return (<CircularProgress color='secondary' />);
        }
        return (
            <div className='content'>
                <Header />
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>مدیریت کاربران</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید سطح دسترسی برای هر نقش تعیین کنید.</p>
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
                                    {/*<Grid item xs={12} sm={4} md={3} >*/}
                                    {/*    <TextField*/}
                                    {/*        label="ایمیل"*/}
                                    {/*        variant="filled"*/}
                                    {/*        margin='dense'*/}
                                    {/*        fullWidth*/}
                                    {/*        name='email'*/}
                                    {/*        InputLabelProps={{*/}
                                    {/*            shrink: true,*/}
                                    {/*        }}*/}
                                    {/*        onChange={this.handleChangeSearchInput.bind(this)}*/}
                                    {/*    />*/}
                                    {/*</Grid>*/}
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
                                            {this.props.entities.roles && this.props.entities.roles.map((role, index) => {
                                                return <MenuItem key={index} value={role.key}>{role.title ? role.title : role.key}</MenuItem>
                                            })}
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
                                    itemsCountPerPage={this.props.entities.users.per_page}
                                    totalItemsCount={this.props.entities.users.total}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange.bind(this)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <div style={{ display: 'flex', direction: 'row', justifyContent: 'flex-end'}}>
                            <Tooltip title="سینک">
                                <IconButton onClick={() => this.props.fetchUsers()} >
                                    <SyncIcon />
                                </IconButton>
                            </Tooltip>
                            <UserCreate roles={this.props.entities.roles} />
                        </div>
                        <div style={{ overflowX: 'auto'}}>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th onClick={() => this.handleChangeSort('id')}>#&nbsp;{ this.state.sort_field === 'id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('name')}>نام &nbsp;{this.state.sort_field === 'name' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('role_key')}>نقش&nbsp;{this.state.sort_field === 'role_key' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('mobile')}>موبایل&nbsp;{this.state.sort_field === 'mobile' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('craeted_at')}>تاریخ ثبت نام&nbsp;{this.state.sort_field === 'created_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th>عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.entities.users.data.map((user, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.role && user.role.title ? user.role.title: user.role.key}</td>
                                            <td>{user.mobile}</td>
                                            <td>{user.created_at}</td>
                                            <td style={{ display:'flex', 'direction': 'row', justifyContent: 'center'}}>
                                                <Tooltip title="ویرایش کاربر">
                                                    <IconButton onClick={() =>this.setState({ editDialog: true, user_id: user.id})}>
                                                        <AccountBoxTwoToneIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="تغییر رمز عبور">
                                                    <IconButton>
                                                        <LockTwoToneIcon />
                                                    </IconButton>
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
                            itemsCountPerPage={this.props.entities.users.per_page}
                            totalItemsCount={this.props.entities.users.total}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </Box>
                </Container>
                <Dialog open={this.state.editDialog}  onClose={() => this.setState({editDialog: false})}>
                    <UserEdit id={this.state.user_id} />
                </Dialog>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        entities: state.userBundleReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: function (request) {
            dispatch(fetchUsers(request));
        },
        fetchRoles: function () {
            dispatch(fetchRoles());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
