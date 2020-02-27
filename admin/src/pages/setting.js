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
import ClipLoader from 'react-spinners/SyncLoader';
import validator from "validator";
import TextEditor from "../component/TextEditor/TextEditor";

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            social_medias: [],
            domain_app: [],
            domain_license: [],
            communication_channels: [],
            form : {
                name: '',
                meta_title: '',
                meta_description: '',
                introduce: '',
                free_postage: '',
                min_purchase: '',
                copy_right: '',
                social_medias: [],
                domain_app: [],
                domain_license: [],
                communication_channels: [],
            }
        };

        this.api = new Api();
    }

    async componentDidMount() {

        await this.api.setting().then((response) => {
            if (typeof response != "undefined") {
                if (response.status) {
                    let form = this.state.form;
                    form['name'] = response.domain.name;
                    form['meta_title'] = response.domain.meta_title;
                    form['meta_description'] = response.domain.meta_description;
                    form['introduce'] = response.domain.introduce;
                    form['copy_right'] = response.domain.copy_right;
                    form['free_postage'] = response.domain.free_postage;
                    form['min_purchase'] = response.domain.min_purchase;
                    form['default_post_cost'] = response.domain.default_post_cost;
                    form['domain_app'] = response.domain.app.length > 0 ? response.domain.app : [{app_id: 0, value : ''}];
                    form['domain_license'] = response.domain.license.length > 0 ? response.domain.license : [{license_id: 0, value : ''}];
                    form['social_medias'] = response.domain.social_medias.length > 0 ? response.domain.social_medias : [{social_media_id: 0, value : ''}];
                    form['communication_channels'] = response.domain.communication_channels.length > 0 ? response.domain.communication_channels : [{communication_channel_id: 0, value : ''}];
                    this.setState({
                        form
                    });
                } else {
                    toast.error(response.msg);
                }
            }
        });

        await this.api.domainLinks('social').then((response) => {
            if (typeof response != "undefined") {
                let social_medias = this.state.social_medias;
                let domain_app = this.state.domain_app;
                let domain_license = this.state.domain_license;
                let communication_channels = this.state.communication_channels;

                response.map((r) => {
                    if (r.type === 'contact') {
                        communication_channels.push(r)
                    } else if (r.type === 'social') {
                        social_medias.push(r);
                    } else if (r.type === 'license') {
                        domain_license.push(r);
                    } else if (r.type === 'app') {
                        domain_app.push(r);
                    }
                });


                this.setState({
                    social_medias : social_medias,
                    domain_app : domain_app,
                    domain_license : domain_license,
                    communication_channels : communication_channels,
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


        this.api.updateSetting(this.state.form).then((response) => {
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

    checkUrlValid(event, i, key)
    {
        let form = this.state.form;
        if (event.target.value !== '') {
            if (! validator.isURL(event.target.value)) {
                toast.error('لینک نامعتبر است.');
                form[key][i][event.target.name] = '';
                this.setState({
                    form
                });
            }
        }

    }



    render() {
        return (
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
                                    <Link to='/'>
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
                                    <Grid item xs={12}>
                                        <TextField
                                            label="عنوان سایت"
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
                                    <Grid item xs={12}>
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
                                        <TextEditor value={this.state.form.introduce} onChange={(value) => {
                                            let form = this.state.form;
                                            form['introduce'] = value;
                                            this.setState({
                                                form
                                            })
                                        }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="متن کپی رایت"
                                            variant="filled"
                                            margin='dense'
                                            value={this.state.form.copy_right}
                                            fullWidth
                                            name='copy_right'
                                            onChange={this.handleChangeElement.bind(this)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper style={{ padding: '30px 20px', marginTop: '15px'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} >
                                        <TextField
                                            label="حداقل خرید (تومان)"
                                            variant="filled"
                                            margin='dense'
                                            value={this.state.form.min_purchase}
                                            fullWidth
                                            name='min_purchase'
                                            onChange={this.handleChangeElement.bind(this)}
                                            helperText=' حداقل مبلغ سفارش برای پرداخت آنلاین'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <TextField
                                            label="هزینه پستی رایگان (تومان)"
                                            variant="filled"
                                            margin='dense'
                                            value={this.state.form.free_postage}
                                            fullWidth
                                            name='free_postage'
                                            onChange={this.handleChangeElement.bind(this)}
                                            helperText='برای سفارشات بالای این مبلغ هزینه پستی رایگان است.'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <TextField
                                            label="هزینه پست پیش فرض (تومان)"
                                            variant="filled"
                                            margin='dense'
                                            value={this.state.form.default_post_cost}
                                            fullWidth
                                            name='default_post_cost'
                                            onChange={this.handleChangeElement.bind(this)}
                                            helperText='در صورت از کار افتادن وبسرویس پست'
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
                                        <div style={{ overflowX: 'auto'}}>
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
                                                        <td><TextField onBlur={(event) => this.checkUrlValid(event, index, 'social_medias')} onChange={(event) => this.handleDuplicateRaw(event, index, 'social_medias')} name={'value'} fullWidth value={s.value} /></td>
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
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper style={{ padding: '0 20px', marginTop: '15px'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div style={{ overflowX: 'auto'}}>
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
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                            <Paper style={{ padding: '0 20px', marginTop: '15px'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div style={{ overflowX: 'auto'}}>
                                            <table className='table-duplicate-row fadeIn'>
                                                <thead>
                                                <tr>
                                                    <th>ردیف</th>
                                                    <th>اپلیکیشن</th>
                                                    <th>مقدار</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.form.domain_app.length > 0 && this.state.form.domain_app.map((s, index) => {
                                                    return(<tr key={index}>
                                                        <td>{index + 1 }</td>
                                                        <td>
                                                            <TextField
                                                                name={'domain_app_id'}
                                                                select
                                                                value={s.domain_app_id}
                                                                fullWidth
                                                                onChange={(event) => this.handleDuplicateRaw(event, index, 'domain_app')}
                                                            >
                                                                <MenuItem key={0} value={0}>انتخاب</MenuItem>
                                                                {this.state.domain_app && this.state.domain_app.map((loop, index) => {
                                                                    return(
                                                                        <MenuItem key={index + 1} value={loop.id}>{loop.title}</MenuItem>
                                                                    );
                                                                })}
                                                            </TextField>
                                                        </td>
                                                        <td><TextField onBlur={(event) => this.checkUrlValid(event, index, 'domain_app')}  onChange={(event) => this.handleDuplicateRaw(event, index, 'domain_app')} name={'value'} fullWidth value={s.value} /></td>
                                                        <td>
                                                            <Tooltip title={'ایجاد'}>
                                                                <IconButton color='primary' onClick={() => this.duplicateRaw('domain_app', 'domain_app_id', s.domain_app_id )} >
                                                                    <Add />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title={'حذف'}>
                                                                <IconButton color='secondary' onClick={() => this.deleteRaw('domain_app', 'domain_app_id', s.domain_app_id )}>
                                                                    <RemoveCircleIcon  />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>);
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper style={{ padding: '0 20px', marginTop: '15px'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div style={{ overflowX: 'auto'}}>
                                            <table className='table-duplicate-row fadeIn'>
                                                <thead>
                                                <tr>
                                                    <th>ردیف</th>
                                                    <th>لایسنس ها</th>
                                                    <th>مقدار</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.form.domain_license.length > 0 && this.state.form.domain_license.map((s, index) => {
                                                    return(<tr key={index}>
                                                        <td>{index + 1 }</td>
                                                        <td>
                                                            <TextField
                                                                name={'domain_license_id'}
                                                                select
                                                                value={s.domain_license_id}
                                                                fullWidth
                                                                onChange={(event) => this.handleDuplicateRaw(event, index, 'domain_license')}
                                                            >
                                                                <MenuItem key={0} value={0}>انتخاب</MenuItem>
                                                                {this.state.domain_license && this.state.domain_license.map((loop, index) => {
                                                                    return(
                                                                        <MenuItem key={index + 1} value={loop.id}>{loop.title}</MenuItem>
                                                                    );
                                                                })}
                                                            </TextField>
                                                        </td>
                                                        <td><TextField  onBlur={(event) => this.checkUrlValid(event, index, 'domain_license')}  onChange={(event) => this.handleDuplicateRaw(event, index, 'domain_license')} name={'value'} fullWidth value={s.value} /></td>
                                                        <td>
                                                            <Tooltip title={'ایجاد'}>
                                                                <IconButton color='primary' onClick={() => this.duplicateRaw('domain_license', 'domain_license_id', s.domain_license_id )} >
                                                                    <Add />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title={'حذف'}>
                                                                <IconButton color='secondary' onClick={() => this.deleteRaw('domain_license', 'domain_license_id', s.domain_license_id )}>
                                                                    <RemoveCircleIcon  />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>);
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                            {this.props.auth.permissions.domain.update.access &&
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
                            }
                        </form>
                    </Box>
                </div>
                {this.state.loading && <CircularProgress color={"secondary"} size={20}  />}
            </Container>
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
