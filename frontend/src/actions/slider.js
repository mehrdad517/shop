import axios from 'axios';

import { SLIDER_SUCCESS, SLIDER_FAILURE, SLIDER_REQUESTING } from '../types';

const API_URL = 'http://localhost:8000/api/slider';

export const fetchSlider = () => async dispatch => {
  dispatch({ type: SLIDER_REQUESTING });

  try {
    const { data } = await axios.get(API_URL);

    /* istanbul ignore next */
    dispatch({ type: SLIDER_SUCCESS, payload: data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: SLIDER_FAILURE, err: err.message });
  }
};

const shouldFetchSlider = state => {
  if (state.slider.readyStatus === 'success') {
    return false;
  }

  return true;
};

export const fetchSliderIfNeeded = () => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchSlider(getState())) return dispatch(fetchSlider());
};
