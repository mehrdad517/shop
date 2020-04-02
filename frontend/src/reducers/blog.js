import { BLOG_SUCCESS, BLOG_FAILURE, BLOG_REQUESTING } from '../types';

// Export for unit testing
export const initialState = {
  readyStatus: 'invalid',
  loading: true,
  err: null,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOG_REQUESTING:
      return {
        ...state,
        loading: true,
        readyStatus: 'request'
      };
    case BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        readyStatus: 'success',
        data: action.payload
      };
    case BLOG_FAILURE:
      return {
        ...state,
        loading: true,
        readyStatus: 'failure',
        err: action.err
      };
    default:
      return state;
  }
};
