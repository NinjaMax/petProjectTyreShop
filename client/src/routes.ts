import { ADMIN_ROUTE, ADMIN_AUTH_ROUTE, BASKET_ROUTE, CATALOG_TYRES_ROUTE, 
  LOGIN_ROUTE, REGISTRATION_ROUTE, GOODS_ROUTE, 
  MAIN_ROUTE, CONTACT_ROUTE} from './utils/consts';
import Admin from './pages/Admin';
import AdminAuth from './components/auth/AdminAuth';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import CatalogTyresPage from './pages/CatalogTyresPage';
import Contact from './pages/Contact';
import GoodsPage from './pages/Goods';
import Main from './pages/Main';

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  }
 
];
    
export const publicRoutes = [

  {
    path: BASKET_ROUTE,
    Component: Basket
  },
  {
    path: CATALOG_TYRES_ROUTE,
    Component: CatalogTyresPage
  },
  {
    path: GOODS_ROUTE,
    //path: GOODS_ROUTE + '/:tyres',
    Component: GoodsPage
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: MAIN_ROUTE,
    Component: Main
  }, 
  {
    path: CONTACT_ROUTE,
    Component: Contact
  },
  {
    path: ADMIN_AUTH_ROUTE,
    Component: AdminAuth
  }

];