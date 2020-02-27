import { SLIDER_SUCCESS, SLIDER_FAILURE, SLIDER_REQUESTING } from '../types';

// Export for unit testing
export const initialState = {
  readyStatus: 'invalid',
  err: null,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SLIDER_REQUESTING:
      return {
        ...state,
        readyStatus: 'request'
      };
    case SLIDER_SUCCESS:
      return {
        ...state,
        readyStatus: 'success',
        data: action.payload
      };
    case SLIDER_FAILURE:
      return {
        ...state,
        readyStatus: 'failure',
        err: action.err
      };
    default:
      return state;
  }
};
