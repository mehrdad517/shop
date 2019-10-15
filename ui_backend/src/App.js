import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import {Route} from 'react-router-dom';

import UserList from './pages/userBundle/user/list';

import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import 'shabnam-font/dist/font-face.css';


import './assets/styles/style.scss'
import Acl from "./pages/userBundle/acl/acl";
import MainLayout from "./pages/layout/main";



function App() {
    return (
            <Provider store={store}>
                <MainLayout>
                    <Route component={UserList} path='/users' exact={true} />
                    <Route component={Acl} path='/users/acl' />
                </MainLayout>
            </Provider>
    );
}

export default App;
