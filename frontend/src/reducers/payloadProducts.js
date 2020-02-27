import { PAYLOAD_PRODUCTS_SUCCESS, PAYLOAD_PRODUCTS_FAILURE, PAYLOAD_PRODUCTS_REQUESTING } from '../types';

// Export for unit testing
export const initialState = {
  readyStatus: 'invalid',
  err: null,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAYLOAD_PRODUCTS_REQUESTING:
      return {
        ...state,
        readyStatus: 'request'
      };
    case PAYLOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        readyStatus: 'success',
        data: action.payload
      };
    case PAYLOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        readyStatus: 'failure',
        err: action.err
      };
    default:
      return state;
  }
};
