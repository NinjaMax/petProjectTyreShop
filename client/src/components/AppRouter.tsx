import React, { Suspense, useContext, lazy } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Context } from '../context/Context';
import { observer } from 'mobx-react-lite';
import SpinnerCarRot from './spinners/SpinnerCarRot';
import { ADMIN_ROUTE, ADMIN_AUTH_ROUTE, BASKET_ROUTE, CATALOG_TYRES_ROUTE, 
    GOODS_ROUTE, 
  MAIN_ROUTE, CONTACT_ROUTE, SEARCH_ROUTE, NOT_FOUND_ROUTE, 
  COMPARISON_ROUTE, FAVORITES_ROUTE, REVIEW_STORE_ROUTE, 
  CATALOG_WHEELS_ROUTE,
  NEWS_ROUTE,
  DELIVERY_ROUTE,
  DELIVERY_GOODS_ROUTE,
  CAR_SELECT_ROUTE,
  BONUS_ROUTE,
  CUSTOMER_ROUTE,
} from '../utils/consts';

const Admin = lazy(() => import('../pages/Admin'));
const AdminAuth = lazy(() => import('../components/auth/AdminAuth'));
const Basket = lazy(() => import('../pages/Basket'));
const CatalogTyresPage = lazy(() => import('../pages/CatalogTyresPage'));
const Contact = lazy(() => import('../pages/Contact'));
const GoodsPage = lazy(() => import('../pages/Goods'));
const Main = lazy(() => import('../pages/Main'));
const Search = lazy(() => import('../pages/Search'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Compare = lazy(() => import('../pages/Compare'));
const Favorite = lazy(() => import('../pages/Favorite'));
const ReviewStorePage = lazy(() => import('../pages/ReviewStorePage'));
const News = lazy(() => import('../pages/News'));
const DeliveryPage = lazy(() => import('../pages/DeliveryPage'));
const DeliveryGoodsPage = lazy(() => import('../pages/DeliveryGoodsPage'));
const CarSelect = lazy(() => import('../pages/CarSelect'));
const NewsItemPage = lazy(() => import('../pages/NewsItemPage'));
const BonusPage = lazy(() => import('../pages/BonusPage'));
const CustomerSettings = lazy(() => import('../pages/CustomerSettings'));
const CustomerSales = lazy(() => import('../pages/CustomerSales'));
const CustomerComments = lazy(() => import('../pages/CustomerComments'));

const AppRouter = observer(() => {
    const {user} = useContext<any | null>(Context);

    return (
        <Suspense fallback={<SpinnerCarRot/>}>
        <Switch>
            
            {user.isAuth &&
            // adminRoutes.map(({path, Component, exact}) => 
            <Route 
                //key={path} 
                path={ADMIN_ROUTE} 
                component={Admin} 
                //lazy={lazy}
                exact={true}
            />
            // )
            }
            {/* {publicRoutes.map(({path, Component, name, exact}) =>  */}
            <Route 
                //key={path} 
                path={'/:ru?' + BASKET_ROUTE} 
                component={Basket} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + CATALOG_TYRES_ROUTE} 
                component={CatalogTyresPage} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + DELIVERY_ROUTE} 
                component={DeliveryPage} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + BONUS_ROUTE} 
                component={BonusPage} 
                exact={true}
            />
            <Route 
                path={CUSTOMER_ROUTE + '/sales'} 
                component={CustomerSales} 
                exact={true}
            />
            <Route 
                path={CUSTOMER_ROUTE + '/comments'} 
                component={CustomerComments} 
                exact={true}
            />
            <Route 
                path={CUSTOMER_ROUTE + '/settings'} 
                component={CustomerSettings} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + DELIVERY_GOODS_ROUTE + '/:region'} 
                component={DeliveryGoodsPage} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + CATALOG_TYRES_ROUTE + 
                '/:season?/:studded?/:type?/:brands?/:width?/:height?/:diameter?/:loadindex?/:speedindex?/:reinforced?/:om?'} 
                component={CatalogTyresPage} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + CATALOG_WHEELS_ROUTE} 
                component={CatalogTyresPage} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + CATALOG_WHEELS_ROUTE + '/:type?/:brands?/:width?/:diameter?/:boltcount?/:pcd?/:et?/:dia?'} 
                component={CatalogTyresPage} 
                exact={true}
            />
            <Route 
                path={CAR_SELECT_ROUTE} 
                component={CarSelect} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + SEARCH_ROUTE} 
                component={Search} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + NEWS_ROUTE} 
                component={News} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + NEWS_ROUTE + '/:articles'} 
                component={NewsItemPage} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + REVIEW_STORE_ROUTE} 
                component={ReviewStorePage} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + COMPARISON_ROUTE} 
                component={Compare} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + FAVORITES_ROUTE} 
                component={Favorite} 
                exact={true}
            />
            <Route 
                path={'/:ru?' + CONTACT_ROUTE} 
                component={Contact} 
                exact={true}
            />
            <Route 
                path={ADMIN_AUTH_ROUTE} 
                component={AdminAuth} 
                exact={true}
            />
            <Route 
                path={MAIN_ROUTE + 'ru'} 
                component={Main} 
                exact={true}
            />
            <Route 
                path={NOT_FOUND_ROUTE} 
                component={NotFound} 
                exact={true}
            />
            <Route 
                path={`/:ru?/${GOODS_ROUTE}`} 
                component={GoodsPage} 
                exact={true}
            />
            <Route 
                path={MAIN_ROUTE} 
                component={Main} 
                exact={true}
            />
             {/* )
            } */}
            
            <Redirect to={MAIN_ROUTE}/>
        </Switch>
        </Suspense>
    );
});

export default AppRouter;