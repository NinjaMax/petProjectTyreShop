import { createContext } from 'react';
import UserStore from '../store/UserStore';
import GoodsStore from '../store/GoodsStore';
import CustomersStore from '../store/CustomersStore';

interface StoreData  {
    user: UserStore, 
    customer: CustomersStore,
    goods: GoodsStore,
    isAuth: boolean,
    isLoading: boolean
  };
  
export const Context = createContext<StoreData | null>(null);
//export const ThemeContext = createContext('light');
export const AuthContext = createContext<boolean | null>(null);