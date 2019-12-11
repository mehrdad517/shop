import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../api";
import Header from "./header";
import {CircularProgress} from "@material-ui/core";
import FusionCharts from "fusioncharts";
import ReactFC from "react-fusioncharts";
// Step 4 - Include the chart type
import mscombi2d  from 'fusioncharts/fusioncharts.charts';

// Step 5 - Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ClipLoader from 'react-spinners/SyncLoader';

ReactFC.fcRoot(FusionCharts, mscombi2d , FusionTheme);

class Index extends Component {


    constructor(props) {

        super(props);

        this.state = {
            loading: true,
            data: []
        };


        this.api = new Api();
    }


    componentDidMount() {

        this.api.reports().then((response) => {
           if (typeof response != "undefined") {

               let chart = {
                   label: [],
                   price: [],
                   count: []
               };

               response.map((r, key) => {
                   chart.label.push({'label' : r.label});
                   chart.price.push({'value' : r.total_price});
                   chart.count.push({'value' : r.total_count});
               });

               this.setState({
                   data: chart,
                   loading: false
               })
           }
        });


    }


    render() {

        console.log(this.state.data);

        const chartConfigs = {
            type: 'mscombi2d',// The chart type
            width: '100%', // Width of the chart
            height: '400', // Height of the chart
            dataFormat: 'json', // Data type
            dataSource: {
                "chart": {
                    "caption": "گزارش میزان فروش",
                    "subCaption": "گزارش 30 روز گذشته",
                    "yAxisName": "مبلغ به تومان",
                    "theme": "fusion",
                    "formatNumberScale" : '0',
                    "decimalSeparator": ".",
                    "thousandSeparator": ",",
                },
                "categories": [
                    {
                        "category": this.state.data.label
                    }
                ],
                "dataset": [
                    {
                        "seriesName": "تعداد فاکتور",
                        "renderAs": "line",
                        "data": this.state.data.count
                    },
                    {
                        "seriesName": "مبلغ فروش",
                        "renderAs": "line",
                        "data": this.state.data.price
                    }
                ]
            }
        };

        const override = `
            transform: translate(-50%, -50%);
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 9999999999;
        `;

        return (
            <div>
                <div className="content">
                    <Container>
                        <Box style={{ margin: '30px 0', minHeight: '400px', position: 'relative'}}>
                            {this.state.loading ? <ClipLoader
                                css={override}
                                loading={true}
                                size={12}
                                 /> : <ReactFC {...chartConfigs}/>}


                        </Box>
                        <Box>
                            <Grid spacing={2} container={true}>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '20px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            تعداد کل کاربران
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            503
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '20px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            کاربران غیرفعال
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            10
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '20px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            کابران مهمان
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            480
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '20px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            کاربران سیستمی
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            480
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '5px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            تعداد کل محصولات
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            503
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '5px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            محصولات غیرفعال
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            503
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '5px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            محصولات ناموجود
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            503
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '5px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            برندها
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            503
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '5px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            تعداد کل سفارشات
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            503
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '5px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            سفارشات مرجوعی
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            503
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '5px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            سفارشات تعدیلی
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            503
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Paper style={{ padding: '10px 0px', textAlign: "center", margin: '5px 0 0 0'}} boxShadow={3}>
                                        <Typography variant={"subtitle1"}>
                                            سفارشات دارای کسری و معیوبی
                                        </Typography>
                                        <Typography component="h4" variant={"h4"}  style={{ marginTop: '10px'}}>
                                            503
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </div>
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
    return{}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Index);
