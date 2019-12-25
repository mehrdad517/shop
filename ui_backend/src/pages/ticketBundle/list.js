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
import {Link} from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Chip from "@material-ui/core/Chip";
import CreateIcon from "@material-ui/icons/Create";
import Api from "../../api";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import './chat.css'
import FolderIcon from '@material-ui/icons/Folder';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment'

class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            entities: [],
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

        await this.api.getTickets({
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
                    <div className='container-inner' >
                        <Box style={{ margin: '10px 0 20px 0'}}>
                            <Grid container alignItems="center">
                                <Grid item xs={12} sm={6}>
                                    <h2>مدیریت تیکت ها</h2>
                                    <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید کلیه تیکت ها  را مدیریت کنید.</p>
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
                                                label="شناسه"
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
                                                label="عنوان"
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
                                {this.props.auth.permissions.user && Boolean(this.props.auth.permissions.user.store.access) ?  <Tooltip title="افزودن">
                                    <Link to={'/blog/contents/create'}>
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
                                        <th onClick={() => this.handleChangeSort('status')}>وضعیت&nbsp;{this.state.sort_field === 'status' ? (this.state.sort_type === 'desc' ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>) : <SortIcon/>}</th>
                                        <th onClick={() => this.handleChangeSort('created_at')}>تاریخ ایجاد&nbsp;{this.state.sort_field === 'created_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                        <th onClick={() => this.handleChangeSort('created_at')}>به روز رسانی&nbsp;{this.state.sort_field === 'updated_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.entities.data  && this.state.entities.data.map((entity, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{entity.id}</td>
                                                <td>{entity.title}</td>
                                                <td>
                                                    <Tooltip title="وضعیت">
                                                        <Chip size={"small"} variant={"outlined"} color={entity.status ? "primary": "secondary"}  label={entity.status ? 'فعال' : 'غیرفعال'} />
                                                    </Tooltip>
                                                </td>
                                                <td>{entity.created_at}</td>
                                                <td>{entity.updated_at}</td>
                                                <td>
                                                    <Tooltip title="مشاهده">
                                                        <Link to={`/blog/contents/${entity.id}/edit/`}>
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
                                itemsCountPerPage={this.state.entities && this.state.entities.per_page}
                                totalItemsCount={this.state.entities && this.state.entities.total}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </Box>
                    </div>
                    <Box className='chat-box animated slideInLeft'>
                        <AppBar position="static" color={"default"}>
                            <Toolbar style={{ display: "flex", justifyContent: 'space-between'}}>
                                <div style={{ display: "flex",flexDirection: 'row', alignItems: 'center'}}>
                                    <Avatar style={{ marginLeft: '10px'}}>M</Avatar>
                                    <Typography variant="body1">
                                        مهرداد معصومی
                                    </Typography>
                                </div>
                                <IconButton>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Paper className='chat-box-inner'>
                            <div className="operator">
                                <Avatar>H</Avatar>
                                <div className='operator-reply'>
                                    به گزارش "ورزش سه"، بارسلونا در تابستان تیم خود را با بازیکنانی نظیر آنتوان گریزمان و فرانکی دی یونگ تقویت کرد. با این وجود اما به نظر می رسد که آبی اناری ها در بخش هایی از زمین با مشکل بالا رفتن سن بازیکنان خود مواجه شده اند.
                                    <small>1396/17/12 16:54</small>
                                </div>
                            </div>
                            <div className='customer'>
                                <div className='customer-reply'>
                                    ب این وجود اما به نظر می رسد که آبی اناری ها در بخش هایی از زمین با مشکل بال
                                    <small>1396/17/12 16:54</small>
                                </div>
                                <Avatar>H</Avatar>
                            </div>
                            <div className="operator">
                                <Avatar>H</Avatar>
                                <div className='operator-reply'>
                                    به گزارش "ورزش سه"، بارسلونا در تابستان تیم خود را با بازیکنانی نظیر آنتوان گریزمان و فرانکی دی یونگ تقویت کرد. با این وجود اما به نظر می رسد که آبی اناری ها در بخش هایی از زمین با مشکل بالا رفتن سن بازیکنان خود مواجه شده اند.
                                    <small>1396/17/12 16:54</small>
                                </div>
                            </div>
                            <div className='customer'>
                                <div className='customer-reply'>
                                    ب این وجود اما به نظر می رسد که آبی اناری ها در بخش هایی از زمین با مشکل بال
                                    <small>1396/17/12 16:54</small>
                                </div>
                                <Avatar>H</Avatar>
                            </div>
                        </Paper>
                        <Paper component="form" style={{ display: "flex", flexDirection: 'row', justifyContent:"space-between"}}>
                            <IconButton color="primary"  aria-label="directions">
                                <SendIcon />
                            </IconButton>
                            <Divider orientation="vertical" />
                            <InputBase style={{ width: '100%'}}
                                       placeholder="Search Google Maps"
                                       inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <AttachFileIcon style={{ position: "absolute", bottom: '10px', left: '10px', zIndex: 0}}/>
                            <label for='a' style={{width:50,height:50, zIndex: 1}}/>
                            <input style={{position:'absolute',right:100,zIndex:-100000,display:'none'}} id='a' type='file'/>
                        </Paper>
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
)(Ticket);
