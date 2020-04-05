/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

import {
  createMuiTheme,
  MuiThemeProvider,
  StylesProvider,
  jssPreset
} from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';

import { ToastContainer } from 'react-toastify';

import config from '../config';
// Import your global styles here
import '../static/Farsi-Digits/font-face.css';
import '../static/css/animate.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './styles.scss';
import {AUTH_LOGIN} from "../types";

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#00bfd6',
      contrastText: '#fff'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#ff1c26',
      main: '#ff0074',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff'
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  },
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
      }
    },
    MuiTypography: {
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
        fontFamily: 'Shabnam'
      }
    },
    MuiInputBase: {
      root: {
        fontFamily: 'Shabnam !important'
      },
      input: {
        fontSize: '14px',
        font: 'Shabnam !important'
      }
    },
    MuiFormHelperText: {
      contained: {
        margin: '10px 0 0 0'
      }
    },
    MuiChip: {
      root: {
        fontFamily: 'Shabnam !important',
        fontSize: '12px',
        fontWeight: 'normal'
      }
    },
    MuiDialogContent: {
      root: {
        '&:first-child': {
          paddingTop: 0
        }
      }
    },
    MuiAlert: {
      root: {
        fontFamily: 'Shabnam !important'
      }
    }
  }
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


const App = ({ route }) => (
  <StylesProvider jss={jss}>
    <MuiThemeProvider theme={theme}>
      <Helmet {...config.app} />
      {/* Child routes won't render without this */}
      {renderRoutes(route.routes)}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
      />
    </MuiThemeProvider>
  </StylesProvider>
);

export default hot(module)(App);
