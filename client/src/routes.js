import { ADMIN_ROUTE, BASKET_ROUTE, CATALOG_TYRES_ROUTE, 
  LOGIN_ROUTE, REGISTRATION_ROUTE, GOODS_ROUTE, 
  MAIN_ROUTE, CONTACT_ROUTE} from './utils/consts';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import CatalogTyres from './pages/CatalogTyres';
import Contact from './pages/Contact';
import Goods from './pages/Goods';
import Main from './pages/Main';

export const authRoutes = [
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
    Component: CatalogTyres
  },
  {
    path: GOODS_ROUTE,
    //path: GOODS_ROUTE + '/:tyres',
    Component: Goods
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
  }

];