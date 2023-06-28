import { ADMIN_ROUTE, ADMIN_AUTH_ROUTE, BASKET_ROUTE, CATALOG_TYRES_ROUTE, 
  LOGIN_ROUTE, REGISTRATION_ROUTE, GOODS_ROUTE, 
  MAIN_ROUTE, CONTACT_ROUTE, SEARCH_ROUTE, NOT_FOUND_ROUTE} from './utils/consts';
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
    path: CATALOG_TYRES_ROUTE + '/:category',
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: CATALOG_TYRES_ROUTE,
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: SEARCH_ROUTE,
    exact: true,
    Component: Search
  },
  // {
  //   path: GOODS_ROUTE,
  //   exact: false,
  //   Component: GoodsPage
  // },
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