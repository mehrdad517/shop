import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Api from "../../../api";
import MenuItem from "@material-ui/core/MenuItem";
import {toast} from "react-toastify";
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import NavigationIcon from "@material-ui/icons/Navigation";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextEditor from "../../../component/TextEditor/TextEditor";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import FileUploader from "../../../component/gallery/FileUploader";
import {env} from "../../../env";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";

class AttributeEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadUploader: false,
            files: [], // gallery
            tags: [],
            options: [], // tag select option
            form: {
                title: '',
                heading: '',
                slug: '',
                meta_title: '',
                meta_description: '',
                content: '',
                status: 1,
                has_link: 1
            }
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.api.fetchAttribute(this.props.match.params.id).then((response) => {

            let options = this.state.options;
            let tags = this.state.tags;

            response.tags.map((t) => {
                options.push(t);
                tags.push(t.id);
            });

            this.setState({
                form: {
                    title: response.title,
                    heading: response.heading,
                    slug: response.slug ? response.slug : response.title.split(' ').join('-'),
                    meta_title: response.meta_title ? response.meta_title : response.title,
                    meta_description: response.meta_description ? response.meta_description: response.title,
                    content: response.content,
                    status: response.status,
                    has_link: response.has_link
                },
                files: response.files,
                tags,
                options,
                loading: false,
                loadUploader: false
            })
        }).catch((error) => {
            toast.error(error);
        })
    }


    handleChangeElement = (event) => {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form,
        })
    };

    handleSubmit (event) {
        event.preventDefault();

        this.setState({
            loading: true
        });


        this.state.form['files'] = this.state.files;
        this.state.form['tags'] = this.state.tags;
        this.api.updateAttribute(this.props.match.params.id, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    this.props.history.push('/attributes');

                } else {
                    toast.error(response.msg);
                }

                this.setState({
                    loading: false
                });
            }
        }).catch((error) => {
            this.setState({
                loading: false
            });
            console.log(error);
        })

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
        let instance = new Api();
        let term = event.target.value;
        this.setState({
            loading: true
        });
        instance.autoComplete('tags', {'term': event.target.value}).then((response) => {
            if (typeof response != "undefined") {
                if (response.length > 0 ) {
                    this.setState({
                        options: response,
                        loading: false
                    })
                } else {
                    let options = this.state.options;
                    options.push({
                        id: term,
                        name: term
                    });
                    this.setState({
                        options,
                        loading: false
                    })
                }
            }
        });

    }


    render() {
        return (
            <div className="content">
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>ویرایش ویژگی گروهی</h2>
                                <p>{this.state.form.title}</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/attributes'>
                                        <Button variant="contained" color="default" >
                                            <NavigationIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{ margin: '20px 0'}}>
                        <form dir='rtl' onSubmit={this.handleSubmit.bind(this)}>
                            <ExpansionPanel expanded={true}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header"
                                >
                                    <Typography><b>اطلاعات</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} >
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
                                        <Grid item xs={12} >
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
                                        <Grid item xs={12}>
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
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="لینک"
                                                value={this.state.form.has_link}
                                                variant="filled"
                                                margin='dense'
                                                fullWidth
                                                name='has_link'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value={1}>باشد</MenuItem>
                                                <MenuItem value={0}>نباشد</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div style={{ position: "relative"}}>
                                                <Autocomplete
                                                    multiple
                                                    freeSolo
                                                    size={"small"}
                                                    onChange={((event, value) => this.autoCompleteHandleSelect(value))}
                                                    options={this.state.options}
                                                    defaultValue={this.state.options}
                                                    getOptionLabel={option => option.name}
                                                    renderInput={params => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            margin={"dense"}
                                                            label="مقادیر"
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
                                    <Typography><b>بخش محتوا</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item xs={12} >
                                            <TextEditor
                                                value={this.state.form.content}
                                                onChange={(value) => {
                                                    let form = this.state.form;
                                                    form['content'] = value;
                                                    this.setState({
                                                        form
                                                    })
                                                }} />
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
                                        onComplete={(files) => this.setState({files})}
                                        token={this.props.auth.token}
                                        url={env.API[window.location.host] + '/backend/attachment'}
                                    />}
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                                {this.state.loading && <CircularProgress color={"secondary"} size={20}  />}
                            </ExpansionPanel>
                            {this.props.auth.permissions.group_attribute.update.access &&
                            <Grid item xs={12}>
                                <Button
                                    disabled={this.state.loading}
                                    style={{ marginTop: '15px'}}
                                    type="submit"
                                    variant="contained"
                                    color={"primary"}
                                >
                                    ویرایش
                                </Button>
                            </Grid>
                            }
                        </form>
                    </Box>
                    {this.state.loading && <CircularProgress color={"secondary"} size={20}  />}
                </Container>
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AttributeEdit);
