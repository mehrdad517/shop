import axios from 'axios';

import {
  LAST_BLOG_POSTS_SUCCESS,
  LAST_BLOG_POSTS_FAILURE,
  LAST_BLOG_POSTS_REQUESTING, PAGE_SUCCESS, PAGE_FAILURE
} from '../types';
import Api from "../api";

export const fetchLastBlogPosts = () => async dispatch => {
  dispatch({ type: LAST_BLOG_POSTS_REQUESTING });

  try {

    await new Api().blog({page: 1, limit: 6}).then((resp) => {
      dispatch({ type: LAST_BLOG_POSTS_SUCCESS, payload: resp.result.contents.data });
    }).catch((error) => {
      dispatch({ type: LAST_BLOG_POSTS_FAILURE, err: error });
    });

  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: LAST_BLOG_POSTS_FAILURE, err: err.message });
  }
};

const shouldFetchLastBlogPosts = state => {
  if (state.lastBlogPosts.readyStatus === 'success') {
    return false;
  }

  return true;
};

export const fetchLastBlogPostsIfNeeded = () => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchLastBlogPosts(getState()))
    return dispatch(fetchLastBlogPosts());
};
