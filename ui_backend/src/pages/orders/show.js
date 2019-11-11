import React, {Component} from 'react';
import {Box, CircularProgress, Tab, Tabs, Tooltip} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import AppBar from '@material-ui/core/AppBar';
import Chip from "@material-ui/core/Chip";
import Api from "../../api";
import moment from 'moment-jalaali'
import {delivery, items, status, transport} from "./helper";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DatePicker from "react-datepicker2";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
class OrderView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            entity: null,
            loading: true,
            transport: transport(),
            delivery: delivery(),
            items: items(),
            status: status(),
        }
    }

    componentDidMount() {
        let instance = new Api();
        instance.fetchOrder(1).then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    entity: response,
                    loading: false
                })
            }
        })
    }

    render() {
        if (this.state.loading) {
            return <CircularProgress color={"secondary"} />
        }
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>سفارش DKC-22745405</h2>
                                <p style={{ color: '#8e8e8e'}}>ثبت شده در تاریخ ۱۸ آذر ۱۳۹۶</p>
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
                    <Box>
                        <Stepper alternativeLabel activeStep={2}>
                            <Step key={0}>
                                <StepLabel>
                                    <span>وضعیت</span><br/>
                                    <b style={{ position: 'relative', 'top': '10px'}}>{this.state.status[this.state.entity.order_status].title}</b>
                                </StepLabel>
                            </Step>
                            <Step key={1}>
                                <StepLabel>
                                    <span>حمل و نقل</span><br/>
                                    <b style={{ position: 'relative', 'top': '10px'}}> {this.state.transport[this.state.entity.transport_status].title}</b>
                                </StepLabel>
                            </Step>
                            <Step key={2}>
                                <StepLabel>
                                    <span>تحویل مرسوله</span><br/>
                                    <b style={{ position: 'relative', 'top': '10px'}}>{this.state.delivery[this.state.entity.delivery_status].title}</b>
                                </StepLabel>
                            </Step>
                            <Step key={3}>
                                <StepLabel>
                                    <span>سلامت کالا</span><br/>
                                    <b style={{ position: 'relative', 'top': '10px'}}>{this.state.items[this.state.entity.items_status].title}</b>
                                </StepLabel>
                            </Step>
                        </Stepper>
                    </Box>
                    <Box style={{ margin: '50px 0'}}>
                        <Grid container>
                            <Grid item md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        مشخصات سفارش دهنده:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.user.name} - {this.state.entity.user.mobile}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        تحویل گیرنده:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.post_info.full_name}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        شماره ملی:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.post_info.national_code}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        اطلاعات تماس:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.post_info.mobile} - {this.state.entity.post_info.phone}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item md={12}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        آدرس:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.post_info.address}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div>
                                    <Typography>رکورد های مالی</Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
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
                        <div style={{ overflowX: 'auto'}}>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th>ردیف</th>
                                    <th>نام محصول</th>
                                    <th>برند</th>
                                    <th>تعداد</th>
                                    <th>قیمت واحد</th>
                                    <th>قیمت کل</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.entity && this.state.entity.product_pins.map(( pins, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{pins.id}</td>
                                            <td>{pins.product.title}</td>
                                            <td>{pins.product.brand.title}</td>
                                            <td>{pins.pivot.count}</td>
                                            <td>{pins.pivot.price}</td>
                                            <td>{pins.pivot.price * pins.pivot.count}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                    <Box style={{ margin: '5px 0'}}>
                        <Grid container>
                            <Grid item md={6}>
                                <Paper style={{ padding: '10px 25px'}}>
                                    <Typography variant="button">
                                        قیمت خالص:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.pure_price}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper style={{ padding: '10px 25px'}}>
                                    <Typography variant="button">
                                        هزینه پستی:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.post_cost}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper style={{ padding: '10px 25px'}}>
                                    <Typography variant="button">
                                        مالیات بر ارزش افزوده:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.tax}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper style={{ padding: '10px 25px'}}>
                                    <Typography variant="button">
                                        تخفیف:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.discount}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item md={12}>
                                <Paper style={{ padding: '25px', textAlign: 'center'}}>
                                    <Typography variant="button">
                                        قیمت کل:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.total_price}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default OrderView;
