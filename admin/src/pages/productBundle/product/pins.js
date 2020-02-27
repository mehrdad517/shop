import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import Api from "../../../api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Add from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {toast} from "react-toastify";
import MenuItem from "@material-ui/core/MenuItem";
import validator from 'validator';
class ProductPins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            product: null,
            form: {}
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.handleRequest();
    }


    async handleRequest() {

        let form = this.state.form;

        await new Promise(resolve => {
            this.api.getProductAttributesPins(this.props.match.params.id).then((response) => {
                if (typeof response != "undefined") {

                    resolve(this.setState({
                        form: response.list,
                        product: response.product,
                        loading: false
                    }))
                }
            }).catch((error) => {
                toast.error(error);
            });
        });

    }

    handleChangeElement(event)
    {

        if (['price', 'discount', 'weight', 'count'].includes(event.target.name)) {

            if (! validator.isNumeric(event.target.value)) {
                return false;
            }
        }

        let form = this.state.form;
        form[event.target.name] = event.target.value;

        this.setState({
            form
        });


    }

    handleDuplicateRawPriceParameter = (event, i, key, index) => {

        let arr = this.state.form;

        arr['pins'][i][key][index]['selected'] = event.target.value;

        this.setState({
            form : arr
        })
    };

    handleDuplicateRaw = (event, i) => {

        let arr = this.state.form;

        if (['price', 'discount', 'weight', 'count'].includes(event.target.name)) {

            if (! validator.isNumeric(event.target.value)) {
                return false;
            }
        }

        arr['pins'][i][event.target.name] = event.target.value;

        this.setState({
            form : arr
        })
    };

    handleSubmit(event)
    {
        event.preventDefault();

        this.setState({
            loading: true
        });

        this.api.storeProductPins(this.props.match.params.id, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    this.handleRequest();
                } else {
                    this.setState({
                        loading: false
                    })
                    toast.error(response.msg);
                }
            }
        })
    }


    async  duplicateRawAdd(index) {
        let form = this.state.form;
        let price_parameters = [];
        let pusher;

        form.pins[index]['price_parameters'].map((res, i) => {
            price_parameters.push({
                value: res.value,
                label: res.label,
                selected: ''
            });
        });

        pusher = {
            count: form.pins[index].count,
            price: form.pins[index].price,
            discount: form.pins[index].discount,
            weight: form.pins[index].weight,
            status: 1,
            id: '',
            price_parameters
        };

        form.pins.push(pusher);
        this.setState({
            form
        })
    }

    async  duplicateRawDelete(index) {
        let form = this.state.form;
        form.pins.pop(form.pins[index]);
        this.setState({
            form
        })
    }


    autoCompleteHandleSelect = (selected, i, key, index) =>
    {
        let form = this.state.form;

        if (selected) {
            form['pins'][i][key][index]['selected'] = selected;

            this.setState({
                form,
                options: []
            });

        }

    };


    async autoCompleteHandleChange(event, parent)
    {
        this.setState({
            options: []
        });
        let instance = new Api();
        let term = event.target.value;
        instance.autoComplete('price-parameter', {'term': event.target.value, parent: parent}).then((response) => {
            if (typeof response != "undefined") {
                if (response.length > 0 ) {
                    this.setState({
                        options: response
                    })
                }
            }
        });

    }


    render() {
        console.log(this.state);
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>{this.state.product && '#' + this.state.product.code + ' ' + this.state.product.title}</h2>
                                <p style={{ color: '#8e8e8e'}}>{this.state.product && this.state.product.package_type && 'واحد محصول: ' + this.state.product.package_type.title + ' - '  + (Boolean(this.state.product.package_type.type) === true ? 'تعدادی' : 'فله ای')}</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/products'>
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
                                <ul>
                                    <li>قیمت,تخفیف,وزن و موجودی پیش فرض را به صورت پایه وارد کنید.</li>
                                    <li>در صورت وارد نکردن اتریبیوت ها حالات پیش فرض که در ابتدای فرم تکمیل شده است تعیین میگردد.</li>
                                    <li>در صورتی که واحد محصول به صورت تعدادی باشد جمع موجودی محصول برابر با جمع موجودی اتریبیتوت های مختلف که در زیر تعیین میکنید میباشد.</li>
                                    <li>در صورتی که واحد محصول به صورت فله ای تعیین شده باشد موجودی کل در نظر گرفته میشود  و میتوانید نوع بسته بندی های مختلف محصول را با موجودی کل در نظر بگیرید.</li>
                                    <li>واحد بسته بندی محصول باید با واحد موجودی یکسان باشد.</li>
                                </ul>
                            </ExpansionPanelDetails>
                            <Divider />
                        </ExpansionPanel>
                    </Box>
                </Container>
                <Box className={ !this.state.loading ? 'animated fadeIn' : ''} boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', display: (this.state.loading ? 'none' : 'block')}}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <Container>
                        <Grid style={{ display: 'flex', justifyContent: 'center'}} container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={this.handleChangeElement.bind(this)}
                                    label="قیمت پایه (تومان)"
                                    variant="filled"
                                    margin='dense'
                                    fullWidth
                                    value={this.state.form.price}
                                    name='price'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={this.handleChangeElement.bind(this)}
                                    label="تخفیف کلی (درصد)"
                                    variant="filled"
                                    margin='dense'
                                    fullWidth
                                    name='discount'
                                    value={this.state.form.discount}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            {this.state.product
                            && this.state.product.package_type
                            && Boolean(this.state.product.package_type.type) === true
                            &&
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={this.handleChangeElement.bind(this)}
                                    label="وزن پستی پیش فرض (گرم)"
                                    variant="filled"
                                    margin='dense'
                                    fullWidth
                                    name='weight'
                                    value={this.state.form.weight}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>}
                            {this.state.product
                            && this.state.product.package_type
                            && Boolean(this.state.product.package_type.type) === false
                            &&
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={this.handleChangeElement.bind(this)}
                                    label={ 'موجودی فله ای' + ' (' + this.state.product.package_type.title + ')'}
                                    variant="filled"
                                    margin='dense'
                                    fullWidth
                                    name='count'
                                    value={this.state.form.count}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            }

                        </Grid>
                        </Container>
                        <div style={{ overflowX: 'auto'}}>
                            <table className='table-duplicate-row'>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    {this.state.form && this.state.form.pins && this.state.form.pins[0].price_parameters && this.state.form.pins[0].price_parameters.map((parameter, index) => {
                                        return(
                                            <th style={{ color: '#ec2d6e' }} key={index}>{parameter.label}</th>
                                        );
                                    })}
                                    <th>قیمت (تومان)</th>
                                    <th>تخفیف (درصد)</th>
                                    <th>وزن پستی (گرم)</th>
                                    {this.state.product
                                    && this.state.product.package_type
                                    && Boolean(this.state.product.package_type.type) === true
                                    &&
                                    <th>موجودی</th>
                                    }
                                    <th>وضعیت</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.form.pins && this.state.form.pins.length > 0 && this.state.form.pins.map((pin, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {pin.price_parameters && pin.price_parameters.map((parameter, i) => {
                                                return(
                                                    <td key={i}>
                                                        <Autocomplete
                                                            size={"small"}
                                                            onChange={((event, value) => this.autoCompleteHandleSelect(value, index, 'price_parameters', i))}
                                                            options={this.state.options}
                                                            getOptionLabel={option => option.label}
                                                            defaultValue={parameter.selected}
                                                            renderInput={params => (
                                                                <TextField
                                                                    {...params}
                                                                    fullWidth
                                                                    margin={"dense"}
                                                                    onChange={(event) => this.autoCompleteHandleChange(event, parameter.value)}
                                                                />
                                                            )}
                                                        />
                                                    </td>
                                                );
                                            })}
                                            <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index)} name='price'  value={pin.price} /></td>
                                            <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index)} name='discount'  value={pin.discount} /></td>
                                            <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index)} name='weight'  value={pin.weight} /></td>
                                            {this.state.product
                                            && this.state.product.package_type
                                            && Boolean(this.state.product.package_type.type) === true
                                            &&
                                            <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index)} name='count' value={pin.count} /></td>
                                            }
                                            <td>
                                                <TextField
                                                    select
                                                    value={pin.status}
                                                    name='status'
                                                    onChange={(event) => this.handleDuplicateRaw(event, index)}
                                                >
                                                    <MenuItem value={1}>فعال</MenuItem>
                                                    <MenuItem value={0}>غیرفعال</MenuItem>
                                                </TextField>
                                            </td>
                                            <td style={{ display: "flex", flexDirection: "row"}}>
                                                <Tooltip title={'ایجاد'}>
                                                    <IconButton color='primary' onClick={() => this.duplicateRawAdd(index)}>
                                                        <Add />
                                                    </IconButton>
                                                </Tooltip>
                                                {pin.id === "" && <Tooltip title={'ایجاد'}>
                                                    <IconButton color='secondary' onClick={() => this.duplicateRawDelete(index)}>
                                                        <RemoveCircleIcon />
                                                    </IconButton>
                                                </Tooltip>}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <Button  disabled={this.state.disabled} type='submit' color={"primary"} variant={"contained"}>ثبت تغییرات</Button>
                    </form>
                </Box>
                {this.state.loading && <CircularProgress color={"secondary"} />}
            </div>
        );
    }
}

export default ProductPins;
