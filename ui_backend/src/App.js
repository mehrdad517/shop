import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import {Route} from 'react-router-dom';
import Product from './pages/product'
import Permission from './pages/userBundle/acl/permission'

import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import 'shabnam-font/dist/font-face.css';


import './assets/styles/style.scss'


function App() {
  return (
      <Provider store={store}>
              <Route component={Product} path='/' exact={true} />
              <Route component={Permission} path='/permission' exact={true} />
      </Provider>
  );
}

export default App;
