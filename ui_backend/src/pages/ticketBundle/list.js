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
import FaceIcon from '@material-ui/icons/Face';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AttachmentIcon from '@material-ui/icons/Attachment';
import PersonIcon from '@material-ui/icons/Person';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import moment from 'moment-jalaali'
import DatePicker from "react-datepicker2";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            entities: [],
            filter: {
                status: -1,
                created_by: -1,
                from_date: '',
                to_date: '',
                category_id: -1
            },
            page: 1,
            limit: 10,
            sort_field: 'id',
            sort_type: 'desc',
            categories: [],
            // For Load Conversation
            cnv_deleteMode: '', // click delete btn to conversation and scroll to msg
            chat: false, // show chat popup
            ticket_id : '', // get ticket id conversation
            ticket: [], // store ticket info
            // form send to server
            content: '', // chat conversation content
            file: '', // upload file

            new_ticket_form: {
                created_by: '',
                category_id: '',
                title: ''
            }
        };

        this.api = new Api();
        this.handleRequest = this.handleRequest.bind(this);
        this.messagesEnd = React.createRef();
    }

    scrollToBottom = () => {
        if (this.state.chat && this.messagesEnd) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    };

    componentDidMount() {

        this.api.getTicketCategories(true).then((res) => {
            if (typeof res != "undefined") {
                this.setState({
                    categories: res
                })
            }
        });

        this.handleRequest();
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
            filter: {
                id: this.state.filter.id,
                status: this.state.filter.status,
                created_by: this.state.filter.created_by,
                from_date : this.state.filter.from_date ? this.state.filter.from_date.locale('es').format('YYYY/M/D HH:mm:ss') : '',
                to_date : this.state.filter.to_date ? this.state.filter.to_date.locale('es').format('YYYY/M/D HH:mm:ss'): '',
                category_id: this.state.filter.category_id
            },
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
            cnv_deleteMode: id
        });

        this.api.deleteTicketConversations(this.state.ticket_id, id).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.handleLoadTicket(this.state.ticket_id);
                } else {
                    toast.error(response.msg);
                }
            }
        }).catch((error) => {
            toast.error(error);
        })
    }

    handleConversationSubmit(event)
    {
        event.preventDefault();

        if(!Boolean(this.props.auth.permissions.ticket.store_conversations.access)) {
            toast.info('به این بخش دسترسی ندارید.');
            return;
        }

        let form = this.state.ticket;
        form['conversations'].push({
            content: this.state.content,
            created_at: moment().format('YYYY/MM/DD HH:mm:ss'),
            is_customer: 0
        });
        this.setState({
            ticket: form,
        });

        this.api.postTicketConversations(this.state.ticket_id, {
            content : this.state.content,
            file: this.state.file,
            directory: this.state.directory
        }).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.setState({
                        cnv_deleteMode: '',
                        file: '',
                        content: ''
                    });
                    this.handleLoadTicket(this.state.ticket_id);
                    this.handleRequest();
                }
            }
        }).catch((error) => {
            toast.error(error);
        })
    }

    autoCompleteHandleSelect = (id) =>
    {
        let filter = this.state.filter;
        filter.created_by = id;
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

    setSelectedDay(value, name) {
        console.log(value);
        let filter = this.state.filter;
        filter[name] = value;
        this.setState({
            filter,
        });
        this.handleRequest();
    };

    handleFileUpload(event) {

        const form_data = new FormData();
        form_data.append('file', event.target.files[0]);

        this.api.attachment(form_data).then((res) => {
            if (typeof res != "undefined") {
                if (res.status) {
                    this.setState({
                        file: res.file
                    })
                } else {
                    toast.error(res.msg);
                }
            }
        }).catch((error) => {
            toast.error(error);
        })
    }

    handleChangeCategory(category_id) {
        this.setState({
            loading: true,
        });

        this.api.putTicket(this.state.current_ticket, {category_id: category_id}).then((res) => {
            if (typeof res != "undefined") {
                if (res.status) {
                    this.setState({
                        open: false,
                        current_ticket: '',
                        loading: false
                    });
                    this.handleRequest();
                } else {
                    toast.error(res.msg);
                }
            }
        })
    }

    // Create New Ticket
    autoCompleteHandleSelectNewTicket = (id) =>
    {
        let new_ticket_form = this.state.new_ticket_form;
        new_ticket_form['created_by'] = id;
        this.setState({
            new_ticket_form
        });

    };

    handleChangeElementNewTicket(event) {
        let new_ticket_form = this.state.new_ticket_form;
        new_ticket_form[event.target.name] = event.target.value;
        this.setState({
            new_ticket_form
        })
    }

    handleCreateNewTicket(event) {
        event.preventDefault();

        if (this.state.new_ticket_form.created_by === "" || this.state.new_ticket_form.category_id === "" || this.state.new_ticket_form.title === "") {
            toast.error('فرم را با دقت پر نکرده اید.');
            return false;
        }

        this.setState({
            loading: true
        });

        this.api.postTicket(this.state.new_ticket_form).then((res) => {
            if (typeof res != "undefined") {
                if (res.status) {
                    toast.success(res.msg);
                    this.handleRequest();
                    let new_ticket_form = {
                        created_by: '',
                        category_id: '',
                        title: ''
                    };
                    this.setState({
                        open: false,
                        loading: false,
                        new_ticket_form
                    })
                } else {
                    toast.error(res.msg);
                }
            }
        }).catch((error) => {
            toast.error(error);
        })

    }



    render() {
        return (
            <div className='content'>
                <CircularProgress size={20} style={{display: (this.state.loading ? 'block' : 'none'), zIndex: '9999'}} color={"secondary"} />
                <Container>
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
                                    <Typography><b>جستجو در لیست</b></Typography>
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
                                            <MenuItem key={1} value={1}>پاسخ داده شده</MenuItem>
                                            <MenuItem key={2} value={0}>در انتظار پاسخ</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            select
                                            label="بخش"
                                            variant="filled"
                                            value={this.state.filter.category_id}
                                            margin='dense'
                                            fullWidth
                                            name='category_id'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeSearchInput.bind(this)}
                                        >
                                            <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                            {this.state.categories.length > 0 && this.state.categories.map((category, index) => {
                                                return(
                                                    <MenuItem key={index + 1} value={category.value}>{category.label}</MenuItem>
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
                            {Boolean(this.props.auth.permissions.ticket.store.access) &&
                            <Tooltip title="افزودن">
                                <IconButton onClick={() => this.setState({ open: true, current_ticket: '' })}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Tooltip>}
                        </div>
                        <div style={{ overflowX: 'auto'}}>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th onClick={() => this.handleChangeSort('id')}>#&nbsp;{ this.state.sort_field === 'id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('created_by')}>کاربر&nbsp;{this.state.sort_field === 'created_by' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('title')}>عنوان&nbsp;{this.state.sort_field === 'title' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('created_at')}>تاریخ ایجاد&nbsp;{this.state.sort_field === 'created_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('created_at')}>به روز رسانی&nbsp;{this.state.sort_field === 'updated_at' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('category_id')}>بخش&nbsp;{this.state.sort_field === 'category_id' ? (this.state.sort_type === 'desc'  ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : <SortIcon />}</th>
                                    <th onClick={() => this.handleChangeSort('status')}>وضعیت&nbsp;{this.state.sort_field === 'status' ? (this.state.sort_type === 'desc' ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>) : <SortIcon/>}</th>
                                    <th>عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.entities.data  && this.state.entities.data.map((entity, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{entity.id}</td>
                                            <td>{entity.created_by.name}</td>
                                            <td>{entity.title.substring(0, 60) + '...'}</td>
                                            <td style={{ direction: 'ltr'}}>{moment(entity.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                                            <td style={{ direction: 'ltr'}}>{moment(entity.updated_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                                            <td>
                                                <Tooltip title='برای تغییر کلیک کنید.'>
                                                    <Chip clickable={true} onClick={() => Boolean(this.props.auth.permissions.ticket.update.access) ? this.setState({ open: true, current_ticket: entity.id }) : toast.info('به این بخش دسترسی ندارید.') } label={entity.category.label} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="وضعیت">
                                                    <Chip size={"small"} variant={"outlined"} color={entity.status ? "primary": "secondary"}  label={entity.status ? 'پاسخ داده شده' : 'در انتظار پاسخ'} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="مشاهده">
                                                    <IconButton  onClick={() => Boolean(this.props.auth.permissions.ticket.conversations.access) ? this.handleLoadTicket(entity.id) : toast.info('به این بخش دسترسی ندارید.')}>
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
                    {/* Chat Component Box  */}
                    {this.state.chat && <Box className={ 'chat-box animated bounceInUp' }>
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
                                        {Boolean(conversation.is_customer) === false && Boolean(this.props.auth.permissions.ticket.delete_conversation.access) &&
                                        <IconButton onClick={() => this.handleDeleteConversation(conversation.id)} color={"secondary"} ref={(el) => {
                                            if (this.state.cnv_deleteMode === conversation.id) {
                                                this.messagesEnd = el
                                            }
                                        }}>
                                            <HighlightOffIcon />
                                        </IconButton>}
                                        {conversation.files && conversation.files.length > 0 && conversation.files.map((file, index) => {
                                            return(
                                                <a href={file} target='_blank'>
                                                    <AttachFileIcon />
                                                </a>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                            {this.state.cnv_deleteMode === '' && <div  ref={(el) => { this.messagesEnd = el }} />}
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
                            {Boolean(this.props.auth.permissions.ticket.store_conversations.access) &&
                            <div>
                                <AttachFileIcon color={this.state.file != '' ? 'primary' : ''} style={{ position: "absolute", bottom: '10px', left: '10px', zIndex: 0}}/>
                                <label htmlFor="attach" style={{width:50,height:50, zIndex: 1}}/>
                                <input accept=".zip,.rar,.7zip,image/x-png,image/gif,image/jpeg, video/mp4" onChange={(event) => this.handleFileUpload(event)} style={{position:'absolute', right:100, zIndex:-100000, display:'none'}} id='attach' type='file'/>
                            </div>}
                        </Paper>
                    </Box>}
                </Container>
                <Dialog onClose={() => this.setState({ open: false })} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    {this.state.current_ticket ? <List>
                        {this.state.categories.length > 0 && this.state.categories.map(category => (
                            <ListItem button onClick={() => this.handleChangeCategory(category.value)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountTreeIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={category.label} />
                            </ListItem>
                        ))}
                    </List> : <form onSubmit={this.handleCreateNewTicket.bind(this)}>
                        <DialogTitle id="alert-dialog-title">ایجاد تیکت جدید</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        onChange={((event, value) => this.autoCompleteHandleSelectNewTicket(value ? value.id : ''))}
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
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="بخش"
                                        variant="filled"
                                        value={this.state.new_ticket_form.category_id}
                                        margin='dense'
                                        fullWidth
                                        name='category_id'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeElementNewTicket.bind(this)}
                                    >
                                        <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                        {this.state.categories.length > 0 && this.state.categories.map((category, index) => {
                                            return(
                                                <MenuItem key={index + 1} value={category.value}>{category.label}</MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        label="عنوان"
                                        variant="filled"
                                        margin='dense'
                                        fullWidth
                                        name='title'
                                        onChange={this.handleChangeElementNewTicket.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={() => this.setState({open: false})}>
                                انصراف
                            </Button>
                            <Button disabled={this.state.loading} color="primary" autoFocus type='submit'>
                                ارسال اطلاعات
                            </Button>
                        </DialogActions>
                    </form>}
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
)(Ticket);
