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
  getGoogleCurUser,
  signUpCustomer,
  logInCustm,
  getCurCustomer,
  signInFacebook,
  getFacebookCurUser
} from '../../restAPI/restUsersApi';
import AuthSignUp from '../auth/AuthSignUp';

const NavBar = observer(() => {
  const {customer} = useContext<any | null>(Context);
  const [signUp, setSignUp] = useState(false);
  const [activeAuth, setActiveAuth] = useState(false);
  const [googleIsAuth, setGoogleIsAuth] = useState('');
  const [activeAuthConfirm, setAuthConfirm] = useState(false);
  const [searchBtn, setSearchBtn] = useState(false);
  const [activeBasket, setActiveBasket] = useState(false);
  const [isPassSend, setPassSend] = useState(false);
  const [isMatchPass, setIsMatchPass] = useState(false);
  const [smsPass, setSmsPass] = useState<number | null>(null);
  const [phoneTel, setPhoneTel] = useState<bigint | undefined>();
  const [facebookIsAuth, setFacebookIsAuth] = useState('');

  useEffect(() => {
    let isUser = false;
    const socialSignIn = async () => {
      const authGoogle = await signInGoogle();
      const authFacebook = await signInFacebook();
      if(authGoogle && !isUser) {
        setGoogleIsAuth(authGoogle);
        console.log('SET_GOOGLE_AUTH: ', authGoogle)
      } 
      if (authFacebook && !isUser){
        setFacebookIsAuth(authFacebook);
      } 
      // else {
      //   console.log('ПОМИЛКА СЕРВІСА');
      // }
    }
    socialSignIn();
    return () => {isUser = true}
    //}
  },[])

  useEffect(() => {
    let isCurUser = false;
    const getCurUser = async () => {
      const curGoogleUser = await getGoogleCurUser();
      const curFacebookUser = await getFacebookCurUser();
      const curCustm = await getCurCustomer();
      console.log('CURRENT_USER', curCustm)
      if(curGoogleUser && !isCurUser) {
        customer.setIsAuth(true);
        customer.setUser(curGoogleUser);
      }
      if(curCustm && !isCurUser) {
        customer.setIsAuth(true);
        customer.setUser(curCustm);
      }
      if(curFacebookUser && !isCurUser) {
        customer.setIsAuth(true);
        customer.setUser(curFacebookUser);
      }
    }
    getCurUser();
    return () => {isCurUser = true}
  },[customer])

  useEffect(() => {
    if(isPassSend) {
      setTimeout(() => setPassSend(false), 118000);
    }
  },[isPassSend])

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

  const signActiveUp = () => {
    setSignUp(!signUp);
  }

  const preSignUpAuth = async (telnumber: bigint) => {

    console.log('TEL NUMBER: ', telnumber);
    try {
      setPhoneTel(telnumber);
      const sendPass = await preSignUpUser(telnumber);
      console.log('SEND SMS: ', sendPass);
      if (sendPass) {
        setPassSend(!isPassSend);
        setSmsPass(sendPass);
      } else {
        console.log(`Помилка номера. Або користувач з номером ${telnumber} вже існує.`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const matchGetPass = async (passFromTel: number) => {
    const matchPass = await matchPassSms(smsPass!, passFromTel);
    console.log('PASS_TEL: ', passFromTel);
    console.log('MATCH PASS: ', matchPass);
    console.log('SMS: ', smsPass)
    if (matchPass) {
      setIsMatchPass(!isMatchPass);
      setAuthConfirm(!activeAuthConfirm); 
      setSignUp(!signUp);
    } else {

    } 
  }

  const logOutUser = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
  const signUpCustm = async (dataSignIn: any) => {
    try {
      await signUpCustomer(dataSignIn);
      console.log( 'SIGN_UP_DATA: ', dataSignIn);
    } catch (error) {
      console.log('SIGN_UP_ERROR', error);
    }
  }

  const logInCustomer = async (dataLogIn: any) => {
    try {
      await logInCustm(dataLogIn);
    } catch (error) {
      console.log('LOGIN_ERROR', error);
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
    <a href="/home" className='anchorBtn'>Доставка і оплата</a>
    <a href='/contact' className='anchorBtn'>Контакти</a>
    <span data-href="/home">067 777 77 77</span>
    <span data-href="/">Більше</span>
    <ButtonSearch clickSearchBtn={clickSearchBtn}/>
    {searchBtn? 
      <NavBarSearch searchBtn={searchBtn} clickSearchBtn={clickSearchBtn}/>
    :null}
    <FavoriteGoods/>
    {customer._isAuth ?
      <AuthView logOutUser={logOutUser}/>
      : <span className='enterAuthNavBar' onClick={authActive}>
          Вхід / Реєстрація
        </span>
    }
    {activeAuth ?
      <Modal active={activeAuth} setActive={authActive}>
        <AuthForm confirmActive={authActiveConfirm}
          socialGoogle={googleIsAuth}
          socialFacebook={facebookIsAuth}
          logIn={logInCustomer}
        />
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
      <Modal active={signUp} setActive={signActiveUp}>
        <AuthSignUp phoneNumber={phoneTel}
          signUpAuth={signUpCustm}
        />
      </Modal> 
      :null
    }
    <BasketNavBar setActive={openBasket}/>
  </div>
  );
});
export default NavBar;