import React, {Component} from 'react';
import {toast} from "react-toastify";
import Api from "../api";
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import {CircularProgress} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
class FileUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
        this.api = new Api();
    }

    /* Trigger On Change Input File */
    handleSelectedFiles = (event) => {

        /* Fetch All File In State */
        let files = this.state.files;

        for (let i = 0 ; i < event.target.files.length ; i++) {

            /* Init State */
            files[i] = {
                'percent' : 0,
                'preview': '',
                'address': ''
            };

            /* File extension that accepted */
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];

            /* Video format accepted*/
            const validVideoTypes = ['video/mp4'];

            if (validImageTypes.includes(event.target.files[i].type)) {
                files[i]['tag'] = 'img';
            } else if (validVideoTypes.includes(event.target.files[i].type)) {
                files[i]['tag'] = 'video';
            } else {
                toast.error('فرمت فایل نامعتبر است.');
                return false;
            }


            /* Preview Image Or Video File with Absolute Address */
            files[i]['preview'] = URL.createObjectURL(event.target.files[i]);

            const form_data = new FormData();

            /* Append New File */
            form_data.append('file', event.target.files[i]);

            /* Send Post Request To Server */
            axios.post('http://localhost:8000/api/attachment', form_data , {


                onUploadProgress: (e) => {
                    const done = e.loaded;
                    const total =e.total;
                    /* Calculate Percent  */
                    files[i]['percent'] = ( Math.floor(done / total * 1000 ) / 10 );

                    this.setState({
                        files
                    });
                },
                headers: {
                    headers: {
                        'Accept': 'application/json',
                        'content-type':'multipart/form-data',
                    }
                },
            }).then( (response) => {
                /* Get Real Address From Server */
                files[i]['address'] = response.data;
            }).catch((error) => {
                toast.error(error.message);
            })
        }

        this.setState({
            files
        });

    };

    render() {
        console.log(this.state);
        return (
            <div style={{width: '100%'}}>
                <label style={{width: '100%', 'minHeight': '260px', backgroundColor: 'rgba(0,0,0,.1)',display:'flex',justifyContent:'center',alignItems:'center',color:'black',fontSize:'17px',border:'2px dashed rgb(12, 163, 255)'}}
                       htmlFor="upload">
                    <Box component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', marginTop: '15px'}}>
                        {this.state.files.length > 0 && this.state.files.map((file, index) => {
                            return (
                                <div key={index} style={{ position: 'relative', margin: '10px', backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: '15px' }}>
                                    <div style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                        height: 200 - (file.percent * 2) + 'px',
                                        width: '200px',
                                        borderRadius: '15px',
                                        top: 0,
                                        position: 'absolute'
                                    }}/>
                                    <div  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                                        <Fab aria-label="save" color="primary">
                                            {file.percent < 100 ? file.percent : <CheckIcon className='animated flash' />}
                                        </Fab>
                                        {file.percent < 100 && <CircularProgress color={"secondary"} style={{position: 'absolute', top: -6, right: -6, zIndex: 1}} size={68} />}
                                    </div>
                                    {file.tag === 'img' && <img style={{  borderRadius: '15px' }} width={200} height={200} key={index} src={file.address !== '' ? file.address : file.preview}/>}
                                    {file.tag === 'video' && <video controls  style={{  borderRadius: '15px' }} width={200} height={200} key={index} src={file.address !== '' ? file.address : file.preview}/>}
                                </div>
                            );
                        })}
                    </Box>
                    {this.state.files.length === 0 && <span>انتخاب فایل</span>}
                </label>
                <input style={{opacity: 0, zIndex: -1, position: "absolute"}} id='upload' type="file"
                       onChange={this.handleSelectedFiles} type='file' multiple={true}/>

            </div>
        );
    }
}

export default FileUploader;
