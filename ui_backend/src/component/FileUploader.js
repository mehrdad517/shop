import React, {Component} from 'react';
import {toast} from "react-toastify";
import Api from "../api";
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import {CircularProgress} from "@material-ui/core";
import './FileUploader.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";

class FileUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
        this.api = new Api();
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
            const validVideoTypes = ['video/mp4'];

            /* Init State */
            files[i + counter] = {
                'percent': 0,
                'preview': '',
                'address': '',
                'name' : '',
                'collection': true
            };

            if (validImageTypes.includes(event.target.files[i].type)) {
                files[i + counter]['tag'] = 'img';
                if ((event.target.files[i].size / 1024) > 1000) {
                    toast.error('حداکثر حجم عکس 1 مگابایت است.');
                    delete files[i + counter];
                    return ;
                }

            } else if (validVideoTypes.includes(event.target.files[i].type)) {
                files[i + counter]['tag'] = 'video';
                if ((event.target.files[i].size) > 10000) {
                    toast.error('حداکثر حجم ویدئو 10 مگابایت است.');
                    delete files[i + counter];
                    return ;
                }
            } else {
                toast.error('فرمت فایل نامعتبر است.');
                delete files[i + counter];
                return false;
            }


            /* Preview Image Or Video File with Absolute Address */
            files[i + counter]['preview'] = URL.createObjectURL(event.target.files[i]);

            this.setState({
                files
            });


            const form_data = new FormData();
            /* Append New File */
            form_data.append('file', event.target.files[i]);
            form_data.append('directory', 'attachment');

            /* Send Post Request To Server */
            axios.post('http://localhost:8000/api/attachment', form_data, {
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
                    headers: {
                        'Accept': 'application/json',
                        'content-type': 'multipart/form-data',
                    }
                },
            }).then((response) => {
                /* Get Real Address From Server */
                if (typeof response != "undefined") {
                    if (response.status === 200) {
                        files[i + counter]['address'] = response.data.address;
                        files[i + counter]['name'] = response.data.name;
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
        files[index].collection = (files[index].collection === true) ? false :  true;
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
        this.api.unlink({file: files[index].name}).then((response) => {
            if (typeof response != "undefined") {
                if (response.status === true) {
                    delete files[index];
                    this.setState({
                        files
                    });
                    this.props.onComplete(files);
                    toast.success('فایل با موفقیت حذف گزدید');
                } else {
                    toast.error('خطایی رخ داده است.');
                }
            }
        });


    }

    render() {
        // console.log(this.state);
        return (
            <div className='gallery'>
                <label className="gallery-box" htmlFor="upload">
                    {this.state.files.length > 0 && this.state.files.map((file, index) => {
                        return (
                            <div key={index} className='img-box' style={{ height: '200px', width: '200px' }}>
                                {file.percent === 100 &&
                                <IconButton onClick={(event) => this.handleUnlinkFile(event, index)} className='remove-btn animated flash'>
                                    <DeleteForeverIcon />
                                </IconButton>}
                                <div className="img-box-mask" style={{ height: 200 - (file.percent * 2) + 'px', width: '200px'}}/>
                                <div className="img-box-progress">
                                    <Fab onClick={() => this.handleSetCollection(index, false)}  aria-label="save" color={file.collection === true ? 'default': 'primary'}>{ file.percent < 100 ? file.percent : <CheckIcon className='animated flash' />}</Fab>
                                    {file.percent < 100 && <CircularProgress color={"secondary"} className='circle-progress' size={68} />}
                                </div>
                                {file.tag === 'img' && <img className={file.percent === 100 ? 'animated flipInX' : 'animated fadeIn'}  width={200} height={200} key={index} src={ file.address !== '' ? file.address : file.preview}/>}
                                {file.tag === 'video' && <video className={file.percent === 100 ? 'animated flipInY' : 'animated fadeIn'}  controls  width={200} height={200} src={ file.address !== '' ? file.address : file.preview}/>}
                            </div>
                        );
                    })}
                    {this.state.files.length === 0 && <span>انتخاب فایل</span>}
                </label>
                <input accept="image/x-png,image/gif,image/jpeg" className='input-file' id='upload' type="file" onChange={(event) => this.handleSelectedFiles(event)} multiple={true}/>
            </div>
        );
    }
}

export default FileUploader;
