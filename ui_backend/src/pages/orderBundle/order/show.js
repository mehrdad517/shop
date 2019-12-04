import React, {Component} from 'react';
import {Box, CircularProgress} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import Chip from "@material-ui/core/Chip";
import Api from "../../../api";
import moment from 'moment-jalaali'
import {delivery, items, status, transport} from "../helper";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Link} from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";


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
        instance.fetchOrder(this.props.match.params.id).then((response) => {
            if (typeof response != "undefined") {

                let active = 0;
                if (response.items_status.key === 1) {
                    active = 3;
                } else if (response.delivery_status.key === 1) {
                    active = 2;
                } else if (response.transport_status.key === 1) {
                    active = 1
                }

                this.setState({
                    entity: response,
                    loading: false,
                    active
                })
            }
        });
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
                                <h2>شناسه سفارش <span>#{this.state.entity.id}</span></h2>
                                <p style={{ color: '#8e8e8e'}}>ثبت شده در تاریخ <span>{moment(this.state.entity.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</span></p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/orders'>
                                    <Button variant="contained" color="default" >
                                        <NavigationIcon />
                                    </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Stepper alternativeLabel activeStep={this.state.active}>
                            <Step key={0}>
                                <StepLabel>
                                    <span>وضعیت</span><br/>
                                    <Hidden only={"xs"}><b style={{ position: 'relative', 'top': '10px'}}>{this.state.entity.order_status.value}</b></Hidden>
                                </StepLabel>
                            </Step>
                            <Step key={1}>
                                <StepLabel>
                                    <span>حمل و نقل</span><br/>
                                    <Hidden only={"xs"}><b style={{ position: 'relative', 'top': '10px'}}> {this.state.entity.transport_status.value}</b></Hidden>
                                </StepLabel>
                            </Step>
                            <Step key={2}>
                                <StepLabel>
                                    <span>تحویل مرسوله</span><br/>
                                    <Hidden only={"xs"}><b style={{ position: 'relative', 'top': '10px'}}>{this.state.entity.delivery_status.value}</b></Hidden>
                                </StepLabel>
                            </Step>
                            <Step key={3}>
                                <StepLabel>
                                    <span>سلامت کالا</span><br/>
                                    <Hidden only={"xs"}><b style={{ position: 'relative', 'top': '10px'}}>{this.state.entity.items_status.value}</b></Hidden>
                                </StepLabel>
                            </Step>
                        </Stepper>
                    </Box>
                    <Box style={{ marginTop: '30px'}}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
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
                            <Grid item xs={12} md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        تحویل گیرنده:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.post_info && this.state.entity.post_info.full_name}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        شماره ملی:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.post_info && this.state.entity.post_info.national_code}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        اطلاعات تماس:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>
                                        {this.state.entity.post_info && this.state.entity.post_info.mobile} - {this.state.entity.post_info && this.state.entity.post_info.phone}
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
                                            {this.state.entity.post_info.region && this.state.entity.post_info.region.title} - {this.state.entity.post_info && this.state.entity.post_info.address} - { 'کد پستی ' + this.state.entity.post_info && this.state.entity.post_info.postal_code}
                                        </b>
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{ margin: '30px 0'}}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div>
                                    <Typography variant={"button"}><b>بخش مالی</b></Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid xs={12}>
                                <div style={{ overflowX: 'auto'}}>
                                    <table className='table'>
                                        <thead>
                                        <tr>
                                            <th>ردیف</th>
                                            <th>شماره پیگیری</th>
                                            <th>نوع پرداخت</th>
                                            <th>تاریخ (تومان)</th>
                                            <th>به روز رسانی</th>
                                            <th>وضعیت</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.entity.payments && this.state.entity.payments.map((payment, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{payment.id}</td>
                                                    <td>{payment.ref_id}</td>
                                                    <td>{payment.type.value}</td>
                                                    <td>{payment.amount}</td>
                                                    <td style={{ direction:'rtl'}}>{moment(payment.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                                                    <td style={{ direction:'rtl'}}>{moment(payment.updated_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')}</td>
                                                    <td><Chip size={"small"} variant={"outlined"} color={this.state.status[payment.status.key].color}  label={payment.status.value} /></td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td colSpan={3}>جمع کل:</td>
                                            <td><b>{this.state.entity.sum_payments}</b></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </Grid>
                            </ExpansionPanelDetails>
                            <Divider />
                        </ExpansionPanel>
                    </Box>
                    <Box  style={{ margin: '30px 0'}}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div>
                                    <Typography variant={"button"}><b>سبد خرید</b></Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid xs={12}>
                                    <div style={{ overflowX: 'auto'}}>
                                        <table className='table'>
                                            <thead>
                                            <tr>
                                                <th>ردیف</th>
                                                <th>نام محصول</th>
                                                <th>اتریبیوت</th>
                                                <th>برند</th>
                                                <th>تعداد</th>
                                                <th>قیمت واحد</th>
                                                <th>تخفیف</th>
                                                <th>تعداد کسری</th>
                                                <th>تعداد معیوبی</th>
                                                <th>قیمت کل</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.entity && this.state.entity.product_pins.map(( pins, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td><b>{pins.product.title}</b></td>
                                                        <td>
                                                            {pins.attributes.length > 0 ? pins.attributes.map((attr) => {
                                                                return(
                                                                    <p>{attr.title + ' : ' + attr.value}</p>
                                                                );
                                                            }) : 'ندارد'}
                                                        </td>
                                                        <td>{pins.brand.title}</td>
                                                        <td>{pins.count}</td>
                                                        <td>{pins.price}</td>
                                                        <td>{pins.discount}</td>
                                                        <td>{pins.fractional_count}</td>
                                                        <td>{pins.defactive_count}</td>
                                                        <td>{pins.total}</td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <td colSpan={4}>جمع کل:</td>
                                                <td><b>{this.state.entity.sum_count}</b></td>
                                                <td><b>{this.state.entity.sum_price}</b></td>
                                                <td><b>{this.state.entity.sum_discount}</b></td>
                                                <td></td>
                                                <td></td>
                                                <td><b>{this.state.entity.sum_total}</b></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Grid>
                            </ExpansionPanelDetails>
                            <Divider />
                        </ExpansionPanel>
                    </Box>
                    <Box style={{ margin: '5px 0'}}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        قیمت خالص:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>{this.state.entity.pure_price}&nbsp;<span>تومان</span></b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        هزینه پستی:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>{this.state.entity.post_cost}&nbsp;<span>تومان</span></b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        مالیات بر ارزش افزوده:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>{this.state.entity.tax}&nbsp;<span>تومان</span></b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper style={{ padding: '25px'}}>
                                    <Typography variant="button">
                                        تخفیف:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>{this.state.entity.discount}&nbsp;<span>تومان</span></b>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper style={{ padding: '25px', textAlign: 'center'}}>
                                    <Typography variant="button">
                                        قیمت کل:
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <b>{this.state.entity.total_price}&nbsp;<span>تومان</span></b>
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
