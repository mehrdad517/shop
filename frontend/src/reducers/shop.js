import { SHOP_SUCCESS, SHOP_FAILURE, SHOP_REQUESTING } from '../types';

// Export for unit testing
export const initialState = {
  readyStatus: 'invalid',
  loading: true,
  err: null,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOP_REQUESTING:
      return {
        ...state,
        loading: true
      };
    case SHOP_SUCCESS:
      return {
        ...state,
        readyStatus: 'success',
        loading: false,
        data: action.payload
      };
    case SHOP_FAILURE:
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
