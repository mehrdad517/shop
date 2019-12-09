import Api from "../api";
import {UPDATE_SETTING} from "../actionTypes";



export function stickySetting() {
    return function (dispatch) {
        new Api().stickySetting().then((response) => {
            dispatch({'type' : UPDATE_SETTING, 'payload' : response});
        }).catch((error) => {
            console.log(error);
        })
    }
}




