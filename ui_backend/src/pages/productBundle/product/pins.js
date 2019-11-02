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
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Add from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {toast} from "react-toastify";

class ProductPins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            product: null,
            loading: false,
            form: []
        };

        this.api = new Api();
        this.handleDuplicateRaw = this.handleDuplicateRaw.bind(this)
    }

    componentDidMount() {
        this.handleRequest();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let flag = true;


        return flag;
    }

    async handleRequest() {
        new Promise((resolve => {
            this.api.fetchProduct(this.props.match.params.id).then((resoponse) => {
                if (typeof resoponse != "undefined") {
                    resolve(this.setState({
                        product: resoponse
                    }));
                }
            });
        }));
        new Promise(resolve => {
            this.api.getProductAttributesPins(this.props.match.params.id).then((response) => {
                let form = this.state.form;
                response.map((r, index) => {
                    form[index] = r;
                });
                resolve(this.setState({
                    form,
                    loading: true,
                }));

            }).catch((error) => {
                console.log(error);
            });
        });

    }

    handleDuplicateRaw = (event, i, pins_key) => {
        let arr = this.state.form;
        if (event.target.name === 'pins') {
            arr[i][event.target.name][pins_key].selected = event.target.value;
        } else {
            arr[i][event.target.name] = event.target.value;
        }

        this.setState({
            form : arr
        })
    };

    async  duplicateRaw(index) {
        if (this.state.form[0].pins) {
            let arr = [];
            arr = this.state.form;
            let p = [];
            arr[index].pins.map((pin, i) => {
                p[i] = {
                    'id': pin.id,
                    'title': pin.title,
                    'selected' : pin.selected,
                    'children' : pin.children
                }
            });

            let duplicate = {
                'count' : arr[index].count,
                'price' : arr[index].price,
                'discount' : arr[index].discount,
                'pins' : p,
            };

            arr.push(duplicate);


            await new Promise(resolve => {
                resolve(this.setState({
                    form :arr
                }));
            });
        } else {
            toast('برای تک محصولی ها این قابلیت وجود ندارد.');
        }
    }


    async deleteRaw(i) {
        if (this.state.form[0].pins) {
            let arr = [];
            arr = this.state.form;
            await new Promise(resolve => {
                resolve(arr.splice(i, 1));
            });
            await new Promise(resolve => {
                resolve(this.setState({
                    form : arr
                }));
            });
        } else {
            toast('برای تک محصولی ها این قابلیت وجود ندارد.');
        }
    }

    handleSubmit(event) {
        this.setState({
            disabled: true
        });
        event.preventDefault();
        this.api.storeProductPins(this.props.match.params.id, {
            form: this.state.form
        }).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                } else {
                    toast.error(response.msg);
                }
            }
            this.setState({
                disabled: false
            });
        }).catch((error) => {
            console.log(error);
        });
    }



    render() {
        console.log(this.state.form);
        if (!this.state.loading) {
            return (<CircularProgress color={"secondary"} />);
        }
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>{this.state.product && this.state.product.title}</h2>
                                <p style={{ color: '#8e8e8e'}}>موجودی قیمت تخفیف و ... را مشخص کنید.</p>
                                <p style={{ color: '#ff5b60'}}>در صورت وارد نکردن کلیه حالات قیمت وارد شده در سطر اول به عنوان قیمت پایه در نظر گرفته خواهد شد.</p>
                                <p style={{ color: '#ff5b60'}}>موجودی کلیه سطرها به عنوان موجودی کل در نظر گرفته خواهد شد.</p>
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
                </Container>
                <Box boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px', minHeight: '200px'}} boxShadow={0}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        {this.state.form.length > 0 ? <table className='table-duplicate-row fadeIn'>
                            <thead>
                            <tr>
                                <th>ردیف</th>
                                {this.state.form[0].pins && this.state.form[0].pins.map((pin, key) => {
                                    return(
                                        <th width='15%' key={key}>{pin.title}</th>
                                    );
                                })}
                                <th>قیمت</th>
                                <th>موجودی</th>
                                <th>تخفیف</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.form.map((entity, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {entity.pins && entity.pins.map((pin, key) => {
                                            return(
                                                <td key={key}>
                                                    <TextField onChange={(event) => this.handleDuplicateRaw(event, index, key)} name='pins' value={pin.selected} select fullWidth={true}>
                                                        {pin.children.map((child, k) => {
                                                            return(
                                                                <MenuItem key={k} value={child.id}>{child.value}</MenuItem>
                                                            );
                                                        })}
                                                    </TextField>
                                                </td>
                                            );
                                        })}
                                        <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index, 5)} name='price' value={entity.price} /></td>
                                        <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index, 6)} name='count' value={entity.count} /></td>
                                        <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index, 7)} name='discount' value={entity.discount} /></td>
                                        <td>
                                            <Tooltip title={'ایجاد'} onClick={() => this.duplicateRaw(index)}>
                                                <IconButton color='primary'>
                                                    <Add />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={'حذف'} onClick={() => this.deleteRaw(index)}>
                                                <IconButton color='secondary'>
                                                    <RemoveCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table> : ''}

                        <Button  disabled={this.state.disabled} type='submit' color={"primary"} variant={"contained"}>ثبت تغییرات</Button>
                    </form>
                </Box>
            </div>
        );
    }
}

export default ProductPins;
