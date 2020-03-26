import {
  SETTING_SUCCESS,
  SETTING_FAILURE,
  SETTING_REQUESTING,
  SETTING_CHANGE_categoryExpanded,
  SETTING_CHANGE_menuExpanded,
  SETTING_CHANGE_footerExpanded,
  SETTING_CHANGE_blogExpanded,
} from '../types';

// Export for unit testing
export const initialState = {
  readyStatus: 'invalid',
  err: null,
  menuExpanded: [],
  blogExpanded: [],
  footerExpanded: [],
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
    case SETTING_CHANGE_categoryExpanded:
      return {
        ...state,
        categoryExpanded: action.payload
      };
    case SETTING_CHANGE_menuExpanded:
      return {
        ...state,
        menuExpanded: action.payload
      };
    case SETTING_CHANGE_footerExpanded:
      return {
        ...state,
        footerExpanded: action.payload
      };
    case SETTING_CHANGE_blogExpanded:
      return {
        ...state,
        blogExpanded: action.payload
      };
    default:
      return state;
  }
};
