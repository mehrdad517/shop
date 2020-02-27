import {
  LAST_BLOG_POSTS_SUCCESS,
  LAST_BLOG_POSTS_FAILURE,
  LAST_BLOG_POSTS_REQUESTING
} from '../types';

// Export for unit testing
export const initialState = {
  readyStatus: 'invalid',
  err: null,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LAST_BLOG_POSTS_REQUESTING:
      return {
        ...state,
        readyStatus: 'request'
      };
    case LAST_BLOG_POSTS_SUCCESS:
      return {
        ...state,
        readyStatus: 'success',
        data: action.payload
      };
    case LAST_BLOG_POSTS_FAILURE:
      return {
        ...state,
        readyStatus: 'failure',
        err: action.err
      };
    default:
      return state;
  }
};
