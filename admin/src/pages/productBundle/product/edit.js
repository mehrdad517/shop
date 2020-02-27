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
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import TextEditor from "../../../component/TextEditor/TextEditor";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Chip from "@material-ui/core/Chip";
import FileUploader from "../../../component/gallery/FileUploader";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FolderIcon from '@material-ui/icons/Folder';
import {connect} from 'react-redux';
import {env} from "../../../env";

class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadUploader: true,
            brands: [],
            checked: [], // tree checked or edit or  show
            expanded: [], // expanded tree
            categories : [], // categories tree
            files:[],
            tags: [],
            options: [], // tag select option
            form: {
                title: '',
                heading: '',
                code: '',
                brand_id: -1,
                package_type_id: -1,
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

    async componentDidMount() {
        // fetch brands
        this.api.fetchBrands().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    brands: response.data
                })
            }
        }).catch((error) => {
            toast(error);
        });
        this.api.fetchPackageTypes().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    packages_types: response.data
                })
            }
        }).catch((error) => {
            toast(error);
        });

        this.api.fetchProductCategories().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    categories: response
                })
            }
        }).catch((error) => {
            toast(error);
        });

        this.handleRequest();
    }

    async handleRequest() {

        await new Promise(resolve => {
            resolve(this.api.fetchProduct(this.props.match.params.id).then((response) => {

                let checked = [];

                response.categories && response.categories.map((category) => {
                    checked.push(category.value);
                });

                let options = [];
                let tags = [];
                response.tags.map((t) => {
                    options.push(t);
                    tags.push(t.id);
                });


                let files = response.files;


                this.setState({
                    form: {
                        categories: response.categories,
                        attributes: response.attributes,
                        title: response.title,
                        heading: response.heading,
                        code: response.code,
                        brand_id: response.brand_id,
                        package_type_id: response.package_type_id,
                        status: response.status,
                        slug: response.slug,
                        meta_title: response.meta_title,
                        meta_description: response.meta_description,
                        content: response.content,
                    },
                    checked,
                    files,
                    tags,
                    options
                });


            }));
        });

        await new Promise(resolve => {
            resolve(this.api.getProductAttributes(this.props.match.params.id, this.state.checked).then((response) => {
                if (typeof response != "undefined") {
                    let form = this.state.form;
                    form.attributes = response;
                    form.attributes.sort(this.compare);
                    this.setState({
                        form
                    })
                }
            }).catch((error) => {
                console.log(error);
            }));
        });

        await new Promise(resolve => {
            resolve(this.setState({
                loading: false,
                loadUploader: false,
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
        this.api.updateProduct(this.props.match.params.id, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    this.handleRequest();
                } else {
                    toast.error(response.msg);
                }
                this.setState({
                    loading: false
                })
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
                loading: true
            }));
        });

        if (this.state.checked.length > 0) {
            await new Promise(resolve => {
                resolve(this.api.getProductAttributes(this.props.match.params.id, this.state.checked).then((response) => {
                    if (typeof response != "undefined") {
                        let form = this.state.form;
                        form.attributes = response;
                        this.setState({
                            form,
                            loading: false
                        })
                    }
                }).catch((error) => {
                    toast.error(error);
                }));
            });
        } else {
            form.attributes = [];
            await new Promise(resolve => {
                resolve(this.setState({
                    form,
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

    render() {
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
                                        <Grid item xs={12} sm={6}>
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
                                        {this.state.form.attributes && this.state.form.attributes.length > 0 ?
                                            <Grid item xs={12}>
                                                <div style={{ overflowX: 'auto'}}>
                                                    <table className='table-duplicate-row bounceIn'>
                                                        <thead>
                                                        <tr>
                                                            <th>ردیف</th>
                                                            <th>ویژگی</th>
                                                            <th>مقدار (حداکثر 255 کاراکتر)</th>
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
                                                <p>برای حذف ویژگی کافیست فیلد مقدار را خالی بگذارید. </p>
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
                                                value={this.state.form.slug ? this.state.form.slug : ''}
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
                                                value={this.state.form.meta_title ? this.state.form.meta_title : ''}
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
                                                value={this.state.form.meta_description ? this.state.form.meta_description : ''}
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
                                            <TextEditor value={this.state.form.content} onChange={(value) => {
                                                let form = this.state.form;
                                                form['content'] = value;
                                                this.setState({
                                                    form
                                                })
                                            }} />
                                        </Grid>
                                        <Grid item xs={12} style={{ marginTop:'25px'}}>
                                            {!this.state.loadUploader && <div style={{ position: "relative"}}>
                                                <Autocomplete
                                                    multiple
                                                    freeSolo
                                                    size={"small"}
                                                    onChange={((event, value) => this.autoCompleteHandleSelect(value))}
                                                    options={this.state.options}
                                                    getOptionLabel={option => option.name}
                                                    defaultValue={this.state.options}
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, index) => (
                                                            <Chip label={option.name} {...getTagProps({ index })} />
                                                        ))
                                                    }
                                                    renderInput={params => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            margin={"dense"}
                                                            variant="filled"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            onChange={this.autoCompleteHandleChange.bind(this)}
                                                            helperText='حداکثر 5 تگ انتخاب کنید'
                                                        />
                                                    )}
                                                />
                                                {this.state.loading && <CircularProgress color={"secondary"} size={15} />}
                                            </div>}
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
                                    {!this.state.loadUploader && <FileUploader
                                        value={this.state.files}
                                        multiple={true}
                                        url={env.API[window.location.host] + '/backend/attachment'}
                                        onComplete={(files) => this.setState({files})}
                                        token={this.props.auth.token}
                                    />}
                                    {this.state.loading && <CircularProgress color={"secondary"} />}
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                            <Box style={{ margin: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button disabled={this.state.loading} variant='contained' color='primary' type="submit">ویرایش محصول</Button>
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
)(EditProduct);

