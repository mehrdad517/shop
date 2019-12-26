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
import Api from "../../api";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from "@material-ui/core/Toolbar";
import './chat.css'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import {toast} from "react-toastify";
import moment from 'moment-jalaali'
import FaceIcon from '@material-ui/icons/Face';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import PersonIcon from '@material-ui/icons/Person';
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
            // For Load Conversation
            deleteMode: false,
            chat: false,
            ticket_id : '',
            content: '', // chat conversation
            ticket: [],
        };

        this.api = new Api();
        this.handleRequest = this.handleRequest.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    componentDidMount() {

        this.handleRequest()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom();
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


    // Handle Load Ticket And Show Conversation
    handleLoadTicket(id) {
        // Show Loading
        this.setState({
            loading: true,
            ticket_id: id
        });
        // Send Request To Server And Fetch Ticket And Conversation
        this.api.getTicketConversations(id).then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    loading: false,
                    chat: true,
                    ticket: response
                })
            }
        }).catch((error) => {
            toast.error(error);
        })
    }

    handleDeleteConversation(id)
    {
        this.setState({
            deleteMode: true
        });
        this.api.deleteTicketConversations(this.state.ticket_id, id).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.handleLoadTicket(this.state.ticket_id)
                }
            }
        }).catch((error) => {
            toast.error(error);
        })
    }

    handleConversationSubmit(event)
    {
        event.preventDefault();
        let form = this.state.ticket;
        form['conversations'].push({
            content: this.state.content,
            created_at: moment().format('YYYY/MM/DD HH:mm:ss'),
            is_customer: 0
        });
        this.setState({
            ticket: form,
            content: ''
        });

        this.api.postTicketConversations(this.state.ticket_id, {'content' : this.state.content }).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.handleLoadTicket(this.state.ticket_id)
                }
            }
        }).catch((error) => {
            toast.error(error);
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className='content'>
                <CircularProgress style={{display: (this.state.loading ? 'block' : 'none'), zIndex: '9999'}} color={"secondary"} />
                <Container>
                    <div className={ 'container-inner ' + (this.state.chat ? 'animated fadeIn' : '') } style={{ paddingLeft: this.state.chat ? '300px' : 0 }}>
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
                                                        <IconButton onClick={() => this.handleLoadTicket(entity.id)}>
                                                            <QuestionAnswerIcon />
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
                                itemsCountPerPage={this.state.entities && this.state.entities.per_page}
                                totalItemsCount={this.state.entities && this.state.entities.total}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </Box>
                    </div>
                    {/* Chat Component Box  */}
                    <Box style={{ display: (this.state.chat ? 'block' : 'none')}} className={ 'chat-box ' + (this.state.chat ? 'animated slideInDown' : 'animated fadeOut') }>
                        {/* APP Bar Header */}
                        <AppBar position="static" color={"default"}>
                            <Toolbar style={{ display: "flex", justifyContent: 'space-between', padding: "0 10px"}}>
                                <div style={{ display: "flex",flexDirection: 'row', alignItems: 'center'}}>
                                    <Avatar style={{ backgroundColor: '#00a7e2', marginLeft: '10px'}}><FaceIcon /></Avatar>
                                    <h2>{this.state.ticket && this.state.ticket.created_by && this.state.ticket.created_by.name}</h2>
                                </div>
                                <IconButton onClick={() => this.setState({ chat: false })}>
                                    <NavigateBeforeIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        {/* Chat Conversations */}
                        <Paper className='chat-box-inner'>
                            {this.state.ticket && this.state.ticket.conversations && this.state.ticket.conversations.map((conversation, index) => {
                                return(
                                    <div key={index} className={Boolean(conversation.is_customer) === true  ? 'customer' : 'operator'}>
                                        {Boolean(conversation.is_customer) === false && <Avatar style={{ backgroundColor: '#00da85'}}><Tooltip title={conversation.created_by && conversation.created_by.name}><PersonIcon /></Tooltip></Avatar>}
                                        <div className={(Boolean(conversation.is_customer) === true  ? 'customer' : 'operator') + '-reply'}>
                                            <p>{conversation.content}</p>
                                            <small>{moment(conversation.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</small>
                                        </div>
                                        {Boolean(conversation.is_customer) === true && <Avatar style={{ backgroundColor: '#00a7e2'}}><FaceIcon /></Avatar> }
                                        {Boolean(conversation.is_customer) === false &&
                                        <IconButton onClick={() => this.handleDeleteConversation(conversation.id)} color={"secondary"}>
                                            <HighlightOffIcon />
                                        </IconButton>}
                                    </div>
                                );
                            })}
                            <Divider  ref={(el) => { this.messagesEnd = el }} />
                        </Paper>
                        {/* Input for Attach File And Write Text Message */}
                        <Paper className='chat-form' onSubmit={this.handleConversationSubmit.bind(this)} component="form">
                            {/* Send Icon */}
                            <IconButton type="submit" color={ (this.state.content !== '') ? "primary" :  "default" }  aria-label="directions">
                                <SendIcon />
                            </IconButton>
                            {/* Input For Write Text Message */}
                            <InputBase style={{ width: '100%'}} value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} placeholder="تایپ کنید ..."/>
                            {/* Attch File Icon */}
                            <AttachFileIcon style={{ position: "absolute", bottom: '10px', left: '10px', zIndex: 0}}/>
                            <label htmlFor="attach" style={{width:50,height:50, zIndex: 1}}/>
                            <input style={{position:'absolute', right:100, zIndex:-100000, display:'none'}} id='attach' type='file'/>
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
