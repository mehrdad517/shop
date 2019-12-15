import React, {Component} from 'react';
import {toast} from "react-toastify";

class ImgUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files :[]
        }
    }

    handleSelectedFiles = (event) => {

        let files = this.state.files;

        for (let i = 0 ; i < event.target.files.length ; i++) {
            if (event.target.files[i].type === 'image/jpeg') {
                files[i] = URL.createObjectURL(event.target.files[i]);
            } else {
                toast.error(event.target.files[i].type + ' is invalid');
            }
        }

        this.setState({
            files
        });

    };

    render() {
        console.log(this.state)
        return (
            <div>
                <input onChange={this.handleSelectedFiles} type='file' multiple={true}/>
                {this.state.files.length > 0 && this.state.files.map((file, index) => {
                    return(
                        <img width={200} height={200} key={index} src={file}/>
                    );
                })}
            </div>
        );
    }
}

export default ImgUploader;