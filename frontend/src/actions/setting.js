import axios from 'axios';

import {SETTING_SUCCESS, SETTING_FAILURE, SETTING_REQUESTING} from '../types';
import Api from "../api";

export const fetchSetting = () => async dispatch => {
  dispatch({ type: SETTING_REQUESTING });

  try {

    await new Api().setting().then((resp) => {
      dispatch({ type: SETTING_SUCCESS, payload: resp.result });
    }).catch((error) => {
      dispatch({ type: SETTING_FAILURE, err: error });
    });

  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: SETTING_FAILURE, err: err.message });
  }
};

const shouldFetchSetting = state => {
  if (state.setting.readyStatus === 'success') {
    return false;
  }

  return true;
};

export const fetchSettingIfNeeded = () => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchSetting(getState())) return dispatch(fetchSetting());
};
