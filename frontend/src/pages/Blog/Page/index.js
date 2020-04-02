/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../../components';

const Page = loadable(() => import('./Page'), {
  fallback: <Loading />
});

export default props => (
  <ErrorBoundary>
    <Page {...props} />
  </ErrorBoundary>
);
