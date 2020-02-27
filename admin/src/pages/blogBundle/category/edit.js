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

class BlogCategoryEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            files: [], // gallery
            form: {
                label: '',
                heading: '',
                slug: '',
                meta_title: '',
                meta_description: '',
                content: '',
                status: 1
            }
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.api.getBlogCategory(this.props.match.params.id).then((response) => {
            this.setState({
                form: {
                    label: response.label,
                    heading: response.heading,
                    slug: response.slug ? response.slug : response.label.split(' ').join('-'),
                    meta_title: response.meta_title ? response.meta_title : response.label,
                    meta_description: response.meta_description ? response.meta_description: response.label,
                    content: response.content,
                    status: response.status,
                },
                files: response.files,
                loading: false
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

        this.api.updateBlogCategory(this.props.match.params.id, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {

                    toast.success(response.msg);

                    this.props.history.push('/blog/categories');
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


    render() {
        return (
            <div className="content">
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>ویرایش دسته بندی</h2>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/blog/categories'>
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
                                                value={this.state.form.label}
                                                fullWidth
                                                name='label'
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
                                    {(!this.state.loading || this.state.files.length > 0) && <FileUploader
                                        value={this.state.files}
                                        onComplete={(files) => this.setState({files})}
                                        token={this.props.auth.token}
                                        url={env.API[window.location.host] + '/backend/attachment'}
                                    />}
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                                {this.state.loading && <CircularProgress color={"secondary"} />}
                            </ExpansionPanel>
                            {this.props.auth.permissions.product_category.update.access &&
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
)(BlogCategoryEdit);
