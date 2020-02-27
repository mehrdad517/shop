/* @flow */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import setting from './setting';
import lastBlogPosts from './lastBlogPosts';
import slider from './slider';
import payloadProducts from "./payloadProducts";
import shop from './shop'

const reducers = {
  shop,
  setting,
  slider,
  payloadProducts,
  lastBlogPosts
};

export default history =>
  combineReducers({ router: connectRouter(history), ...reducers });
