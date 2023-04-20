import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import GoodsStore from './store/GoodsStore';
import { Context } from './context/Context';
import CustomersStore from './store/CustomersStore';

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOMClient.createRoot(rootElement).render(
  <Context.Provider value={{
    user: new UserStore(),
    goods: new GoodsStore(),
    customer: new CustomersStore(),
    isAuth: false,
    isLoading: true, 
  }}>
    <App/>
  </Context.Provider>,
  
);




