import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './../../header'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import NavigationIcon from "@material-ui/icons/Navigation";
import {Box} from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import userBundleReducer from "../../../reducers/userBundleReducer";
import {fetchUsers} from "../../../actions/userBundleAction";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SortIcon from '@material-ui/icons/Sort';
import Pagination from "react-js-pagination";


class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {},
            page: 1,
            limit: 10,
            sort_field: 'id',
            sort_type: 'desc',
        };
    }

    componentDidMount() {
        this.props.fetchUsers();
    }


    handleChangeSeachInput(event)
    {
        let filter = this.state.filter;

        filter[event.target.name] = event.target.value;

        this.handleRequest();

    }

    handleChangeSort(parameter) {


        this.setState({
            sort_field : parameter,
            sort_type : (this.state.sort_type === 'desc' ? 'asc' : 'desc')
        });

        this.handleRequest();

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
        return (
            <div className='content'>
                <Header />
                <Container>
                    <Box style={{ margin: '20px 0'}}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item sm={6}>
                                <h2>مدیریت کاربران</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید سطح دسترسی برای هر نقش تعیین کنید.</p>
                            </Grid>
                            <Grid item sm={6} style={{ textAlign:'left'}}>
                                <Button variant="contained" color="default">
                                    بازگشت&nbsp;<NavigationIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box boxShadow={0}>
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
                                <Container>
                                    <Grid container justify={"center"}>
                                        <Grid item xs={12} sm={3}>
                                            <TextField style={{ marginLeft: '10px', marginRight: '10px'}}
                                                       margin="normal"
                                                       id="outlined-name"
                                                       label="نام و نام خانوادگی"
                                                       variant="filled"
                                                       margin='dense'
                                                       name='name'
                                                       onChange={this.handleChangeSeachInput.bind(this)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField style={{ marginLeft: '10px', marginRight: '10px'}}
                                                       margin="normal"
                                                       id="outlined-name"
                                                       label="ایمیل"
                                                       variant="filled"
                                                       margin='dense'
                                                       name='email'
                                                       onChange={this.handleChangeSeachInput.bind(this)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField style={{ marginLeft: '10px', marginRight: '10px'}}
                                                       margin="normal"
                                                       id="outlined-name"
                                                       label="موبایل"
                                                       variant="filled"
                                                       margin='dense'
                                                       name='mobile'
                                                       onChange={this.handleChangeSeachInput.bind(this)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                <Button color="primary">
                                    جستجو
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Box>
                    <Box>
                        <Grid container direction="row" alignItems="center" >
                            <Grid item sm={6}>
                                شسیشسیش
                            </Grid>
                            <Grid item sm={6}>
                                <Pagination
                                    activePage={this.state.page}
                                    itemsCountPerPage={this.props.entities.users.per_page}
                                    totalItemsCount={this.props.entities.users.total}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange.bind(this)}
                                />
                            </Grid>
                        </Grid>

                        <table className='table'>
                            <thead>
                            <tr>
                                <th onClick={() => this.handleChangeSort('id')}>#&nbsp;{ this.state.sort_field === 'id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                <th onClick={() => this.handleChangeSort('name')}>نام &nbsp;{this.state.sort_field === 'name' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                <th onClick={() => this.handleChangeSort('id')}>نقش&nbsp;{this.state.sort_field === 'role' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                <th onClick={() => this.handleChangeSort('email')}>ایمیل&nbsp;{this.state.sort_field === 'email' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                <th onClick={() => this.handleChangeSort('mobile')}>موبایل&nbsp;{this.state.sort_field === 'mobile' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                <th onClick={() => this.handleChangeSort('craeted_at')}>تاریخ ثبت نام&nbsp;{this.state.sort_field === 'created_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                <th>عملیات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.entities.users.data && this.props.entities.users.data.map((user, index) => {
                                return(
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.created_at}</td>
                                        <td>
                                            <IconButton  aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                        <Pagination
                            activePage={this.state.page}
                            itemsCountPerPage={this.props.entities.users.per_page}
                            totalItemsCount={this.props.entities.users.total}
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
        entities: state.userBundleReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: function (request) {
            dispatch(fetchUsers(request));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
