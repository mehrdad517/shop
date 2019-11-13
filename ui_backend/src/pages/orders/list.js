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
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {toast} from "react-toastify";
import Api from "../../api";
import Chip from "@material-ui/core/Chip";
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';
import {delivery, items, status, transport} from "./helper";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link} from "react-router-dom";
import ExcelDownload from './excel/excel'
import Autocomplete from '@material-ui/lab/Autocomplete'

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

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
            limit: 50,
            sort_field: 'id',
            sort_type: 'desc',

            status: status(),
            transport: transport(),
            delivery: delivery(),
            items: items(),
            options: [],
        }
    }

    componentDidMount() {
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

    }

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
                page:  1
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
                                    <Grid item xs={12} sm={4} md={3}>
                                        <Autocomplete
                                            onChange={((event, value) => this.autoCompleteHandleSelect(value ? value.id : ''))}
                                            options={this.state.options}
                                            getOptionLabel={option => option.name + ' ' + option.mobile}
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
                                                    <MenuItem key={key} value={key}>{sts.title}</MenuItem>
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
                                                    <MenuItem key={key} value={key}>{sts.title}</MenuItem>
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
                                                    <MenuItem key={key} value={key}>{sts.title}</MenuItem>
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
                                                    <MenuItem key={key} value={key}>{sts.title}</MenuItem>
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
                                        <tr key={index}>
                                            <td>{entity.id}</td>
                                            <td>{entity.user ? entity.user.name : '-'}</td>
                                            <td>{entity.total_price}</td>
                                            <td>
                                                <Tooltip title="وضعیت">
                                                    <Chip size={"small"} variant={"outlined"} color={this.state.status[entity.order_status.key].color}  label={entity.order_status.value} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="حمل و نقل">
                                                    <Chip size={"small"} variant={"outlined"} color={this.state.transport[entity.transport_status.key].color}  label={entity.transport_status.value} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="تحویل">
                                                    <Chip size={"small"} variant={"outlined"} color={this.state.delivery[entity.delivery_status.key].color}  label={entity.delivery_status.value} />
                                                </Tooltip>
                                            </td>
                                            <td>
                                                <Tooltip title="سلامت کالا">
                                                    <Chip size={"small"} variant={"outlined"} color={this.state.items[entity.items_status.key].color}  label={entity.items_status.value} />
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
