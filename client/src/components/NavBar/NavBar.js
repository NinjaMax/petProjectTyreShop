import {React, useState} from 'react';
import '../../css/NavBarCss/NavBar.css';
import logoShop from '../../assets/logoShop/sampleQ_4_302_100.png';
//import {Context} from '../index';
import { observer } from 'mobx-react-lite';
import ButtonSearch from '../Buttons/ButtonSearch';
import BasketNavBar from '../Basket/BasketNavBar';
import AuthView from '../Auth/AuthView';
import NavBarDropTyres from './NavBarDropTyres';
import AuthForm from '../Auth/AuthForm';
import FavoriteGoods from '../UX/FavoriteGoods';
import Modal from '../Modal/Modal';
import NavBarSearch from '../SearchForm/NavBarSearch';


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
    <a href='/'>
      <img href='/' src={logoShop} alt='logoShop'/>
    </a>
    <NavBarDropTyres/>
    <NavBarDropTyres/>
    <NavBarDropTyres/>
    <a href="/#home" className='anchorBtn'>Доставка і оплата</a>
    <a href='/contact' className='anchorBtn'>Контакти</a>
    <span href="/#home">067 777 77 77</span>
    <span href="/#">Більше</span>
    <ButtonSearch clickSearchBtn={clickSearchBtn}/>
    {searchBtn? 
      <NavBarSearch searchBtn={searchBtn} clickSearchBtn={clickSearchBtn}/>
    :null}
    <FavoriteGoods/>
    <AuthView setActive={authActive}/>
    {activeAuth ?
      <Modal active={activeAuth} setActive={authActive}>
        <AuthForm />
      </Modal>
    :null}
    <BasketNavBar setActive={openBasket}/>
  </div>

    );
});
export default NavBar;