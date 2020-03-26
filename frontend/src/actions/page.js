import { PAGE_SUCCESS, PAGE_FAILURE, PAGE_REQUESTING } from '../types';
import Api from "../api";


export const fetchPage = (id) => async dispatch => {

  dispatch({ type: PAGE_REQUESTING });

  try {

    await new Api().fetchContent(id).then((resp) => {
      dispatch({ type: PAGE_SUCCESS, payload: resp.data });
    }).catch((error) => {
      dispatch({ type: PAGE_FAILURE, err: error });
    });

  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: PAGE_FAILURE, err: err.message });
  }
};

const shouldFetchPage = state => {
  // if page content is a dynamic always true return
  return true;

};

export const fetchPageIfNeeded = (id) => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchPage(getState())) return dispatch(fetchPage(id));
};
