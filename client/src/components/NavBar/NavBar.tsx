import React, {useContext, useState} from 'react';
import '../../css/NavBarCss/NavBar.css';
import logoShop from '../../assets/logoShop/logoSample_1_302_100.png';
import { observer } from 'mobx-react-lite';
import ButtonSearch from '../buttons/ButtonSearch';
import BasketNavBar from '../basket/BasketNavBar';
import AuthView from '../auth/AuthView';
import NavBarDropTyres from './NavBarDropTyres';
import AuthForm from '../auth/AuthForm';
import FavoriteGoods from '../ux/FavoriteGoods';
import Modal from '../modal/Modal';
import NavBarSearch from '../searchForm/NavBarSearch';
import { Context } from '../../context/Context';
import AuthConfirmTel from '../auth/AuthConfirmTel';


const NavBar = observer(() => {
  const {user} = useContext<any | null>(Context);
  
  const [activeAuth, setActiveAuth] = useState(false);
  const [activeAuthConfirm, setAuthConfirm] = useState(false);
  const [searchBtn, setSearchBtn] = useState(false);
  const [activeBasket, setActiveBasket] = useState(false);

  const openBasket = () => {
    setActiveBasket(!activeBasket)
  }

  const authActive = () => {
    setActiveAuth(!activeAuth)
  }

  const authActiveConfirm = () => {
    setAuthConfirm(!activeAuthConfirm)
  }

  const clickSearchBtn = () => {
    setSearchBtn(!searchBtn)
  }

  return (

  <div className="navbar">
    <a href='/'>
      <img data-href='/' src={logoShop} alt='logoShop'/>
    </a>
    <NavBarDropTyres/>
    <NavBarDropTyres/>
    <NavBarDropTyres/>
    <a href="/#home" className='anchorBtn'>Доставка і оплата</a>
    <a href='/contact' className='anchorBtn'>Контакти</a>
    <span data-href="/#home">067 777 77 77</span>
    <span data-href="/#">Більше</span>
    <ButtonSearch clickSearchBtn={clickSearchBtn}/>
    {searchBtn? 
      <NavBarSearch searchBtn={searchBtn} clickSearchBtn={clickSearchBtn}/>
    :null}
    <FavoriteGoods/>
    <AuthView setActive={authActive}/>
    {activeAuth ?
      <Modal active={activeAuth} setActive={authActive}>
        <AuthForm confirmActive={authActiveConfirm}/>
      </Modal>
    :null}
    {activeAuthConfirm ?
      <Modal active={activeAuthConfirm} 
        setActive={authActiveConfirm}>
        <AuthConfirmTel/>
      </Modal>
      : null
    }
    <BasketNavBar setActive={openBasket}/>
  </div>

    );
});
export default NavBar;