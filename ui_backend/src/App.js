import React from 'react';
import {Provider} from "react-redux";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore, { history } from './store'
import {ToastContainer} from "react-toastify";
import Router from "./pages/router";
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import './assets/Farsi-Digits/font-face.css'

const theme = createMuiTheme({
    direction: "rtl",
    overrides: {
        MUIRichTextEditor: {
            root: {
                padding: '20px 0',
                width: "100%",
            },
            editor: {
                fontFamily: 'Shabnam',
            }
        },
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            text: {
                // Some CSS
                color: 'red',
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

const {store, persistor} = configureStore();

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StylesProvider jss={jss}>
                    <MuiThemeProvider theme = { theme }>
                        <Router />
                        <ToastContainer
                            position="top-left"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl
                            pauseOnVisibilityChange
                            draggable={false}
                            pauseOnHover />
                    </MuiThemeProvider>
                </StylesProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
