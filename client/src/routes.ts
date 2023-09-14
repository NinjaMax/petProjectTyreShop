import { ADMIN_ROUTE, ADMIN_AUTH_ROUTE, BASKET_ROUTE, CATALOG_TYRES_ROUTE, 
  LOGIN_ROUTE, REGISTRATION_ROUTE, GOODS_ROUTE, 
  MAIN_ROUTE, CONTACT_ROUTE, SEARCH_ROUTE, NOT_FOUND_ROUTE, 
  COMPARISON_ROUTE, FAVORITES_ROUTE, REVIEW_STORE_ROUTE, 
  CATALOG_WHEELS_ROUTE,
  NEWS_ROUTE,
} from './utils/consts';
import Admin from './pages/Admin';
import AdminAuth from './components/auth/AdminAuth';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import CatalogTyresPage from './pages/CatalogTyresPage';
import Contact from './pages/Contact';
import GoodsPage from './pages/Goods';
import Main from './pages/Main';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Compare from './pages/Compare';
import Favorite from './pages/Favorite';
import ReviewStorePage from './pages/ReviewStorePage';
import News from './pages/News';

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    exact: true,
    Component: Admin
  }
 
];
    
export const publicRoutes = [

  {
    path: BASKET_ROUTE,
    exact: true,
    Component: Basket
  },

  {
    path: CATALOG_TYRES_ROUTE,
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: CATALOG_TYRES_ROUTE + 
    '/:season?/:studded?/:type?/:brands?/:width?/:height?/:diameter?/:loadindex?/:speedindex?/:reinforced?/:om?',
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: CATALOG_WHEELS_ROUTE,
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: CATALOG_WHEELS_ROUTE + 
    '/:type?/:brands?/:width?/:diameter?/:boltcount?/:pcd?/:et?/:dia?',
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: SEARCH_ROUTE,
    exact: true,
    Component: Search
  },
  {
    path: NEWS_ROUTE,
    exact: true,
    Component: News
  },
  {
    path: REVIEW_STORE_ROUTE,
    exact: true,
    Component: ReviewStorePage
  },
  {
    path: COMPARISON_ROUTE,
    exact: true,
    Component: Compare
  },
  {
    path: FAVORITES_ROUTE,
    exact: true,
    Component: Favorite
  },
  {
    path: LOGIN_ROUTE,
    exact: true,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    exact: true,
    Component: Auth
  },

  {
    path: CONTACT_ROUTE,
    exact: true,
    Component: Contact
  },
  {
    path: ADMIN_AUTH_ROUTE,
    exact: true,
    Component: AdminAuth
  },
  {
    path: NOT_FOUND_ROUTE,
    exact: true,
    Component: NotFound,
  }, 
  {
    path: '/' + GOODS_ROUTE,
    exact: true,
    Component: GoodsPage
  },

  {
    path: MAIN_ROUTE,
    exact: true,
    Component: Main,
  }, 
];