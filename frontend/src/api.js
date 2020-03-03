import axios from "axios";
import {toast} from 'react-toastify';
import {env} from "./env";

class Api {

  headers() {
    let token = '';

    return {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }

  // check response after receive
  async dispatchResponse(response) {
    if (typeof response != "undefined") {
      if (response.status === 401) {
        toast.error('مجددا وارد شوید.');
        localStorage.removeItem('persist:root');
        window.location.reload();
      } else {
        toast.error(response.statusText);
      }
    } else {
      toast.error('خطای سرور');
    }
  }

  /* auth api*/
  async login(object) {
    return axios.post( env.API[window.location.host]+ `/login`, object, {
      headers: this.headers(),
    }).then( (response) => {
      return response.data;
    }).catch((error) => {
      return this.dispatchResponse(error.response)
    })
  }

  async verify(object) {
    return  axios.post( env.API[window.location.host]+ `/verify`, object, {
      headers: this.headers()
    }).then((response) => {
      return response.data;
    }).catch((error) => {
      return this.dispatchResponse(error.response)
    })
  }


}

export default Api;
