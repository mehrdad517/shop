import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default () => {
  return <CircularProgress style={{ position:'fixed', transform: 'translate(-50px, -50px)', top: '50%', left: '50%'}} color="secondary" size={20} />;
};
