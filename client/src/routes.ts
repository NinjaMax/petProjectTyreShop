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
import DeliveryPage from './pages/DeliveryPage';
import DeliveryGoodsPage from './pages/DeliveryGoodsPage';
import CarSelect from './pages/CarSelect';
import NewsItemPage from './pages/NewsItemPage';
import BonusPage from './pages/BonusPage';
import CustomerSettings from './pages/CustomerSettings';
import CustomerSales from './pages/CustomerSales';
import CustomerComments from './pages/CustomerComments';

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    exact: true,
    Component: Admin
  }
 
];
    
export const publicRoutes = [

  {
    path: '/:ru?' + BASKET_ROUTE,
    exact: true,
    Component: Basket
  },
  {
    path: '/:ru?' + CATALOG_TYRES_ROUTE,
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: '/:ru?' + DELIVERY_ROUTE,
    exact: true,
    Component: DeliveryPage
  },
  {
    path: '/:ru?' + BONUS_ROUTE,
    exact: true,
    Component: BonusPage
  },
  {
    path: CUSTOMER_ROUTE + '/sales',
    exact: true,
    Component: CustomerSales
  },
  {
    path: CUSTOMER_ROUTE + '/comments',
    exact: true,
    Component: CustomerComments
  },
  {
    path: CUSTOMER_ROUTE + '/settings',
    exact: true,
    Component: CustomerSettings
  },
  {
    path: '/:ru?' + DELIVERY_GOODS_ROUTE + '/:region',
    exact: true,
    Component: DeliveryGoodsPage
  },
  {
    path: '/:ru?' + CATALOG_TYRES_ROUTE + 
    '/:season?/:studded?/:type?/:brands?/:width?/:height?/:diameter?/:loadindex?/:speedindex?/:reinforced?/:om?',
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: '/:ru?' + CATALOG_WHEELS_ROUTE,
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: CATALOG_WHEELS_ROUTE + 
    '/:ru?/:type?/:brands?/:width?/:diameter?/:boltcount?/:pcd?/:et?/:dia?',
    exact: true,
    Component: CatalogTyresPage
  },
  {
    path: CAR_SELECT_ROUTE,
    exact: true,
    Component: CarSelect
  },
  {
    path: '/:ru?' + SEARCH_ROUTE,
    exact: true,
    Component: Search
  },
  {
    path: '/:ru?' + NEWS_ROUTE,
    exact: true,
    Component: News
  },
  {
    path: '/:ru?' + NEWS_ROUTE + '/:articles',
    exact: true,
    Component: NewsItemPage
  },
  {
    path: '/:ru?' + REVIEW_STORE_ROUTE,
    exact: true,
    Component: ReviewStorePage
  },
  {
    path: '/:ru?' + COMPARISON_ROUTE,
    exact: true,
    Component: Compare
  },
  {
    path: '/:ru?' + FAVORITES_ROUTE,
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
    path: '/:ru?' + CONTACT_ROUTE,
    exact: true,
    Component: Contact
  },
  {
    path: ADMIN_AUTH_ROUTE,
    exact: true,
    Component: AdminAuth
  },
  {
    path: MAIN_ROUTE + 'ru',
    exact: true,
    Component: Main,
  }, 
  {
    path: NOT_FOUND_ROUTE,
    exact: true,
    Component: NotFound,
  }, 
  {
    path: '/:ru?/' + GOODS_ROUTE,
    exact: true,
    Component: GoodsPage
  },
  {
    path: MAIN_ROUTE,
    exact: true,
    Component: Main,
  }, 
];