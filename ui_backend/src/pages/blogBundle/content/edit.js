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
import CheckboxTree from "react-checkbox-tree";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FileUploader from "../../../component/FileUploader";
import TextEditor from "../../../component/TextEditor/TextEditor";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Chip from "@material-ui/core/Chip";


class ContentEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            checked: [], // tree checked or edit or  show
            expanded: [], // expanded tree
            categories : [], // categories tree
            files:[],
            tags: [],
            options: [], // tag select option
            form: {
                title: '',
                status: 1,
                slug: '',
                meta_title: '',
                meta_description: '',
                content: '',
            },
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.handleRequest();
    }

    async handleRequest() {


        this.api.getBlogCategories().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    categories: response,
                    // loading: false
                })

            }
        }).catch((error) => {
            toast(error);
        });

        this.api.getContent(this.props.match.params.id).then((response) => {
            if (typeof response != "undefined") {

                let checked = this.state.checked;
                response.categories.map((category) => {
                    checked.push(category.value);
                });

                let options = this.state.options;
                let tags = this.state.tags;
                response.tags.map((t) => {
                    options.push(t);
                    tags.push(t.id);
                });


                let files = response.files;

                let form = this.state.form;
                form.title =  response.title;
                form.status =  response.status;
                form.slug =  response.slug;
                form.meta_title =  response.meta_title;
                form.meta_description =  response.meta_description;
                form.content =  response.content;
                this.setState({
                    form,
                    tags,
                    checked,
                    options,
                    files,
                    loading: false
                })
            }
        }).catch((error) => {
            toast.error(error.message);
        });


    }


    handleChangeElement = (event) => {
        let form = this.state.form;
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
        this.state.form['files'] = this.state.files;
        this.state.form['tags'] = this.state.tags;
        this.api.putContent(this.props.match.params.id, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                } else {
                    toast.error(response.msg);
                }
            }
            this.setState({
                loading: false
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            });
        })

    }


    autoCompleteHandleSelect = (selected) =>
    {
        let tags = [];
        console.log(selected);
        selected.forEach((value) => {
            tags.push(value.id);
        });
        this.setState({
            tags
        });


    };


    async autoCompleteHandleChange(event)
    {
        let instance = new Api();
        let term = event.target.value;
        instance.autoComplete('tags', {'term': event.target.value}).then((response) => {
            if (typeof response != "undefined") {
                if (response.length > 0 ) {
                    this.setState({
                        options: response
                    })
                } else {
                    let options = this.state.options;
                    options.push({
                        id: term,
                        name: term
                    });
                    this.setState({
                        options
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
                                <h2>افزودن مطلب جدید</h2>
                                <p style={{ color: '#8e8e8e'}}>مقاله جدید اضافه کنید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/blog/contents'>
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
                                            {this.state.categories ?  <CheckboxTree
                                                nodes={this.state.categories}
                                                checked={this.state.checked}
                                                expanded={this.state.expanded}
                                                onCheck={checked => this.setState({checked})}
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
                                                helperText='60 تا 255 کاراکتر وارد کنید.'
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
                                                helperText='60 تا 255 کاراکتر وارد کنید.'
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
                                            {! this.state.loading &&  <TextEditor value={this.state.form.content} onChange={(value) => {
                                                let form = this.state.form;
                                                form['content'] = value;
                                                this.setState({
                                                    form
                                                })
                                            }} />}
                                        </Grid>
                                        <Grid item xs={12} style={{ marginTop:'25px'}}>
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
                                    {!this.state.loading && <FileUploader
                                        value={this.state.files}
                                        multiple={true}
                                        width={200}
                                        height={200}
                                        onComplete={(files) => this.setState({files})}
                                    />}

                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                            <Box style={{ margin: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button disabled={this.state.loading} variant='contained' color='primary' type="submit">ایجاد مطلب جدید</Button>
                            </Box>
                        </form>
                    </Box>
                </Container>
                {this.state.loading && <CircularProgress  color={"secondary"} />}
            </div>
        );
    }
}

export default ContentEdit;
