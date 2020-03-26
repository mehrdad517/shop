import { PAGE_SUCCESS, PAGE_FAILURE, PAGE_REQUESTING } from '../types';

// Export for unit testing
export const initialState = {
  readyStatus: 'invalid',
  loading: true,
  err: null,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAGE_REQUESTING:
      return {
        ...state,
        data: [],
        loading: true
      };
    case PAGE_SUCCESS:
      return {
        ...state,
        readyStatus: 'success',
        loading: false,
        data: action.payload
      };
    case PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        readyStatus: 'failure',
        err: action.err
      };
    default:
      return state;
  }
};
