/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from './../../components';

const Blog = loadable(() => import('./Blog'), {
  fallback: <Loading />
});

export default props => (
  <ErrorBoundary>
    <Blog {...props} />
  </ErrorBoundary>
);
