/* @flow */

import App from './app';
import {asyncHome, asyncShop, NotFound} from './pages';
import {lastBlogPortsAction, settingAction, shopAction, sliderAction} from './actions';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncHome, // Add your route here
        loadData: () => [
          settingAction.fetchSettingIfNeeded(),
          // lastBlogPortsAction.fetchLastBlogPostsIfNeeded(),
          // sliderAction.fetchSliderIfNeeded()
        ]
      },
      {
        path: '/products/:categories',
        exact: true,
        component: asyncShop, // Add your route here
        loadData: () => [
          shopAction.fetchShopIfNeeded()
        ]
      },
      {
        component: NotFound
      }
    ]
  }
];
