import React, {Component} from 'react';
import {toast} from "react-toastify";
import Api from "../../api";
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import {CircularProgress} from "@material-ui/core";
import './FileUploader.css';
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import validator from 'validator'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class FileUploader extends Component {


    constructor(props) {
        super(props);
        this.state = {
            linkDialog: false,
            current: '',
            files: [],
        };
        this.api = new Api();
    }

    componentDidMount () {
        if (this.props.value && this.props.value.length > 0 ) {
            this.setState({
                files:  this.props.value
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.value && this.props.value.length > 0 ) {
            if (typeof nextProps.value != "undefined" && nextProps.value != this.state.files) {
                this.setState({
                    files: nextProps.value
                })
            }
        }
        return true;
    }


    /* Trigger On Change Input File */
    async handleSelectedFiles(event) {

        /* Fetch All File In State */
        let files = this.state.files;

        let counter = files.length;

        for (let i = 0; i < event.target.files.length ; i++) {

            /* File extension that accepted */
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];

            /* Video format accepted */
            const validVideoTypes = ['video/mp4', 'video/ogv', 'video/webm', 'video/3gpp'];


            /* Init State */
            files[i + counter] = {
                'percent': 0,
                'path': '',
                'file' : '',
                'collection': true,
                'directory' : 'attachment',
                'order': i + counter + 1,
                'link' : '',
                'caption': ''
            };

            if (validImageTypes.includes(event.target.files[i].type)) {
                files[i + counter]['mime_type'] = 'image';
                if ((event.target.files[i].size / 1024) > 1000) {
                    toast.error('حداکثر حجم عکس 1 مگابایت است.');
                    delete files[i + counter];
                    return ;
                }

            } else if (validVideoTypes.includes(event.target.files[i].type)) {
                files[i + counter]['mime_type'] = 'video';
                if ((event.target.files[i].size) > 8388608) {
                    toast.error('حداکثر حجم ویدئو 8 مگابایت است.');
                    delete files[i + counter];
                    return ;
                }
            } else {
                toast.error('فرمت فایل نامعتبر است.');
                delete files[i + counter];
                return false;
            }


            /* Preview Image Or Video File with Absolute Address */
            files[i + counter]['path'] = URL.createObjectURL(event.target.files[i]);

            this.setState({
                files
            });


            const form_data = new FormData();
            /* Append New File */
            form_data.append('file', event.target.files[i]);
            form_data.append('directory', 'attachment');

            /* Send Post Request To Server */
            axios.post(this.props.url, form_data, {
                onUploadProgress: (e) => {
                    const done = e.loaded;
                    const total = e.total;
                    /* Calculate Percent  */
                    files[i+ counter]['percent'] = (Math.floor(done / total * 1000) / 10);

                    this.setState({
                        files
                    });
                },
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.props.token
                },
            }).then((response) => {
                /* Get Real Address From Server */
                if (typeof response != "undefined") {
                    if (response.status === 200) {
                        files[i + counter]['path'] = response.data.path;
                        files[i + counter]['file'] = response.data.file;
                    } else {
                        delete files[i + counter];
                    }

                    this.setState({
                        files
                    });


                    this.props.onComplete(files);
                }
            }).catch((error) => {

                toast.error(error.message);

                delete files[i+counter];
                this.setState({
                    files
                });


                this.props.onComplete(files);
            })
        }
    };

    handleSetCollection(index) {
        let files = this.state.files;
        files[index].collection = (Boolean(files[index].collection) === true) ? false :  true;
        this.setState({
            files
        });


        this.props.onComplete(files);

        if (!files[index].collection) {
            toast.success('به مجموعه عکس های اصلی محصول اضافه شد.');
        }
    }

    handleUnlinkFile(event, index) {
        event.preventDefault();
        let files = this.state.files;
        this.api.unlink({file: files[index].file, directory: files[index].directory}).then((response) => {
            if (typeof response != "undefined") {
                if (response.status === true) {
                    let new_value = [];
                    let map = this.state.files;
                    map.map((f, i) => {
                        if (i !== index) {
                            new_value.push(f);
                        }
                    });
                    this.setState({
                        files: new_value
                    });
                    this.props.onComplete(new_value);
                    toast.success('فایل با موفقیت حذف گردید');
                } else {
                    toast.error('خطایی رخ داده است.');
                }
            }
        });


    }

    handleChangeLink(event)
    {
        let files = this.state.files;
        files[this.state.current][event.target.name] = event.target.value;
        this.setState({
            files
        })
    }

    checkUrlValid(event)
    {
        let files = this.state.files;
        if (event.target.value !== '') {
            if (! validator.isURL(event.target.value)) {
                toast.error('لینک نامعتبر است.');
                files[this.state.current]['link'] = '';
                this.setState({
                    files
                })
            }
        }

    }

    render() {
        return (
            <div className='gallery'>
                <label className="gallery-box" htmlFor="upload">
                    {this.state.files && this.state.files.length > 0 && this.state.files.map((file, index) => {
                        return (
                            <div key={index} className='img-box' style={{ height: '200px', width: '200px' }}>
                                {file.percent === 100 &&
                                <div>
                                    <Tooltip title='حذف'>
                                        <IconButton onClick={(event) => this.handleUnlinkFile(event, index)} color={"default"} className='remove-btn animated flash'>
                                            <HighlightOffIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='لینک و اولویت'>
                                        <IconButton onClick={() => this.setState({ linkDialog: true, current: index })} style={{ color: (  (file.link || file.caption) ? "#04f080" : "#828282")}} className='link-btn animated flash'>
                                            <LinkedCameraIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>}
                                <div className="img-box-mask" style={{ height: 200 - (file.percent * 2) + 'px', width: '200px'}}/>
                                <div className="img-box-progress">
                                    <Fab onClick={() => this.handleSetCollection(index, false)}  aria-label="save" color={Boolean(file.collection) === true ? 'default': 'primary'}>{ file.percent < 100 ? file.percent : <CheckIcon className='animated flash' />}</Fab>
                                    {file.percent < 100 && <CircularProgress color={"secondary"} className='circle-progress' size={68} />}
                                </div>
                                {file.mime_type === 'image' && <img className={file.percent === 100 ? 'animated flipInX' : 'animated fadeIn'}  width={200} height={200} key={index} src={ file.path !== '' && file.path}/>}
                                {file.mime_type === 'video' && <video className={file.percent === 100 ? 'animated flipInY' : 'animated fadeIn'}  controls  width={200} height={200} src={ file.path !== '' && file.path}/>}
                            </div>
                        );
                    })}
                    {this.state.files && this.state.files.length === 0 && <span>انتخاب فایل</span>}
                </label>
                <input accept={'video/mp4, video/ogv, video/webm, video/3gpp, image/gif, image/jpeg, image/png, image/jpg'}  className='input-file' id='upload' type="file" onChange={(event) => this.handleSelectedFiles(event)} multiple={true}/>
                <p>حجم عکس نباید بالاتر از 1 مگابایت باشد</p>
                <p>پس ار آپلود فایل با کلیک به روی علامت چک عکس اصلی را انتخاب کنید.</p>
                <p>در صورت انتخاب چند عکس به عنوان عکس اصلی نحوه نمایش به صورت رندوم خواهد بود.</p>
                <p>video/mp4, video/ogv, video/webm, video/3gpp, image/gif, image/jpeg, image/png, image/jpg</p>
                {this.state.files && this.state.files.length > 0 && (this.state.current || this.state.current === 0) &&  <Dialog
                    fullWidth={true}
                    open={this.state.linkDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.setState({ linkDialog: false})}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">تغییر لینک ,اولویت نمایش و توضیحات</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth={true}
                                    variant={"filled"}
                                    label={'توضیحات'}
                                    name={'caption'}
                                    onChange={(event) => this.handleChangeLink(event)}
                                    value={this.state.files[this.state.current].caption}
                                    helperText='این فیلد به عنوان (alt,caption) در نظر گرفته میشود.'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    style={{ textAlign: 'left', direction: 'ltr'}}
                                    fullWidth={true}
                                    variant={"filled"}
                                    label={'لینک'}
                                    name={'link'}
                                    onChange={(event) => this.handleChangeLink(event)}
                                    onBlur={(event) => this.checkUrlValid(event)}
                                    value={this.state.files[this.state.current].link}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select={true}
                                    fullWidth={true}
                                    variant={"filled"}
                                    label={'اولویت'}
                                    name={'order'}
                                    onChange={(event) => this.handleChangeLink(event)}
                                    value={parseInt(this.state.files[this.state.current].order)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    {this.state.files.map((file, index) => {
                                        return(
                                            <MenuItem key={index} value={parseInt(index + 1)}>{parseInt(index + 1)}</MenuItem>
                                        );
                                    })}
                                </TextField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ linkDialog: false})} color="primary">
                            تایید
                        </Button>
                    </DialogActions>
                </Dialog>}
            </div>
        );
    }
}

export default FileUploader;
