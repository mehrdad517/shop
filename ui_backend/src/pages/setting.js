import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from "./header";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Api from "../api";
import {toast} from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/AddCircle";
import MenuItem from "@material-ui/core/MenuItem";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CircularProgress from "@material-ui/core/CircularProgress";
class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            social_medias: [],
            communication_channels: [],
            form : {
                name: '',
                meta_title: '',
                meta_description: '',
                introduce: '',
                social_medias: [],
                communication_channels: [],
            }
        };

        this.api = new Api();
    }

    async componentDidMount() {

        await this.api.setting(window.location.host).then((response) => {
            if (typeof response != "undefined") {
                let form = this.state.form;
                form['name'] = response.name;
                form['meta_title'] = response.meta_title;
                form['meta_description'] = response.meta_description;
                form['introduce'] = response.introduce;
                form['social_medias'] = response.social_medias.length > 0 ? response.social_medias : [{social_media_id: 0, value : ''}];
                form['communication_channels'] = response.communication_channels.length > 0 ? response.communication_channels : [{communication_channel_id: 0, value : ''}];
                this.setState({
                    form
                });
            }
        });

        await this.api.socialMedia().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    social_medias: response
                })
            }
        });

        await this.api.communicationChannel().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    communication_channels: response
                })
            }
        });

        this.setState({
            loading: false
        })
    }


    handleChangeElement(event) {
        let form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({
            form,
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            loading: true,
        });


        this.api.updateSetting(window.location.host, this.state.form).then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    toast.success(response.msg);
                } else {
                    toast.error(response.msg);
                }
            }

            this.setState({
                loading: false,
            });
        })
    }

    // function for duplicate row

    // change state
    handleDuplicateRaw = (event, i, key) => {
        let form = this.state.form;
        form[key][i][event.target.name] = event.target.value;
        this.setState({
            form
        })
    };


    /**
     *
     * @param state
     * @param key
     * @param id
     * @returns {Promise<void>}
     */
    async  duplicateRaw(state, key, id) {
        let form = this.state.form;
        for (let i=0; i < form[state].length; i++) {
            if (form[state][i][key] === id) {
                await new Promise(resolve => {
                    let pusher;
                    Object.keys(form[state][i]).forEach((key) => {
                        pusher = {
                            key : ''
                        }
                    });

                    resolve(form[state].push(pusher));
                });

                await new Promise(resolve => {
                    resolve(this.setState({
                        form
                    }));
                });

                break;
            }
        }
    }

    async deleteRaw(state, key, id) {
        if (this.state.form[state].length > 1) {
            let form = [];
            form = this.state.form;
            for (let i = 0 ; i < this.state.form[state].length ; i++) {
                if (form[state][i][key] === id) {
                    await new Promise(resolve => {
                        resolve(form[state].splice(i, 1));
                    });
                    await new Promise(resolve => {
                        resolve(this.setState({
                            form
                        }));
                    });
                    break;
                }
            }
        } else {
            toast.error('امکان حذف ایتم وجود ندارد.');
        }

    }



    render() {
        return (
            <div>
                <Header/>
                 <Container>
                    <div className="content">
                    <Box>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>تنظیمات</h2>
                                <p style={{ color: '#8e8e8e'}}>تنظیمات سایت و اپ را انجام دهید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/dashboard'>
                                        <Button variant="contained" color="default" >
                                            <NavigationIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{ marginTop: '20px'}}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Paper style={{ padding: '30px 20px'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} >
                                        <TextField
                                            label="نام سایت"
                                            variant="filled"
                                            margin='dense'
                                            value={this.state.form.name}
                                            fullWidth
                                            name='name'
                                            onChange={this.handleChangeElement.bind(this)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
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
                                    <Grid item xs={12} >
                                        <TextField
                                            label="معرفی سایت"
                                            variant="filled"
                                            margin='dense'
                                            value={this.state.form.introduce}
                                            fullWidth
                                            name='introduce'
                                            onChange={this.handleChangeElement.bind(this)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper style={{ padding: '0 20px', marginTop: '15px'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <table className='table-duplicate-row fadeIn'>
                                            <thead>
                                            <tr>
                                                <th>ردیف</th>
                                                <th>شبکه اجتماعی</th>
                                                <th>لینک</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.form.social_medias.length > 0 && this.state.form.social_medias.map((s, index) => {
                                                return(<tr key={index}>
                                                    <td>{index + 1 }</td>
                                                    <td>
                                                        <TextField
                                                            name={'social_media_id'}
                                                            select
                                                            value={s.social_media_id}
                                                            fullWidth
                                                            onChange={(event) => this.handleDuplicateRaw(event, index, 'social_medias')}
                                                        >
                                                            <MenuItem key={0} value={0}>انتخاب</MenuItem>
                                                            {this.state.social_medias && this.state.social_medias.map((loop, index) => {
                                                                return(
                                                                    <MenuItem key={index + 1} value={loop.id}>{loop.title}</MenuItem>
                                                                );
                                                            })}
                                                        </TextField>
                                                    </td>
                                                    <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index, 'social_medias')} name={'value'} fullWidth value={s.value} /></td>
                                                    <td>
                                                        <Tooltip title={'ایجاد'}>
                                                            <IconButton color='primary' onClick={() => this.duplicateRaw('social_medias', 'social_media_id', s.social_media_id, )} >
                                                                <Add />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title={'حذف'}>
                                                            <IconButton color='secondary' onClick={() => this.deleteRaw('social_medias', 'social_media_id', s.social_media_id, )}>
                                                                <RemoveCircleIcon  />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                </tr>);
                                            })}
                                            </tbody>
                                        </table>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper style={{ padding: '0 20px', marginTop: '15px'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <table className='table-duplicate-row fadeIn'>
                                            <thead>
                                            <tr>
                                                <th>ردیف</th>
                                                <th>پل های ارتباطی</th>
                                                <th>مقدار</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.form.communication_channels.length > 0 && this.state.form.communication_channels.map((s, index) => {
                                                return(<tr key={index}>
                                                    <td>{index + 1 }</td>
                                                    <td>
                                                        <TextField
                                                            name={'communication_channel_id'}
                                                            select
                                                            value={s.communication_channel_id}
                                                            fullWidth
                                                            onChange={(event) => this.handleDuplicateRaw(event, index, 'communication_channels')}
                                                        >
                                                            <MenuItem key={0} value={0}>انتخاب</MenuItem>
                                                            {this.state.communication_channels && this.state.communication_channels.map((loop, index) => {
                                                                return(
                                                                    <MenuItem key={index + 1} value={loop.id}>{loop.title}</MenuItem>
                                                                );
                                                            })}
                                                        </TextField>
                                                    </td>
                                                    <td><TextField onChange={(event) => this.handleDuplicateRaw(event, index, 'communication_channels')} name={'value'} fullWidth value={s.value} /></td>
                                                    <td>
                                                        <Tooltip title={'ایجاد'}>
                                                            <IconButton color='primary' onClick={() => this.duplicateRaw('communication_channels', 'communication_channel_id', s.communication_channel_id )} >
                                                                <Add />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title={'حذف'}>
                                                            <IconButton color='secondary' onClick={() => this.deleteRaw('communication_channels', 'communication_channel_id', s.communication_channel_id )}>
                                                                <RemoveCircleIcon  />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                </tr>);
                                            })}
                                            </tbody>
                                        </table>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Grid item xs={12}>
                                <Button
                                    disabled={this.state.loading}
                                    style={{ marginTop: '15px'}}
                                    type="submit"
                                    variant="contained"
                                    color={"primary"}
                                >
                                    ذخیره تنظیمات
                                </Button>
                            </Grid>
                        </form>
                    </Box>
                    </div>
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
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting);
