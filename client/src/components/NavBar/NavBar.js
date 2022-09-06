import {React, useState} from 'react';
import '../../css/NavBarCss/NavBar.css';
//import {Context} from '../index';
import { observer } from 'mobx-react-lite';
import ButtonSearch from '../Buttons/ButtonSearch';
import logoShop from '../../assets/logoShop/logoSkyshina302_100.png';
import BasketNavBar from '../Basket/BasketNavBar';
import AuthView from '../Auth/AuthView';
import NavBarDropTyres from './NavBarDropTyres';
import AuthForm from '../Auth/AuthForm';
import FavoriteGoods from '../UX/FavoriteGoods';
import Modal from '../Modal/Modal';
import NavBarSearch from '../SearchForm/NavBarSearch';
import BasketOrder from '../Basket/BasketOrder';


const NavBar = observer(() => {
    //const {user} = useContext(Context);
  const [activeAuth, setActiveAuth] = useState(false);
  const [searchBtn, setSearchBtn] = useState(false);
  const [activeBasket, setActiveBasket] = useState(false);

  const openBasket = () => {
    setActiveBasket(!activeBasket)
  }

  const authActive = () => {
    setActiveAuth(!activeAuth)
  }

  const clickSearchBtn = () => {
    setSearchBtn(!searchBtn)
  }

  return (

  <div className="navbar">
    <img href='/' src={logoShop} alt='logoShop'/>
    <NavBarDropTyres/>
    <NavBarDropTyres/>
    <NavBarDropTyres/>
    <a href="/#home">Доставка і оплата</a>
    <a href="/#home">Контакти</a>
    <span href="/#home">067 777 77 77</span>
    <span href="/#news">Більше</span>
    <ButtonSearch clickSearchBtn={clickSearchBtn}/>
    {searchBtn? 
      <NavBarSearch searchBtn={searchBtn} clickSearchBtn={clickSearchBtn}/>
    :null}
    <FavoriteGoods/>
    <AuthView/>
    {activeAuth ?
      <Modal active={activeAuth} setActive={authActive}>
        <AuthForm/>
      </Modal>
    :null}
    <BasketNavBar/>
    { activeBasket ?
      <Modal active={activeBasket} setActive={openBasket}>
        <BasketOrder/>
      </Modal>
    :null}
  </div>

    );
});
export default NavBar;