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
import Api from "../../api";
import {toast} from "react-toastify";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import FileUploader from "../../component/gallery/FileUploader";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from 'react-redux';
import {env} from "../../env";


class GalleryEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadUploader: true,
            files:[],
            form: {
                title: '',
                status: 1,
                is_slider: 1,
            },
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.handleRequest();
    }

    async handleRequest() {

        this.api.getGallery(this.props.match.params.id).then((response) => {
            if (typeof response != "undefined") {
                let form = this.state.form;

                let files = response.files;
                form.title =  response.title;
                form.status =  response.status;
                form.is_slider =  response.is_slider;

                this.setState({
                    form,
                    files,
                    loading: false,
                    loadUploader: false
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

        this.state.form['files'] = this.state.files;
        this.api.putGallery(this.props.match.params.id, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                    this.handleRequest();
                } else {
                    toast.error(response.msg);
                }
            }
            this.setState({
                loading: false
            });
        }).catch((error) => {
            toast.error(error);
            this.setState({
                loading: false
            });
        })

    }

    render() {
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>افزودن گالری جدید</h2>
                                <p style={{ color: '#8e8e8e'}}>گالری جدید اضافه کنید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/galleries'>
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
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography><b>اطلاعات اولیه</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} >
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
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                select
                                                label="اسلایدر"
                                                value={this.state.form.is_slider}
                                                variant="filled"
                                                margin='dense'
                                                fullWidth
                                                name='is_slider'
                                                onChange={this.handleChangeElement.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value={1}>هست</MenuItem>
                                                <MenuItem value={0}>نیست</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                            <ExpansionPanel expanded={true}>
                                <ExpansionPanelSummary
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header"
                                >
                                    <Typography><b>گالری تصاویر</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    {!this.state.loadUploader && <FileUploader
                                        value={this.state.files}
                                        multiple={true}
                                        onComplete={(files) => this.setState({files})}
                                        url={env.API[window.location.host] + '/backend/attachment'}
                                        token={this.props.auth.token}
                                    />}

                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider/>
                                </ExpansionPanelActions>
                                {this.state.loading && <CircularProgress color={"secondary"} />}
                            </ExpansionPanel>
                            {Boolean(this.props.auth.permissions.gallery.update.access) &&
                            <Box style={{margin: '20px 0', display: 'flex', justifyContent: 'flex-end'}}>
                                <Button disabled={this.state.loading} variant='contained' color='primary' type="submit">ویرایش</Button>
                            </Box>
                            }
                        </form>
                    </Box>
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

export default connect(
    mapStateToProps,
)(GalleryEdit);


