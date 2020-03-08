import {
  SETTING_SUCCESS,
  SETTING_FAILURE,
  SETTING_REQUESTING,
  SETTING_CHANGE_CATEGORY_EXPANDED,
} from '../types';

// Export for unit testing
export const initialState = {
  readyStatus: 'invalid',
  err: null,
  categoryExpanded: [],
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SETTING_REQUESTING:
      return {
        ...state,
        readyStatus: 'request'
      };
    case SETTING_SUCCESS:
      return {
        ...state,
        readyStatus: 'success',
        data: action.payload
      };
    case SETTING_FAILURE:
      return {
        ...state,
        readyStatus: 'failure',
        err: action.err
      };
    case SETTING_CHANGE_CATEGORY_EXPANDED:
      return {
        ...state,
        categoryExpanded: action.payload
      };
    default:
      return state;
  }
};
