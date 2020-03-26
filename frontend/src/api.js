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
      } else if(response.status === 404) {
        window.location.href = '/404.html';
      } else {
        toast.error(response.statusText);
      }
    } else {
      toast.error('خطای سرور');
    }
  }

  /**
   * ----------------------------------------------------------------
   * domain api
   * ----------------------------------------------------------------
   */


  async setting(object) {
    return  axios.get( env.API[window.location.host]+ `/setting`, {
      headers: this.headers(),
      params: object
    }).then((response) => {
      return response.data;
    }).catch((error) => {
      return this.dispatchResponse(error.response)
    })
  }


  /**
   * ---------------------------------------------------------------
   *  end domain
   * ---------------------------------------------------------------
   */

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

  // verify login
  async verify(object) {
    return  axios.post( env.API[window.location.host]+ `/verify`, object, {
      headers: this.headers()
    }).then((response) => {
      return response.data;
    }).catch((error) => {
      return this.dispatchResponse(error.response)
    })
  }


  /**
   * ----------------------------------------------------------------
   * blog api
   * ----------------------------------------------------------------
   */


  async blog(object) {
    return  axios.get( env.API[window.location.host]+ `/blog`, {
      headers: this.headers(),
      params: object
    }).then((response) => {
      return response.data;
    }).catch((error) => {
      return this.dispatchResponse(error.response)
    })
  }

  async fetchContent(id) {
    return  axios.get( env.API[window.location.host]+ `/blog/content/${id}`, {
      headers: this.headers()
    }).then((response) => {
      return response.data;
    }).catch((error) => {
      return this.dispatchResponse(error.response)
    })
  }

  /**
   * ---------------------------------------------------------------
   *  end blog
   * ---------------------------------------------------------------
   */


}

export default Api;
