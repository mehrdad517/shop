import axios from 'axios';

import { SHOP_SUCCESS, SHOP_FAILURE, SHOP_REQUESTING } from '../types';

const API_URL = 'http://localhost:8000/api/products/filter/';

export const fetchShop = (categories,parameters) => async dispatch => {

  dispatch({ type: SHOP_REQUESTING });

  try {

    const { data } = await axios.get(API_URL + categories, {
      params: parameters
    });

    /* istanbul ignore next */
    dispatch({ type: SHOP_SUCCESS, payload: data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: SHOP_FAILURE, err: err.message });
  }
};

const shouldFetchShop = state => {
  return true;
};

export const fetchShopIfNeeded = (categories, parameters) => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchShop(getState())) return dispatch(fetchShop(categories, parameters));
};
