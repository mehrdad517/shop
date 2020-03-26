import axios from 'axios';

import {
  BLOG_SUCCESS,
  BLOG_FAILURE,
  BLOG_REQUESTING, PAGE_SUCCESS, PAGE_FAILURE
} from '../types';
import Api from "../api";

export const blog = (category, params) => async dispatch => {

  // dispatch({ type: BLOG_REQUESTING });

  try {
    await new Api().blog(params).then((resp) => {
      if (resp.status) {
        dispatch({ type: BLOG_SUCCESS, payload: resp.result });
      }
    }).catch((error) => {
      dispatch({ type: BLOG_FAILURE, err: error });
    });

  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: BLOG_FAILURE, err: err.message });
  }
};

const shouldFetchBlog = state => {
  return true;
};

export const blogIfNeeded = (category, params) => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchBlog(getState())) {
    return dispatch(blog(category, params));
  }
};
