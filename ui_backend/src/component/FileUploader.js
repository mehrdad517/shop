import React, {Component} from 'react';
import {toast} from "react-toastify";
import Api from "../api";
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import {CircularProgress} from "@material-ui/core";
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
                files[i]['address'] = response;
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
            <div >
                <input onChange={this.handleSelectedFiles} type='file' multiple={true}/>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', marginTop: '15px'}}>
                    {this.state.files.length > 0 && this.state.files.map((file, index) => {
                        return(
                            <div style={{ position: 'relative'}}>
                                {/*<span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '30px', color: "#fff", fontWeight: 'bold' }}>{file.percent} %</span>*/}
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <Fab style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                                        aria-label="save"
                                        color="primary"
                                    >
                                        {file.percent < 100 ? file.percent : <CheckIcon />}
                                    </Fab>
                                    {file.percent < 100 && <CircularProgress color={"secondary"} style={{
                                        position: 'absolute',
                                        top: -6,
                                        right: -6,
                                        zIndex: 1}} size={68} />}
                                </div>

                                <img style={{ margin: '10px', borderRadius: '15px' }} width={200} height={200} key={index} src={file.address !== '' ? 'http://localhost:8000/storage/' + file : file.preview}/>
                                <div style={{ backgroundColor: '#000', height: '200px', borderRadius: '15px'}}>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default FileUploader;
