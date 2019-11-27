import React, {Component} from 'react';
import {Box, CircularProgress} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import moment from 'moment-jalaali'
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {toast} from "react-toastify";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import Api from "../../../api";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Hidden from "@material-ui/core/Hidden";
import Checkbox from "@material-ui/core/Checkbox";


class OrderFractiveRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            entity: null,
            loading: true,
            form: {
                product_pins: [],
                type: '',
                status: ''
            }
        }
    }

    componentDidMount() {
        this.handleRequest();
    }

    handleRequest()
    {
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
                    form: {
                        product_pins: response.fractiveRequest ? response.fractiveRequest.product_pins : response.product_pins,
                        type:  response.fractiveRequest ?  response.fractiveRequest.type : 0,
                        status : response.fractiveRequest ?  parseInt(response.fractiveRequest.status) : 0,
                    },
                    active,
                    loading: false
                });
            }
        });
    }

    handleDuplicateRaw = (event, i) => {
        let form = this.state.form;
        form.product_pins[i][event.target.name] = parseInt(event.target.value);
        this.setState({
            form
        })
    };

    handleChangeElement(event)
    {
        let form =  this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        let instance = new Api();
        instance.orderFractiveRequest(this.state.entity.id, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    this.handleRequest();
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
                                <h2>ثبت درخواست کسری و یا معیوبی برای سفارش با شناسه <span>#{this.state.entity.id}</span></h2>
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
                    <Box component='div' style={{ margin : '10px 0'}}>
                        <Paper style={{ padding: '25px'}}>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div style={{ overflowX: 'auto'}}>
                                    <table className='table-duplicate-row animated fadeIn' style={{ margin : 0}}>
                                        <thead>
                                        <tr>
                                            <th>ردیف</th>
                                            <th>نام محصول</th>
                                            <th>اتریبیوت</th>
                                            <th>برند</th>
                                            <th>تعداد کل</th>
                                            <th>تعداد کسری</th>
                                            <th>تعداد معیوبی</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.entity && this.state.form.product_pins.map(( pins, index) => {
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
                                                    <td>
                                                        <TextField onChange={(event) => this.handleDuplicateRaw(event, index)} name='fractional_count' value={pins.fractional_count} style={{ textAlign: 'center !important'}} />
                                                    </td>
                                                    <td>
                                                        <TextField onChange={(event) => this.handleDuplicateRaw(event, index)} name='defactive_count' value={pins.defactive_count} style={{ textAlign: 'center !important'}} />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                    <Box component='div' style={{ marginTop: '20px'}}>
                                        <Radio onChange={this.handleChangeElement.bind(this)} checked={(parseInt(this.state.form.type) === 0) ? true : false} value={0} name='type' />&nbsp;ارسال کالا در قالب سفارش جدید
                                        <Radio onChange={this.handleChangeElement.bind(this)} checked={(parseInt(this.state.form.type) === 1) ? true : false} value={1} name='type' />&nbsp;بازگشت وجه به حساب کاربر
                                    </Box>
                                </div>
                                {!this.state.entity.fractiveRequest ?
                                    <Box component='div'>
                                        <Button color={"primary"} variant={"contained"} type='submit'>ارسال درخواست</Button>
                                    </Box>
                                    :
                                    <Box  className='animated fadeIn' component='div'>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Checkbox onChange={this.handleChangeElement.bind(this)} checked={(parseInt(this.state.form.status) === 0) ? false : true} value={(parseInt(this.state.form.status) === 0) ? 1 : 0} name='status' />&nbsp;فرم کسری و معیوبی مورد تایید انباردار است.(پس از تایید قابل ویرایش نمی باشد)
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button style={{ marginTop: '10px'}} color={"secondary"} variant={"contained"}  type='submit'>تایید درخواست</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>}
                            </form>
                        </Paper>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default OrderFractiveRequest;
