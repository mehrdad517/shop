import axios from 'axios';

import {
  LAST_BLOG_POSTS_SUCCESS,
  LAST_BLOG_POSTS_FAILURE,
  LAST_BLOG_POSTS_REQUESTING
} from '../types';

const API_URL = 'http://localhost:8000/api/blog/lastBlogPosts';

export const fetchLastBlogPosts = () => async dispatch => {
  dispatch({ type: LAST_BLOG_POSTS_REQUESTING });

  try {
    const { data } = await axios.get(API_URL);

    /* istanbul ignore next */
    dispatch({ type: LAST_BLOG_POSTS_SUCCESS, payload: data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: LAST_BLOG_POSTS_FAILURE, err: err.message });
  }
};

const shouldFetchLastBlogPosts = state => {
  if (state.lastBlogPosts.readyStatus === 'success') return true;

  return true;
};

export const fetchLastBlogPostsIfNeeded = () => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchLastBlogPosts(getState()))
    return dispatch(fetchLastBlogPosts());
};
