/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../components';
import {CircularProgress} from "@material-ui/core";

const Shop = loadable(() => import('./Shop'), {
  fallback: <Loading />
});

export default props => (
  <ErrorBoundary>
    <Shop {...props} />
  </ErrorBoundary>
);
