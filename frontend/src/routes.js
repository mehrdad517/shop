/* @flow */

import App from './app';
import {asyncHome, asyncShop, NotFound, asyncSinglePage, asyncBlog} from './pages';
import {blogAction, lastBlogPortsAction, pageAction, settingAction, shopAction, sliderAction} from './actions';

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
        path: '/blog',
        exact: true,
        component: asyncBlog, // Add your route here
        loadData: (params) => [
          blogAction.blogIfNeeded()
        ]
      },
      {
        path: '/blog/post/:id/:slug?',
        exact: true,
        component: asyncSinglePage, // Add your route here
        loadData: (params) => [
          pageAction.fetchPageIfNeeded(params.id)
        ]
      },
      {
        path: '/page/:id',
        exact: true,
        component: asyncSinglePage, // Add your route here
        loadData: (params) => [
          pageAction.fetchPageIfNeeded(params.id)
        ]
      },
      {
        component: NotFound
      }
    ]
  }
];
