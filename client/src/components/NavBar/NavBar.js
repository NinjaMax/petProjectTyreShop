import React from 'react';
//import {Context} from '../index';
import { observer } from 'mobx-react-lite';
import ButtonSearch from '../Buttons/ButtonSearch';
import logoShop from '../../assets/logoShop/logoSkyshina302_100.png';
import BasketNavBar from '../Basket/BasketNavBar';
import AuthView from '../Auth/AuthView';
import NavBarDropTyres from './NavBarDropTyres';
import '../../css/NavBarCss/NavBar.css';
import FavoriteGoods from '../UX/FavoriteGoods';


const NavBar = observer(() => {
    //const {user} = useContext(Context);

  return (

  <div className="navbar">
    <img href='/#' src={logoShop} alt='logoShop'/>
    <NavBarDropTyres/>
    <NavBarDropTyres/>
    <NavBarDropTyres/>
    <a href="/#home">Доставка і оплата</a>
    <a href="/#home">Контакти</a>
    <span href="/#home">067 777 77 77</span>
    <span href="/#news">Більше</span>
    <ButtonSearch/>
    <FavoriteGoods/>
    <AuthView/>
    <BasketNavBar/>
  </div>

    );
});
export default NavBar;