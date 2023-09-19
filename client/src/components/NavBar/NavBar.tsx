import React, {useContext, useState, useEffect} from 'react';
import '../../css/NavBarCss/NavBar.css';
import logoShop from '../../../public/logoSky300.png';
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
  getFacebookCurUser,
  signInTwitter,
  getTwitterCurUser
} from '../../restAPI/restUsersApi';
import AuthSignUp from '../auth/AuthSignUp';
import { yieldToMain } from '../../restAPI/yieldMain';
import NavBarDropWheels from './NavBarDropWheels';
import { getCompare, getFavorites, getSession } from '../../restAPI/restGoodsApi';
import CompareGoods from '../ux/CompareGoods';
import { COMPARISON_ROUTE, FAVORITES_ROUTE } from '../../utils/consts';

const NavBar = observer(() => {
  const {customer, page, goodsTyre} = useContext<any | null>(Context);
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
  const [twitterIsAuth, setTwitterIsAuth] = useState('');
  const [formError, setFormError] = useState('');
  const [favoritesCount, setFavoritesCount] = useState<number | null>();
  const [comparisonCount, setComparisonCount] = useState<number | null>();

  useEffect(() => {
    let isUser = false;
    const socialSignIn = async () => {
      const taskSocial: any[] = [
        signInGoogle,
        signInFacebook,
        signInTwitter,       
      ];
      let i:number = 0;
      while(taskSocial.length > i) {
        if(!isUser && taskSocial[i] === signInGoogle) {
          let authGoogle: any = await taskSocial[i]();
          setGoogleIsAuth(authGoogle);
          console.log('SET_GOOGLE_AUTH: ', authGoogle)
        } 
        if (!isUser && taskSocial[i] === signInFacebook){
          let authFacebook: any = await taskSocial[i]();
          setFacebookIsAuth(authFacebook);
          console.log('SET_FACEBOOK_AUTH: ', authFacebook)
        }
        if (!isUser && taskSocial[i] === signInTwitter){
          let authTwitter: any = await taskSocial[i]();
          setTwitterIsAuth(authTwitter);
          console.log('SET_TWITTER_AUTH: ', authTwitter)
        }
        const task = taskSocial.shift();
        task();
        await yieldToMain(); 
      }
    }
    socialSignIn();
    return () => {isUser = true}
  },[])

  useEffect(() => {
    let isCurUser = false;
    const getCurUser = async () => {
      const taskCustm: any[] = [
        getGoogleCurUser,
        getFacebookCurUser,
        getCurCustomer,
        getTwitterCurUser,
        getSession,
      ];
      let i:number = 0;
      while(taskCustm.length > i) {
        let curCustm: any = await taskCustm[i]();
        console.log(`CURR_CUSTM: `, curCustm);
        if (!isCurUser && curCustm) {
          customer.setIsAuth(true);
          customer.setUser(curCustm);
        }
        const task = taskCustm.shift();
        task();
        await yieldToMain();
      }
    }
    getCurUser();
    return () => {isCurUser = true}
  },[customer])

  useEffect(() => {
    let isMounted = false;
    const getFavoriteCompare = async () => {
      const taskFavorite: any[] = [
        getCompare,
        getFavorites,
      ];
      let i:number = 0;
      while(taskFavorite.length > i) {
        if (!isMounted && taskFavorite[i] === getCompare) {
          let curComparison: any = await taskFavorite[i]();
          console.log('CURRENT_COMPARISON: ', curComparison)
          //setComparisonCount(curComparison.length);
          page.setComparisonCount(curComparison);
          
        }
        if (!isMounted && taskFavorite[i] === getFavorites) {
          let curFavorites: any = await taskFavorite[i]();
          console.log('CURRENT_FAVORITES: ', curFavorites)
          page.setFavoritesCount(curFavorites);
          //setFavoritesCount(curFavorites.length);
        }
        const task = taskFavorite.shift();
        task();
        await yieldToMain();
      }
    }
    getFavoriteCompare();
    return () => {isMounted = true}
  },[page])

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
    console.log('CLOSE NAVBAR SEARCH');
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
    try {
      const matchPass = await matchPassSms(smsPass!, passFromTel);
      console.log('PASS_TEL: ', passFromTel);
      console.log('MATCH PASS: ', matchPass);
      console.log('SMS: ', smsPass)
      if (matchPass) {
        setIsMatchPass(!isMatchPass);
        setAuthConfirm(!activeAuthConfirm); 
        setSignUp(!signUp);
      } 
    } catch (error: any) {
      console.log(error);
    }
  }

  const logOutUser = async () => {
    await logOut();
    customer.setIsAuth(false);
    customer.setUser({});
  }

  const signUpCustm = async (dataSignIn: any) => {
    try {
      await signUpCustomer(dataSignIn);
      console.log( 'SIGN_UP_DATA: ', dataSignIn);
    } catch (error: any) {
      console.log('SIGN_UP_ERROR', error);
      setFormError(error.response.data.message);
    }
  }

  const logInCustomer = async (dataLogIn: any) => {
    try {
      const logInData: boolean = await logInCustm(dataLogIn);
      if(logInData) {
        setActiveAuth(!activeAuth);
        customer.setIsAuth(true);
      }
    } catch (error: any) {
      console.log('LOGIN_ERROR_DATA:', error.response.data.message);
      setFormError(error.response.data.message);
    }
  }
 
  return (
  <div className="navbar">
    <a href='/'>
      <img data-href='/' src='/logoSky180.png' alt='logoShop'/>
    </a>
    <NavBarDropTyres/>
    <NavBarDropWheels/>
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
    <a href={FAVORITES_ROUTE}>
      <FavoriteGoods countFavorite={page.favoritesCount.length ?? 0}/>
    </a>
    <a href={COMPARISON_ROUTE}>
     <CompareGoods countCompare={page.comparisonCount.length ?? 0} /> 
    </a>
    
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
          socialTwitter={twitterIsAuth}
          logIn={logInCustomer}
          formError={formError}
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
          formError={formError}
        />
      </Modal>
      : null
    }
    {isMatchPass ?
      <Modal active={signUp} setActive={signActiveUp}>
        <AuthSignUp phoneNumber={phoneTel}
          signUpAuth={signUpCustm}
          formError={formError}
        />
      </Modal> 
      :null
    }
    <BasketNavBar setActive={openBasket}/>
  </div>
  );
});
export default NavBar;