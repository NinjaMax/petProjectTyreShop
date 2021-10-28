import Basket from '../pages/Basket';
import { ADMIN_ROUTE, BASKET_ROUTE } from './consts';
import Admin from './pages/Admin';

export const authRoutes = [
  {
      path: ADMIN_ROUTE,
      Component: Admin
  },
  {
      path: BASKET_ROUTE,
      Component: Basket
  }  
];
    
export const publicRoutes = [

];