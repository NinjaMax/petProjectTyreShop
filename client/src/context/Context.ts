import { createContext } from 'react';
import { StoreData } from '../store/interfaces/StoreData.interface';
  
export const Context = createContext<StoreData | null>(null);
//export const ThemeContext = createContext('light');
export const AuthContext = createContext<boolean | null>(null);