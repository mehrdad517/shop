/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';


import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import config from '../config';
// Import your global styles here
// import '../static/Font/fonts.css';
import '../static/Farsi-Digits/font-face.css';
import '../static/css/animate.css';
import './styles.scss';

const theme = createMuiTheme({
  direction: "rtl",
  overrides: {
    MuiListItem: {
      root: {
        paddingTop: '4px',
        paddingBottom: '4px'
      }
    },
    MuiExpansionPanel: {
      root: {
        margin: '10px 0 !important'
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        borderBottom: '1px solid var(--border_color)',
        minHeight: '44px !important'
      },
      content: {
        fontFamily: 'Shabnam',
        fontSize: '14px',
        padding: 0,
        margin: '10px 0 !important'
      },

    },
    MuiTypography:{
      root: {
        fontFamily: 'Shabnam !important',
        fontSize: '13px !important'
      }
    },
    MuiFab: {
      root: {
        fontFamily: 'Shabnam'
      }
    },
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      label: {
        fontFamily: 'Shabnam',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '14px'
      },
    },
    MuiFormHelperText: {
      contained: {
        margin: '10px 0 0 0'
      }
    },
    MuiDialogContent : {
      root: {
        '&:first-child': {
          paddingTop: 0
        }
      },
    }
  },
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = ({ route }) => (
  <StylesProvider jss={jss}>
    <MuiThemeProvider theme = { theme }>
    <Helmet {...config.app} />
    {/* Child routes won't render without this */}
    {renderRoutes(route.routes)}
    </MuiThemeProvider>
  </StylesProvider>
);

export default hot(module)(App);
