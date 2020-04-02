/* @flow */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Master from '../../components/Layouts/master';

export default ({ staticContext }) => {
  // We have to check if staticContext exists
  // because it will be undefined if rendered through a BrowserRoute
  /* istanbul ignore next */
  if (staticContext) staticContext.status = '404'; // eslint-disable-line no-param-reassign

  return (
    <>
      <Helmet title="Oops" />
      <Container>
        <Grid item xs={12}>
          <div className="NotFound">
            <h1>صفحه‌ای که دنبال آن بودید پیدا نشد!</h1>
            <h2>Oops, Page was not found!</h2>
            <img style={{ width: '100%'}} src={require('../../static/Img/404.png')} />
            <Link to="/">
              <Button variant="outlined">صفحه اصلی</Button>
            </Link>
          </div>
        </Grid>
      </Container>
    </>
  );
};
