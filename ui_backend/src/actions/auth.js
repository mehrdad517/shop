import Api from "../api";
import {UPDATE_SETTING} from "../actionTypes";



export function AuthSetting(domain) {
    return function (dispatch) {
        new Api().booleanSetting(domain).then((response) => {
            dispatch({'type' : UPDATE_SETTING, 'payload' : response});
        }).catch((error) => {
            console.log(error);
        })
    }
}




