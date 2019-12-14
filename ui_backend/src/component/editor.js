import React, {Component} from 'react';

class Editor extends Component {

    isTextSelected(input) {
        var selecttxt = '';
        if (window.getSelection) {
            selecttxt = window.getSelection();
        } else if (document.getSelection) {
            selecttxt = document.getSelection();
        } else if (document.selection) {
            selecttxt = document.selection.createRange().text;
        }

        if (selecttxt == '') {
            return false;
        }
        return true;

    }​
    render() {
        return (
            <div>
                <span onClick={() => console.log(window.getSelection().value) }>تغییر وضعیت</span>
                <br/>
                <br/>
                <br/>
                <br/>
                <label>متن</label>
                <textarea ref='newText' style={{ width: '100%'}}></textarea>
            </div>
        );
    }
}

export default Editor;
