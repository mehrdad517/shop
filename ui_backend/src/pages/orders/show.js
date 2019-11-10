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

                </Container>
            </div>
        );
    }
}

export default OrderView;
