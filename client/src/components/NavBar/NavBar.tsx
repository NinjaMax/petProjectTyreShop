import React, {useContext, useState, useEffect} from 'react';
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
import { 
  preSignUpUser, 
  matchPassSms, 
  signInGoogle, 
  logOut,
  getGoogleCurUser } from '../../restAPI/restUsersApi';
import AuthSignUp from '../auth/AuthSignUp';

const NavBar = observer(() => {
  const {user} = useContext<any | null>(Context);
  
  const [activeAuth, setActiveAuth] = useState(false);
  const [googleIsAuth, setGoogleIsAuth] = useState('');
  const [activeAuthConfirm, setAuthConfirm] = useState(false);
  const [searchBtn, setSearchBtn] = useState(false);
  const [activeBasket, setActiveBasket] = useState(false);
  const [isPassSend, setPassSend] = useState(false);
  const [isMatchPass, setIsMatchPass] = useState(false);
  const [smsPass, setSmsPass] = useState<number | null>(null);

  useEffect(() => {
    let isUser = true;
    const googleSignIn = async () => {
      const authGoogle = await signInGoogle();
      if(authGoogle && isUser) {
        setGoogleIsAuth(authGoogle.data);
      } else {
        console.log('ПОМИЛКА СЕРВІСА');
      }
    }
      googleSignIn()
    return () => {isUser = false}
    //}
  },[])

  useEffect(() => {
    let isCurUser = true;
    const googleCurUser = async () => {
      const curUser = await getGoogleCurUser();
      if(curUser && isCurUser) {
        user.setIsAuth(true);
        user.setUser(curUser.data)
      }
    }
    googleCurUser();
    return () => {isCurUser = false}
  },[user])

  const openBasket = () => {
    setActiveBasket(!activeBasket);
  }

  const authActive = () => {
    setActiveAuth(!activeAuth);
  }

  const authActiveConfirm = () => {
    setAuthConfirm(!activeAuthConfirm);
  }

  const clickSearchBtn = () => {
    setSearchBtn(!searchBtn);
  }

  const preSignUpAuth = async (telnumber: bigint) => {

    console.log('TEL NUMBER: ',telnumber);
    try {
      const sendPass = await preSignUpUser(telnumber);
      console.log('SEND SMS: ', sendPass);
      if (sendPass) {
        setPassSend(!isPassSend);
        setSmsPass(sendPass);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const matchGetPass = async (passFromTel: number) => {
    const matchPass = await matchPassSms(smsPass!, passFromTel);
    console.log('MATCH PASS: ', matchPass);
    if (matchPass) {
      setIsMatchPass(!isMatchPass);
      setAuthConfirm(!activeAuthConfirm);  
    }  
  }



  const logOutUser = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
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
    {user._isAuth ?
      <AuthView userData={user} logOutUser={logOutUser}/>
      : <span onClick={authActive}>Вхід / Реєстрація</span>
    }
    {activeAuth ?
      <Modal active={activeAuth} setActive={authActive}>
        <AuthForm confirmActive={authActiveConfirm}
          socialGoogle={googleIsAuth}/>
      </Modal>
    : null
    }
    {activeAuthConfirm ?
      <Modal active={activeAuthConfirm} 
        setActive={authActiveConfirm}>
        <AuthConfirmTel 
          preSignUp ={preSignUpAuth}
          isSendSms={isPassSend}
          matchUserPass={matchGetPass}
        />
      </Modal>
      : null
    }
    {isMatchPass ?
      <AuthSignUp/>
      :null
    }
    <BasketNavBar setActive={openBasket}/>
  </div>
  );
});
export default NavBar;