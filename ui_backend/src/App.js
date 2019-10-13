import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import {Route} from 'react-router-dom';

import UserList from './pages/userBundle/user/list';
import Permission from './pages/userBundle/acl/permission'

import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import 'shabnam-font/dist/font-face.css';


import './assets/styles/style.scss'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from '@material-ui/styles';

const muiTheme = createMuiTheme({
    tooltip: {
        color: '#f1f1f1',
        rippleBackgroundColor: 'blue'
    },
});


function App() {
    return (
        <ThemeProvider theme={muiTheme}>
            <Provider store={store}>
                <Route component={UserList} path='/users' />
                <Route component={Permission} path='/users/acl' />
            </Provider>
        </ThemeProvider>


    );
}

export default App;
