import React, { createContext } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import GoodsStore from './store/GoodsStore';

interface StoreData  {user: UserStore, goods: GoodsStore};

export const Context = createContext<StoreData | null>(null);

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOMClient.createRoot(rootElement).render(
  <Context.Provider value={{
    user: new UserStore(),
    goods: new GoodsStore(),
  }}>
    <App/>
  </Context.Provider>,
  
);




