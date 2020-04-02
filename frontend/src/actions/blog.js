import {
  BLOG_SUCCESS,
  BLOG_FAILURE, BLOG_REQUESTING,
} from '../types';
import Api from '../api';

export const blog = (params, category, tag) => async dispatch => {

  dispatch({ type: BLOG_REQUESTING });

  try {

    if (category) {
      await new Api().blogCategory(category, params)
        .then(resp => {
          if (resp.status) {
            dispatch({ type: BLOG_SUCCESS, payload: resp.result });
          }
        })
        .catch(error => {
          dispatch({ type: BLOG_FAILURE, err: error });
        });
    } else if (tag) {
      await new Api().blogTag(tag, params)
        .then(resp => {
          if (resp.status) {
            dispatch({ type: BLOG_SUCCESS, payload: resp.result });
          }
        })
        .catch(error => {
          dispatch({ type: BLOG_FAILURE, err: error });
        });
    } else {
      await new Api().blog(params)
        .then(resp => {
          if (resp.status) {
            dispatch({ type: BLOG_SUCCESS, payload: resp.result });
          }
        })
        .catch(error => {
          dispatch({ type: BLOG_FAILURE, err: error });
        });
    }

  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: BLOG_FAILURE, err: err.message });
  }
};

const shouldFetchBlog = state => {
  return true;
};

export const blogIfNeeded = (params, category, tag) => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchBlog(getState())) {
    return dispatch(blog(params, category, tag));
  }
};
