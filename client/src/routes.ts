import { lazy } from 'react';
//import { lazyLoad } from './services/lazyLoad';
import { ADMIN_ROUTE, ADMIN_AUTH_ROUTE, BASKET_ROUTE, CATALOG_TYRES_ROUTE, 
  LOGIN_ROUTE, REGISTRATION_ROUTE, GOODS_ROUTE, 
  MAIN_ROUTE, CONTACT_ROUTE, SEARCH_ROUTE, NOT_FOUND_ROUTE, 
  COMPARISON_ROUTE, FAVORITES_ROUTE, REVIEW_STORE_ROUTE, 
  CATALOG_WHEELS_ROUTE,
  NEWS_ROUTE,
  DELIVERY_ROUTE,
  DELIVERY_GOODS_ROUTE,
  CAR_SELECT_ROUTE,
  BONUS_ROUTE,
  CUSTOMER_ROUTE,
} from './utils/consts';

//import Admin from './pages/Admin';
//import AdminAuth from './components/auth/AdminAuth';
//import Auth from './pages/Auth';
//import Basket from './pages/Basket';
//import CatalogTyresPage from './pages/CatalogTyresPage';
//import Contact from './pages/Contact';
//import GoodsPage from './pages/Goods';
//import Main from './pages/Main';
//import Search from './pages/Search';
//import NotFound from './pages/NotFound';
//import Compare from './pages/Compare';
//import Favorite from './pages/Favorite';
//import ReviewStorePage from './pages/ReviewStorePage';
//import News from './pages/News';
//import DeliveryPage from './pages/DeliveryPage';
//import DeliveryGoodsPage from './pages/DeliveryGoodsPage';
//import CarSelect from './pages/CarSelect';
//import NewsItemPage from './pages/NewsItemPage';
//import BonusPage from './pages/BonusPage';
//import CustomerSettings from './pages/CustomerSettings';
//import CustomerSales from './pages/CustomerSales';
//import CustomerComments from './pages/CustomerComments';
//const Main = lazyLoad('./pages/Main', 'Main');

const Admin = lazy(() => import('./pages/Admin'));
const AdminAuth = lazy(() => import('./components/auth/AdminAuth'));
//const Auth = lazy(() => import('./pages/Auth'));
const Basket = lazy(() => import('./pages/Basket'));
const CatalogTyresPage = lazy(() => import('./pages/CatalogTyresPage'));
const Contact = lazy(() => import('./pages/Contact'));
const GoodsPage = lazy(() => import('./pages/Goods'));
const Main = lazy(() => import('./pages/Main'));
const Search = lazy(() => import('./pages/Search'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Compare = lazy(() => import('./pages/Compare'));
const Favorite = lazy(() => import('./pages/Favorite'));
const ReviewStorePage = lazy(() => import('./pages/ReviewStorePage'));
const News = lazy(() => import('./pages/News'));
const DeliveryPage = lazy(() => import('./pages/DeliveryPage'));
const DeliveryGoodsPage = lazy(() => import('./pages/DeliveryGoodsPage'));
const CarSelect = lazy(() => import('./pages/CarSelect'));
const NewsItemPage = lazy(() => import('./pages/NewsItemPage'));
const BonusPage = lazy(() => import('./pages/BonusPage'));
const CustomerSettings = lazy(() => import('./pages/CustomerSettings'));
const CustomerSales = lazy(() => import('./pages/CustomerSales'));
const CustomerComments = lazy(() => import('./pages/CustomerComments'));

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    exact: true,
    // async lazy () { 
    //   {let { Admin } = await import('./pages/Admin')
    //   return { Component: Admin };}
    // },  
    //Component: lazyLoad('./pages/Admin', 'Admin') 
    //Component: './pages/Admin',  
    // lazy: async () => {
    //   let { Admin } = await import('./pages/Admin')
    //   return { Component: Admin }
    // },  
    //lazy: () => import('./pages/Admin')
    Component: Admin
  }
];
    
