import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import GoodsTyreStore from './store/GoodsTyreStore';
import { Context } from './context/Context';
import CustomersStore from './store/CustomersStore';
import GoodsWheelStore from './store/GoodsWheelStore';
import GoodsBatteryStore from './store/GoodsBatteryStore';
import GoodsOilStore from './store/GoodsOilStore';
import PageStore from './store/PageStore';
import FilterStore from './store/FilterStore';

const rootElement = document.getElementById("root") as HTMLElement;
if (rootElement.hasChildNodes()) {
  ReactDOMClient.hydrateRoot(rootElement, 
    <Context.Provider value={{
      user: new UserStore(),
      goodsTyre: new GoodsTyreStore(),
      goodsWheel: new GoodsWheelStore(),
      goodsBattery: new GoodsBatteryStore(),
      goodsOil: new GoodsOilStore(),
      customer: new CustomersStore(),
      page: new PageStore(),
      filter: new FilterStore(),
      isAuth: false,
      isLoading: true, 
    }}>
      <App/>
    </Context.Provider>,
  );
} else {
  ReactDOMClient.createRoot(rootElement).render(
    <Context.Provider value={{
      user: new UserStore(),
      goodsTyre: new GoodsTyreStore(),
      goodsWheel: new GoodsWheelStore(),
      goodsBattery: new GoodsBatteryStore(),
      goodsOil: new GoodsOilStore(),
      customer: new CustomersStore(),
      page: new PageStore(),
      filter: new FilterStore(),
      isAuth: false,
      isLoading: true, 
    }}>
      <App/>
    </Context.Provider>,
  );
}




