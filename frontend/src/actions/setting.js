import axios from 'axios';

import { SETTING_SUCCESS, SETTING_FAILURE, SETTING_REQUESTING } from '../types';

const API_URL = 'http://localhost:8000/api/setting';

export const fetchSetting = () => async dispatch => {
  dispatch({ type: SETTING_REQUESTING });

  try {
    const { data } = await axios.get(API_URL);

    /* istanbul ignore next */
    dispatch({ type: SETTING_SUCCESS, payload: data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: SETTING_FAILURE, err: err.message });
  }
};

const shouldFetchSetting = state => {
  if (state.setting.readyStatus === 'success') return true;

  return true;
};

export const fetchSettingIfNeeded = () => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchSetting(getState())) return dispatch(fetchSetting());
};
