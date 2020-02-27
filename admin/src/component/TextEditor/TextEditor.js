import React, {Component} from 'react';
import {Editor} from "@tinymce/tinymce-react/lib/es2015/main/ts";
import Api from "../../api";
import {toast} from "react-toastify";


class TextEditor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Editor
                value={this.props.value}
                apiKey={'1iu7rhp54lw7udhv0zn9l9rzyu98jy5w97f742h8zgpt6i5f'}
                init={{
                    setup: (editor) => {
                        editor.ui.registry.addButton('deleteImgBtn', {
                            text: 'حذف عکس',
                            onAction: () => {
                                new Api().unlink({
                                    file: editor.selection.getNode().src,
                                    directory: 'upload'
                                }).then((response) => {
                                    if (typeof response != "undefined") {
                                        if (response.status) {
                                            toast.success('عکس با موفقیت حذف گردید.');
                                            editor.selection.setContent('');
                                        }
                                    }
                                })

                            },
                        });
                    },
                    menubar: false,
                    plugins: 'print preview   searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists  wordcount   imagetools    contextmenu colorpicker textpattern help',
                    toolbar: 'source code | table | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    directionality :"rtl",
                    imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions | deleteImgBtn",
                    images_upload_handler: function (blobInfo, success, failure) {
                        return new Promise((resolve => {
                            const data = new FormData();
                            data.append('file', blobInfo.blob(), blobInfo.filename());
                            data.append('directory', 'upload');
                            new Api().attachment(data).then((response) => {
                                if (typeof response != "undefined") {
                                    resolve(success(response.path));
                                }
                            }).catch((error) => {
                                console.log(error);
                            })
                        }))

                    }
                }}
                onChange={(event) =>  this.props.onChange(event.target.getContent())}
            />
        );
    }
}

export default TextEditor;
