import {
  BLOG_SUCCESS,
  BLOG_FAILURE,
  BLOG_REQUESTING
} from '../types';

// Export for unit testing
export const initialState = {
  readyStatus: 'invalid',
  err: null,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOG_REQUESTING:
      return {
        ...state,
        readyStatus: 'request'
      };
    case BLOG_SUCCESS:
      return {
        ...state,
        readyStatus: 'success',
        data: action.payload
      };
    case BLOG_FAILURE:
      return {
        ...state,
        readyStatus: 'failure',
        err: action.err
      };
    default:
      return state;
  }
};
