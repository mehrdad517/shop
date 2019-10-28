import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Api from "../../../api";
import {toast} from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckboxTree from "react-checkbox-tree";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import validator from 'validator';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Add from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {Link} from "react-router-dom";
import attribute from "../productCategory/attribute";

class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            brands: [],
            checked: [], // tree checked or edit or  show
            expanded: [], // expanded tree
            categories : [], // categories tree
            form: {
                title: '',
                code: '',
                price: '',
                brand_id: 0,
                status: 1,
                slug: '',
                meta_title: '',
                meta_description: '',
                content: '',
                attributes:[]
            }
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.handleRequest();
    }

    async handleRequest() {
        await new Promise(resolve => {
            resolve(this.api.fetchBrands().then((response) => {
                if (typeof response != "undefined") {
                    this.setState({
                        brands: response.data
                    })
                }
            }).catch((error) => {
                toast(error);
            }));
        });

        await new Promise(resolve => {
            resolve(this.api.fetchProductCategories().then((response) => {
                if (typeof response != "undefined") {
                    this.setState({
                        categories: response
                    })
                }
            }).catch((error) => {
                toast(error);
            }))
        });

        await new Promise(resolve => {
            resolve(this.api.fetchProduct(2).then((response) => {
                let checked = this.state.checked;
                let attributes = this.state.form.attributes;
                response.categories.map((category) => {
                    checked.push(category.value);
                });
                response.attributes.map((attribute) => {
                    attributes.push({
                        'id' : attribute.id,
                        'title' : attribute.title,
                        'value' : attribute.pivot.value,
                        'order' : attribute.pivot.order,
                        'main' : attribute.pivot.main === 1 ? true : false
                    });
                });
                this.setState({
                    form: {
                        categories: response.categories,
                        attributes: attributes,
                        title: response.title,
                        code: response.code,
                        price: response.price,
                        brand_id: response.brand_id,
                        status: response.status,
                        slug: response.slug,
                        meta_title: response.meta_title,
                        meta_description: response.meta_description,
                        content: response.content,
                    },
                    checked,
                })
            }));
        });

        await new Promise(resolve => {
            resolve(this.setState({
                loading: true
            }));
        })
    }

    handleDuplicateRaw = (event, i) => {
        let form = this.state.form;
        if (event.target.name === 'main') {
            form.attributes[i][event.target.name] = event.target.checked;
        } else {
            form.attributes[i][event.target.name] = event.target.value;
        }

        this.setState({
            form
        })
    };


    handleChangeElement = (event) => {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form,
        });
    };

    handleSubmit (event) {
        event.preventDefault();
        if (validator.isEmpty(this.state.form.title)) {
            toast.error('عجله نکن ! عنوان رو وارد کن حالا');
            return;
        }

        if (validator.isEmpty(this.state.form.code)) {
            toast.error('کد پس چی؟');
            return;
        }

        if (!validator.isNumeric(this.state.form.price)) {
            toast.error('قیمت رو چی زدی؟ عدد بزن!');
            return;
        }

        if (this.state.checked.length === 0) {
            toast.error('محصول دسته بندی نداره؟ روی هوا باشه؟');
            return;
        }

        if (this.state.form.brand_id === 0) {
            toast.info('برند نزدی ها ولی گیر نمیدم بهت...');
        }

        if (validator.isEmpty(this.state.form.content)) {
            toast.warn('محتوا به کاربر چی نشون بدیم؟');
        }

        this.state.form['categories'] = this.state.checked;

        this.api.updateProduct(2, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    //this.props.history.push('/products/brands');
                } else {
                    toast.error(response.msg);
                }
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    async handleChangeCategory(checked) {

        let form = this.state.form;
        await new Promise(resolve => {
            resolve(this.setState({
                checked,
                form
            }));
        });

        if (this.state.checked.length > 0) {
            await new Promise(resolve => {
                resolve(this.api.getProductCategoryAttributes(checked).then((response) => {
                    if (typeof response != "undefined") {
                        response.map((r, index) => {
                            form.attributes[form.attributes.length + index] = {
                                'id' : r.id,
                                'title' : r.title,
                                'value' : '',
                                'order' : '',
                                'main' : false,
                            }
                        });
                        resolve(form.attributes.sort(this.compare));

                        this.setState({
                            form
                        })
                    }
                }).catch((error) => {
                    console.log(error);
                }));
            });
        }
    }

    compare( a, b ) {
        if ( a.id < b.id ){
            return -1;
        }
        if ( a.id > b.id ){
            return 1;
        }
        return 0;
    }


    async  duplicateRaw(id) {
        let arr = [];
        arr = this.state.form.attributes;
        for (let i=0; i < arr.length; i++) {
            if (arr[i].id === id) {
                await new Promise(resolve => {
                    let pusher = {
                        'id' : arr[i].id,
                        'title' : arr[i].title,
                        'value' : arr[i].value,
                        'order' : arr[i].order,
                        'main' : arr[i].main,
                    };
                    resolve(arr.push(pusher));
                });
                await new Promise(resolve => {
                    resolve(arr.sort(this.compare));
                });
                await new Promise(resolve => {
                    resolve(this.setState({
                        attributes : arr
                    }));
                });
                break;
            }
        }
    }

    async deleteRaw(id) {
        let arr = [];
        arr = this.state.form.attributes;
        for (let i = 0 ; i < this.state.form.attributes.length ; i++) {
            if (arr[i].id === id) {
                await new Promise(resolve => {
                    resolve(arr.splice(i, 1));
                });
                await new Promise(resolve => {
                    resolve(this.setState({
                        attributes : arr
                    }));
                });
                break;
            }
        }
    }

    render() {
        console.log(this.state.form.attributes)
        if (!this.state.loading) {
            return (<CircularProgress color={"secondary"} />);
        }
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>ویرایش محصول</h2>
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
                    <Box>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <ExpansionPanel expanded={true}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography><b>اطلاعات اولیه</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} >
                                            <TextField
                                                label="عنوان"
                                                variant="filled"
                                                margin='dense'
                                                value={this.state.form.title}
                                                fullWidth
                                                name='title'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <TextField
                                                label="کد محصول"
                                                variant="filled"
                                                margin='dense'
                                                value={this.state.form.code}
                                                fullWidth
                                                name='code'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                select
                                                label="برند"
                                                value={this.state.form.brand_id}
                                                variant="filled"
                                                margin='dense'
                                                fullWidth
                                                name='brand_id'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={this.handleChangeElement.bind(this)}
                                            >
                                                <MenuItem key={0} value={0}>انتخاب</MenuItem>
                                                {this.state.brands.map((brand, index) => {
                                                    return(
                                                        <MenuItem key={index + 1} value={brand.id}>{brand.title}</MenuItem>
                                                    );
                                                })}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                select
                                                label="وضعیت"
                                                value={this.state.form.status}
                                                variant="filled"
                                                margin='dense'
                                                fullWidth
                                                name='status'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value={1}>فعال</MenuItem>
                                                <MenuItem value={0}>غیرفعال</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <TextField
                                                label="قیمت پایه"
                                                variant="filled"
                                                margin='dense'
                                                value={this.state.form.price}
                                                fullWidth
                                                helperText="قیمت را به تومان وارد کنید."
                                                name='price'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                            <ExpansionPanel >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3bh-content"
                                    id="panel3bh-header"
                                >
                                    <Typography><b>دسته بندی</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            {this.state.categories && this.state.categories.length > 0 ?  <CheckboxTree
                                                nodes={this.state.categories}
                                                checked={this.state.checked}
                                                expanded={this.state.expanded}
                                                onCheck={checked => this.handleChangeCategory(checked)}
                                                onExpand={expanded => this.setState({ expanded })}
                                                noCascade={true}
                                            /> : <p>دسته جدید ایجاد نمایید.</p> }
                                        </Grid>
                                        {this.state.form.attributes && this.state.form.attributes.length > 0 ?
                                            <Grid item xs={12}>
                                                <table className='table-duplicate-row bounceIn'>
                                                    <thead>
                                                    <tr>
                                                        <th>ردیف</th>
                                                        <th>تغییر قیمت و موجودی</th>
                                                        <th>ویژگی</th>
                                                        <th>مقدار</th>
                                                        <th>اولویت</th>
                                                        <th></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.form.attributes.map((attribute, index) => {
                                                        return(<tr key={index}>
                                                            <td>{index + 1 }</td>
                                                            <td><Checkbox checked={this.state.form.attributes[index].main} value={this.state.form.attributes[index].main} name='main' onChange={(event) => this.handleDuplicateRaw(event, index)}  /></td>
                                                            <td><b>{attribute.title}</b></td>
                                                            <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index)} value={this.state.form.attributes[index].value} name='value' style={{ justifyContent: 'center !important'}} /></td>
                                                            <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index)} value={this.state.form.attributes[index].order} name='order' style={{ justifyContent: 'center !important'}} /></td>
                                                            <td>
                                                                <Tooltip title={'ایجاد اتریبیوت ' + attribute.title}>
                                                                    <IconButton color='primary' onClick={() => this.duplicateRaw(attribute.id)}>
                                                                        <Add />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title={'حذف اتریبیوت ' + attribute.title}>
                                                                    <IconButton color='secondary' onClick={() => this.deleteRaw(attribute.id)}>
                                                                        <RemoveCircleIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </td>
                                                        </tr>);
                                                    })}
                                                    </tbody>
                                                </table>
                                            </Grid>: ''}
                                    </Grid>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                            <ExpansionPanel >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Typography><b>بخش سئو</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item xs={12} >
                                            <TextField
                                                label="اسلاگ"
                                                variant="filled"
                                                margin='dense'
                                                value={this.state.form.slug}
                                                fullWidth
                                                name='slug'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                label="متا عنوان"
                                                variant="filled"
                                                margin='dense'
                                                value={this.state.form.meta_title}
                                                fullWidth
                                                name='meta_title'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                label="متا توضیحات"
                                                variant="filled"
                                                margin='dense'
                                                value={this.state.form.meta_description}
                                                fullWidth
                                                name='meta_description'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                            <ExpansionPanel >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header"
                                >
                                    <Typography><b>بخش محتوا</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item xs={12} >
                                            <TextField
                                                label="توضیح کامل"
                                                variant="filled"
                                                margin='dense'
                                                multiline
                                                value={this.state.form.content}
                                                fullWidth
                                                name='content'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                            <Box style={{ margin: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant='contained' color='primary' type="submit">ویرایش محصول</Button>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default EditProduct;
