import React, {Component} from 'react';
import {Box, CircularProgress} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import moment from 'moment-jalaali'
import {Link} from "react-router-dom";
import Api from "../../../../api";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {toast} from "react-toastify";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Hidden from "@material-ui/core/Hidden";


class OrderEditStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            entity: null,
            loading: true,
            status: [],
            transport: [],
            delivery: [],
            items: [],
            form: {
                order_status: '',
                transport_status: '',
                delivery_status: '',
            }
        }
    }

    componentDidMount() {

        let instance = new Api();

        instance.fetchOrder(this.props.match.params.id).then((response) => {
            if (typeof response != "undefined") {
               this.handleResponse(response);
            }
        });

        instance.fetchOrderStatus().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    status: response.order_status,
                    transport: response.transport_status,
                    delivery: response.delivery_status,
                })
            }
        })
    }

    handleChangeElement(event)
    {
        let form =  this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form
        })
    }

    handleResponse(response)
    {
        let active = 0;
        if (response.items_status.key === 1) {
            active = 3;
        } else if (response.delivery_status.key === 1) {
            active = 2;
        } else if (response.transport_status.key === 1) {
            active = 1
        }

        let form = this.state.form;
        form.order_status = response.order_status.key;
        form.transport_status = response.transport_status.key;
        form.delivery_status = response.delivery_status.key;
        this.setState({
            entity: response,
            active,
            form,
            loading: false
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let instance = new Api();

        instance.updateOrder(this.state.entity.id, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.handleResponse(response.entity);
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            }
        })

    }



    render() {
        if (this.state.loading) {
            return <CircularProgress color={"secondary"} />
        }
        console.log(this.state);
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
                    <Box  style={{ margin: '30px 0'}}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div>
                                    <Typography variant={"button"}><b>قبل از ایجاد تغییرات مطالعه فرمایید.</b></Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid xs={12}>
                                    <ul>
                                        <li>در صورتی که وضعیت مرسوله تایید شده نباشد امکان تغییر سایر وضعیت ها وجود ندارد.</li>
                                        <li>در صورتی که وضعیت حمل و نقل خروج از انبار نباشد امکان تغییر وضعیت مرسوله به تحویل به مشتری امکان پذیر نیست</li>
                                        <li>در صورتی که مرسوله ارسال مجدد شود فاکتور پرداخت هزینه پستی برای کاربر ارسال میشود و امکان تغییر وضعیت حمل و نقل و سایر وضعیت های تحویل وجود نخواهد شد.</li>
                                        <li>در صورت نیاز برای لغو ارسال مجدد تنها راه تغییر وضعیت تحویل به مرجوعی میباشد.</li>
                                        <li>مرسوله در صورتی خروج از انبار میشود که وضعیت تایید شده و یا رایگان داشته همچنین فاکتور پرداخت نشده نداشته باشد.</li>
                                    </ul>
                                </Grid>
                            </ExpansionPanelDetails>
                            <Divider />
                        </ExpansionPanel>
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
                    <Box component='div'>
                        <Paper style={{ padding: '25px', marginTop: '25px'}}>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <Grid container spacing={2}>
                                    <Grid xs={12} alignContent={"center"}>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="وضعیت"
                                                value={this.state.form.order_status}
                                                onChange={this.handleChangeElement.bind(this)}
                                                variant="filled"
                                                margin='dense'
                                                fullWidth
                                                name='order_status'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                                {this.state.status.map((sts, key) => {
                                                    return(
                                                        <MenuItem key={key} value={sts.key}>{sts.value}</MenuItem>
                                                    );
                                                })}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="حمل و نقل"
                                                value={this.state.form.transport_status}
                                                onChange={this.handleChangeElement.bind(this)}
                                                variant="filled"
                                                margin='dense'
                                                fullWidth
                                                name='transport_status'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                                {this.state.transport.map((sts, key) => {
                                                    return(
                                                        <MenuItem key={key} value={sts.key}>{sts.value}</MenuItem>
                                                    );
                                                })}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="تحویل مرسوله"
                                                value={this.state.form.delivery_status}
                                                onChange={this.handleChangeElement.bind(this)}
                                                variant="filled"
                                                margin='dense'
                                                fullWidth
                                                name='delivery_status'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem key={0} value={-1}>انتخاب</MenuItem>
                                                {this.state.delivery.map((sts, key) => {
                                                    return(
                                                        <MenuItem key={key} value={sts.key}>{sts.value}</MenuItem>
                                                    );
                                                })}
                                            </TextField>
                                        </Grid>
                                        <Grid xs={12} item style={{ display: 'flex', alignContent: 'flex-end', justifyContent:'flex-end', marginTop:"20px"}}>
                                            <Button color={"primary"} variant={"contained"} type='submit'>ارسال درخواست</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default OrderEditStatus;
