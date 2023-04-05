import { createContext } from 'react';
import UserStore from '../store/UserStore';
import GoodsStore from '../store/GoodsStore';

interface StoreData  {
    user: UserStore, 
    goods: GoodsStore,
    isAuth: boolean,
    isLoading: boolean
  };
  
export const Context = createContext<StoreData | null>(null);
//export const ThemeContext = createContext('light');
export const AuthContext = createContext<boolean | null>(null);