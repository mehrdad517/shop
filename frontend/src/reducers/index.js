/* @flow */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import setting from './setting';
import blog from './blog';
import slider from './slider';
import payloadProducts from './payloadProducts';
import shop from './shop';
import page from './page';
import auth from './auth';

const reducers = {
  setting,
  slider,
  shop,
  page,
  payloadProducts,
  blog,
  auth
};

export default history =>
  combineReducers({ router: connectRouter(history), ...reducers });
