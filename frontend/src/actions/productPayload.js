import axios from 'axios';

import {
  PAYLOAD_PRODUCTS_SUCCESS,
  PAYLOAD_PRODUCTS_FAILURE,
  PAYLOAD_PRODUCTS_REQUESTING
} from '../types';

const API_URL = 'http://localhost:8000/api/products/payload';

export const fetchPayloadProducts = () => async dispatch => {
  dispatch({ type: PAYLOAD_PRODUCTS_REQUESTING });

  try {
    const { data } = await axios.get(API_URL);

    /* istanbul ignore next */
    dispatch({ type: PAYLOAD_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: PAYLOAD_PRODUCTS_FAILURE, err: err.message });
  }
};

const shouldFetchPayloadProducts = state => {
  if (state.payloadProducts.readyStatus === 'success') {
    return false;
  }

  return true;
};

export const fetchPayloadProductsIfNeeded = () => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchPayloadProducts(getState()))
    return dispatch(fetchPayloadProducts());
};