export const publicRoutes = [
  {
    path: '/:ru?' + BASKET_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { Basket }: any = await import('./pages/Basket')
    //   return { Component: Basket }
    // }, 
    //Component: lazyLoad('./pages/Basket', 'Basket') 
    Component: Basket
    //Component: './pages/Basket', 
  },
  {
    path: '/:ru?' + CATALOG_TYRES_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { CatalogTyresPage }: any = await import('./pages/CatalogTyresPage')
    //   return { Component: CatalogTyresPage }
    // }, 
    //Component: lazyLoad('./pages/CatalogTyresPage', 'CatalogTyresPage') 
    Component: CatalogTyresPage
    //Component: './pages/CatalogTyresPage',
  },
  {
    path: '/:ru?' + DELIVERY_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { DeliveryPage }: any = await import('./pages/DeliveryPage')
    //   return { Component: DeliveryPage }
    // }, 
    //Component: lazyLoad('./pages/DeliveryPage', 'DeliveryPage') 
    Component: DeliveryPage
    //Component: './pages/DeliveryPage'
  },
  {
    path: '/:ru?' + BONUS_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { BonusPage }: any = await import('./pages/BonusPage')
    //   return { Component: BonusPage }
    // }, 
    //Component: lazyLoad('./pages/BonusPage', 'BonusPage') 
    //Component: './pages/BonusPage'
    Component: BonusPage
  },
  {
    path: CUSTOMER_ROUTE + '/sales',
    exact: true,
    // lazy: async () => {
    //   let { CustomerSales }: any = await import('./pages/CustomerSales')
    //   return { Component: CustomerSales }
    // }, 
    //Component: lazyLoad('./pages/CustomerSales', 'CustomerSales') 
    //Component: './pages/CustomerSales'
    Component: CustomerSales
  },
  {
    path: CUSTOMER_ROUTE + '/comments',
    exact: true,
    // lazy: async () => {
    //   let { CustomerComments }: any = await import('./pages/CustomerComments')
    //   return { Component: CustomerComments }
    // }, 
    //Component: lazyLoad('./pages/CustomerComments', 'CustomerComments') 
    //Component: './pages/CustomerComments'
    Component: CustomerComments
  },
  {
    path: CUSTOMER_ROUTE + '/settings',
    exact: true,
    // lazy: async () => {
    //   let { CustomerSettings }: any = await import('./pages/CustomerSettings')
    //   return { Component: CustomerSettings }
    // }, 
    //Component: lazyLoad('./pages/CustomerSettings', 'CustomerSettings') 
    //Component: './pages/CustomerSettings'
    Component: CustomerSettings
  },
  {
    path: '/:ru?' + DELIVERY_GOODS_ROUTE + '/:region',
    exact: true,
    // lazy: async () => {
    //   let { DeliveryGoodsPage }: any = await import('./pages/DeliveryGoodsPage')
    //   return { Component: DeliveryGoodsPage }
    // }, 
    //Component: lazyLoad('./pages/DeliveryGoodsPage', 'DeliveryGoodsPage')
    //Component: './pages/DeliveryGoodsPage' 
    Component: DeliveryGoodsPage
  },
  {
    path: '/:ru?' + CATALOG_TYRES_ROUTE + 
    '/:season?/:studded?/:type?/:brands?/:width?/:height?/:diameter?/:loadindex?/:speedindex?/:reinforced?/:om?',
    exact: true,
    // lazy: async () => {
    //   let { CatalogTyresPage }: any = await import('./pages/CatalogTyresPage')
    //   return { Component: CatalogTyresPage }
    // }, 
    //Component: './pages/CatalogTyresPage' 
    //Component: lazyLoad('./pages/CatalogTyresPage', 'CatalogTyresPage') 
    Component: CatalogTyresPage
  },
  {
    path: '/:ru?' + CATALOG_WHEELS_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { CatalogTyresPage }: any = await import('./pages/CatalogTyresPage')
    //   return { Component: CatalogTyresPage }
    // }, 
    //Component: lazyLoad('./pages/CatalogTyresPage', 'CatalogTyresPage')
    //Component: './pages/CatalogTyresPage' 
    Component: CatalogTyresPage
  },
  {
    path: '/:ru?' + CATALOG_WHEELS_ROUTE + 
    '/:type?/:brands?/:width?/:diameter?/:boltcount?/:pcd?/:et?/:dia?',
    exact: true,
    // lazy: async () => {
    //   let { CatalogTyresPage }: any = await import('./pages/CatalogTyresPage')
    //   return { Component: CatalogTyresPage }
    // }, 
    //Component: lazyLoad('./pages/CatalogTyresPage', 'CatalogTyresPage')
    //Component: './pages/CatalogTyresPage' 
    Component: CatalogTyresPage
  },
  {
    path: CAR_SELECT_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { CarSelect }: any = await import('./pages/CarSelect')
    //   return { Component: CarSelect }
    // }, 
    //Component: lazyLoad('./pages/CarSelect', 'CarSelect') 
    //Component: './pages/CarSelect'
    Component: CarSelect
  },
  {
    path: '/:ru?' + SEARCH_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { Search }: any = await import('./pages/Search')
    //   return { Component: Search }
    // }, 
    //Component: lazyLoad('./pages/Search', 'Search') 
    //Component: './pages/Search'
    Component: Search
  },
  {
    path: '/:ru?' + NEWS_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { News }: any = await import('./pages/News')
    //   return { Component: News }
    // }, 
    //Component: lazyLoad('./pages/News', 'News')
    //Component: './pages/News' 
    Component: News
  },
  {
    path: '/:ru?' + NEWS_ROUTE + '/:articles',
    exact: true,
    // lazy: async () => {
    //   let { NewsItemPage }: any = await import('./pages/NewsItemPage')
    //   return { Component: NewsItemPage }
    // }, 
    //Component: lazyLoad('./pages/NewsItemPage', 'NewsItemPage')
    //Component: './pages/NewsItemPage' 
    Component: NewsItemPage
  },
  {
    path: '/:ru?' + REVIEW_STORE_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { ReviewStorePage }: any = await import('./pages/ReviewStorePage')
    //   return { Component: ReviewStorePage }
    // }, 
    //Component: lazyLoad('./pages/ReviewStorePage', 'ReviewStorePage')
    //Component: './pages/ReviewStorePage' 
    Component: ReviewStorePage
  },
  {
    path: '/:ru?' + COMPARISON_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { Compare }: any = await import('./pages/Compare')
    //   return { Component: Compare }
    // }, 
    //Component: lazyLoad('./pages/Compare', 'Compare')
    //Component: './pages/Compare' 
    Component: Compare
  },
  {
    path: '/:ru?' + FAVORITES_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { Favorite }: any = await import('./pages/Favorite')
    //   return { Component: Favorite }
    // }, 
    //Component: lazyLoad('./pages/Favorite', 'Favorite') 
    //Component: './pages/Favorite'
    Component: Favorite
  },
  // {
  //   path: LOGIN_ROUTE,
  //   exact: true,
  //   Component: Auth
  // },
  // {
  //   path: REGISTRATION_ROUTE,
  //   exact: true,
  //   Component: Auth
  // },
  {
    path: '/:ru?' + CONTACT_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { Contact }: any = await import('./pages/Contact')
    //   return { Component: Contact }
    // }, 
    //Component: lazyLoad('./pages/Contact', 'Contact') 
    //Component: './pages/Contact'
    Component: Contact
  },
  {
    path: ADMIN_AUTH_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { AdminAuth }: any = await import('./components/auth/AdminAuth')
    //   return { Component: AdminAuth }
    // }, 
    //Component: lazyLoad('./components/auth/AdminAuth', 'AdminAuth')
    //Component: './components/auth/AdminAuth', 
    Component: AdminAuth
  },
  
  {
    path: MAIN_ROUTE + 'ru',
    exact: true,
    // lazy: async () => {
    //   let { Main }: any = await import('./pages/Main')
    //   return { Component: Main }
    // }, 
    //Component: lazyLoad('./pages/Main', 'Main') 
    //Component: './pages/Main' 
    Component: Main,
  }, 
  {
    path: NOT_FOUND_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { NotFound }: any = await import('./pages/NotFound')
    //   return { Component: NotFound }
    // }, 
    //Component: lazyLoad('./pages/NotFound', 'NotFound') 
    //Component: './pages/NotFound'
    Component: NotFound,
  }, 
  {
    path: '/:ru?/' + GOODS_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { GoodsPage }: any = await import('./pages/Goods')
    //   return { Component: GoodsPage }
    // }, 
    //Component: lazyLoad('./pages/Goods', 'GoodsPage') 
    //Component: './pages/Goods' 
    Component: GoodsPage
  },
  {
    path: MAIN_ROUTE,
    exact: true,
    // lazy: async () => {
    //   let { Main }: any = await import('./pages/Main')
    //   return { Component: Main }
    // }, 
    //async lazy() {
      //let  Main: any = lazy(() => import('./pages/Main'))
      //let  Main = lazyLoad('./pages/Main', 'Main')
      //return {Component: Main}
    //} 
    name: 'Main',
    //component: '../pages/Main'
    Component: Main,
  }, 
];