import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
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
import {Link} from "react-router-dom";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FolderIcon from '@material-ui/icons/Folder';
import TextEditor from "../../../component/TextEditor/TextEditor";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import FileUploader from "../../../component/gallery/FileUploader";
import {connect} from 'react-redux';
import {env} from "../../../env";

class CreateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            brands: [],
            checked: [], // tree checked or edit or  show
            expanded: [], // expanded tree
            categories : [], // categories tree
            files:[],
            tags: [],
            options: [],
            form: {
                title: '',
                heading: '',
                code: '',
                brand_id: -1,
                package_type_id: -1,
                status: 0,
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
            resolve(this.api.fetchPackageTypes().then((response) => {
                if (typeof response != "undefined") {
                    this.setState({
                        packages_types: response.data
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
            resolve(this.setState({
                loading: false
            }));
        })
    }

    handleDuplicateRaw = (event, i) => {
        let form = this.state.form;
        if (event.target.name === 'main') {
            form.attributes[i][event.target.name] = Boolean(event.target.value);
        } else {
            form.attributes[i][event.target.name] = event.target.value;
        }

        this.setState({
            form
        })
    };


    handleChangeElement = (event) => {
        let form = this.state.form;
        if (event.target.name === 'title') {

            if (this.state.form.slug === '' || this.state.form.slug === form['title'].split(' ').join('-')) {
                form['slug'] = event.target.value.split(' ').join('-');
            }
            if (this.state.form.meta_title === ''  || this.state.form.meta_title  === form['title']) {
                form['meta_title'] = event.target.value;
            }
            if (this.state.form.meta_description === ''  || this.state.form.meta_description  === form['title']) {
                form['meta_description'] = event.target.value;
            }
        }
        form[event.target.name] = event.target.value;
        this.setState({
            form,
        });
    };

    handleSubmit (event) {
        event.preventDefault();

        this.setState({
            loading: true
        });

        this.state.form['categories'] = this.state.checked;
        this.state.form['tags'] = this.state.tags;
        this.state.form['files'] = this.state.files;
        this.api.createProduct(this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    setTimeout(() => {
                        this.props.history.push('/products');
                    }, 500);
                } else {
                    this.setState({
                        loading: false
                    });
                    toast.error(response.msg);
                }
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    async handleChangeCategory(checked) {

        let form = this.state.form;
        form['attributes'] = [];
        await new Promise(resolve => {
            resolve(this.setState({
                checked,
                form,
                loading: true
            }));
        });

        if (this.state.checked.length > 0) {
            await new Promise(resolve => {
                resolve(this.api.getProductCategoryAttributes(checked).then((response) => {
                    if (typeof response != "undefined") {
                        form['attributes'] = response;
                        this.setState({
                            form,
                            loading: false
                        })
                    }
                }).catch((error) => {
                    console.log(error);
                }));
            });
        }
    }


    autoCompleteHandleSelect = (selected) =>
    {
        let tags = [];
        selected.forEach((value) => {
            tags.push(value.id);
        });
        this.setState({
            tags
        });


    };


    async autoCompleteHandleChange(event)
    {

        if (event.target.value.length >= 3) {
            this.setState({
                loading: true
            });

            let instance = new Api();
            let term = event.target.value;
            instance.autoComplete('tags', {'term': event.target.value}).then((response) => {
                if (typeof response != "undefined") {
                    if (response.length > 0 ) {
                        this.setState({
                            options: response,
                            loading: false,
                        })
                    } else {
                        let options = this.state.options;
                        options.push({
                            id: term,
                            name: term
                        });
                        this.setState({
                            options,
                            loading: false,
                        })
                    }
                }
            });
        }


    }

    render() {
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>افزودن محصولات</h2>
                                <p style={{ color: '#8e8e8e'}}>محصول جدید اضافه کنید.</p>
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
                                        <Grid item xs={6}>
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
                                        <Grid item xs={6}>
                                            <TextField
                                                label="هدینگ (h2)"
                                                variant="filled"
                                                margin='dense'
                                                value={this.state.form.heading}
                                                fullWidth
                                                name='heading'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} >
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
                                        <Grid item xs={12} sm={4}>
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
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                select
                                                label="واحد محصول"
                                                value={this.state.form.package_type_id}
                                                variant="filled"
                                                margin='dense'
                                                fullWidth
                                                name='package_type_id'
                                                onChange={this.handleChangeElement.bind(this)}
                                                helperText='واحد فروش محصول را وارد کنید.'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem index={0} value={-1}>انتخاب</MenuItem>
                                                {this.state.packages_types && this.state.packages_types.map((parameter, index) => {
                                                    return(
                                                        <MenuItem key={index + 1} value={parameter.id}>{parameter.title}</MenuItem>
                                                    );
                                                })}
                                            </TextField>
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
                                    <Typography><b>دسته بندی و مشخصات فنی</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            {this.state.categories.length > 0 ?  <CheckboxTree
                                                nodes={this.state.categories}
                                                checked={this.state.checked}
                                                expanded={this.state.expanded}
                                                onCheck={checked => this.handleChangeCategory(checked)}
                                                onExpand={expanded => this.setState({ expanded })}
                                                noCascade={true}
                                                icons={{
                                                    check: <CheckBoxIcon />,
                                                    uncheck: <CheckBoxOutlineBlankIcon />,
                                                    expandClose: <ExpandLessIcon />,
                                                    expandOpen: <ExpandMoreIcon />,
                                                    parentClose: <FolderIcon />,
                                                    parentOpen: <FolderOpenIcon />,
                                                    leaf: <InsertDriveFileIcon />,
                                                }}
                                            /> : <p>دسته جدید ایجاد نمایید.</p> }
                                        </Grid>
                                        {this.state.form.attributes.length > 0 ?
                                            <Grid item xs={12}>
                                                <div style={{ overflowX: 'auto'}}>
                                                <table className='table-duplicate-row fadeIn'>
                                                    <thead>
                                                    <tr>
                                                        <th>ردیف</th>
                                                        <th>ویژگی</th>
                                                        <th>مقدار (حداکثر 255 کارکتر)</th>
                                                        <th>اولویت</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.form.attributes.map((attribute, index) => {
                                                        return(<tr key={index}>
                                                            <td>{index + 1 }</td>
                                                            <td width='15%'><b>{attribute.title}</b></td>
                                                            <td width='75%'>
                                                                {attribute.options.length > 0 ?
                                                                    <TextField
                                                                        select
                                                                        value={this.state.form.attributes[index].value}
                                                                        fullWidth
                                                                        name='value'
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        onChange={(event) => this.handleDuplicateRaw(event, index)}
                                                                    >
                                                                        <MenuItem key={0} value=''>انتخاب</MenuItem>
                                                                        {attribute.options.map((opt, i) => {
                                                                            return(
                                                                                <MenuItem key={i + 1} value={opt.id}>{opt.name}</MenuItem>
                                                                            );
                                                                        })}
                                                                    </TextField>
                                                                    :
                                                                    <TextField fullWidth onChange={(event) => this.handleDuplicateRaw(event, index)} value={this.state.form.attributes[index].value} name='value' style={{ justifyContent: 'center !important'}} />}
                                                            </td>
                                                            <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index)} value={this.state.form.attributes[index].order} name='order' style={{ justifyContent: 'center !important'}} /></td>
                                                        </tr>);
                                                    })}
                                                    </tbody>
                                                </table>
                                                </div>
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
                                                helperText='بدون فاصله وارد کنید.'
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
                                            <TextEditor onChange={(value) => {
                                                let form = this.state.form;
                                                form['content'] = value;
                                                this.setState({
                                                    form
                                                })
                                            }} />
                                        </Grid>
                                        <Grid item xs={12} style={{ marginTop:'25px'}}>
                                            <div style={{ position: "relative"}}>
                                            <Autocomplete
                                                multiple
                                                freeSolo
                                                size={"small"}
                                                onChange={((event, value) => this.autoCompleteHandleSelect(value))}
                                                options={this.state.options}
                                                getOptionLabel={option => option.name}
                                                renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        margin={"dense"}
                                                        label="تگ ها"
                                                        variant="filled"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={this.autoCompleteHandleChange.bind(this)}
                                                    />
                                                )}
                                            />
                                                {this.state.loading && <CircularProgress color={"secondary"} size={15} />}
                                            </div>
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
                                    <Typography><b>گالری تصاویر</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <FileUploader
                                        onComplete={(files) => this.setState({files})}
                                        token={this.props.auth.token}
                                        url={env.API[window.location.host] + '/backend/attachment'}
                                    />
                                    {this.state.loading && <CircularProgress color={"secondary"} />}
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                            <Box style={{ margin: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button disabled={this.state.loading} variant='contained' color='primary' type="submit">ایجاد محصول</Button>
                            </Box>
                        </form>
                    </Box>
                </Container>
                {this.state.loading && <CircularProgress color={"secondary"} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(
    mapStateToProps,
)(CreateProduct);

