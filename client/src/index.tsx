import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import GoodsTyreStore from './store/GoodsTyreStore';
import { Context } from './context/Context';
import CustomersStore from './store/CustomersStore';
import GoodsWheelStore from './store/GoodsWheelStore';
import GoodsBatteryStore from './store/GoodsBatteryStore';
import GoodsOilStore from './store/GoodsOilStore';
import PageStore from './store/PageStore';

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOMClient.createRoot(rootElement).render(
  <Context.Provider value={{
    user: new UserStore(),
    goodsTyre: new GoodsTyreStore(),
    goodsWheel: new GoodsWheelStore(),
    goodsBattery: new GoodsBatteryStore(),
    goodsOil: new GoodsOilStore(),
    customer: new CustomersStore(),
    page: new PageStore(),
    isAuth: false,
    isLoading: true, 
  }}>
    <App/>
  </Context.Provider>,
  
);




