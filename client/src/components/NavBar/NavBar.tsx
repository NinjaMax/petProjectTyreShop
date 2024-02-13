import React, {useContext, useState, useEffect} from 'react';
import '../../css/NavBarCss/NavBar.css';
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
import { COMPARISON_ROUTE, DELIVERY_ROUTE, FAVORITES_ROUTE } from '../../utils/consts';
import { useMediaQuery } from 'react-responsive';
//import logoMain  from './logoSky180.webp'; 
//logoSky180.webp
import { useTranslation } from 'react-i18next';

const locales: any = {
  uk: { title: 'Укр' },
  ru: { title: 'Рус' },
};

const NavBar = observer(() => {
  const {customer, page} = useContext<any | null>(Context);
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
  const [formError, setFormError] = useState<string | null>('');
  const [isOpenMobileBar, setIsOpenMobileBar] = useState<boolean>(false);
  const [isEmptyBasket, setIsEmptyBasket] = useState<boolean>(false);
  const [isEmptyFavorite, setIsEmptyFavorite] = useState<boolean>(false);
  const [isEmptyCompare, setIsEmptyCompare] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: '(max-width: 426px)' });
  const { t, i18n } = useTranslation();
  
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
          //console.log('SET_GOOGLE_AUTH: ', authGoogle)
        } 
        if (!isUser && taskSocial[i] === signInFacebook){
          let authFacebook: any = await taskSocial[i]();
          setFacebookIsAuth(authFacebook);
          //console.log('SET_FACEBOOK_AUTH: ', authFacebook)
        }
        if (!isUser && taskSocial[i] === signInTwitter){
          let authTwitter: any = await taskSocial[i]();
          setTwitterIsAuth(authTwitter);
          //console.log('SET_TWITTER_AUTH: ', authTwitter)
        }
        const task = taskSocial.shift();
        task();
        await yieldToMain(); 
      }
    }
    socialSignIn();
    return () => {isUser = true}
  },[]);

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
  },[customer]);

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
          //console.log('CURRENT_COMPARISON: ', curComparison)
          //setComparisonCount(curComparison.length);
          page.setComparisonCount(curComparison);
          
        }
        if (!isMounted && taskFavorite[i] === getFavorites) {
          let curFavorites: any = await taskFavorite[i]();
          //console.log('CURRENT_FAVORITES: ', curFavorites)
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
  },[page]);

  useEffect(() => {
    if (isPassSend) {
      setTimeout(() => setPassSend(false), 118000);
    }
  },[isPassSend]);

  const openBasket = () => {
    if (page.basketCount !== 0) {
      setActiveBasket(!activeBasket);
    } else {
      setIsEmptyBasket(!isEmptyBasket);
    }
  };

  const openFavorite = () => {
    if (!page.favoritesCount.length) {
      setIsEmptyFavorite(!isEmptyFavorite);
    }
  };

  const openCompare = () => {
    if (!page.comparisonCount.length) {
      setIsEmptyCompare(!isEmptyCompare);
    }
  };


  const authActive = () => {
    setFormError(null);
    setActiveAuth(!activeAuth);
  };

  const authActiveConfirm = () => {
    setFormError(null);
    setAuthConfirm(!activeAuthConfirm);
  };

  const clickSearchBtn = () => {
    setSearchBtn(!searchBtn);
    //console.log('CLOSE NAVBAR SEARCH');
  };

  const signActiveUp = () => {
    setSignUp(!signUp);
  };

  const openMobileBar = () => {
    setIsOpenMobileBar(!isOpenMobileBar);
  };

  const preSignUpAuth = async (telnumber: bigint) => {
    //console.log('TEL NUMBER: ', telnumber);
    try {
      setPhoneTel(telnumber);
      const sendPass = await preSignUpUser(telnumber);
      //console.log('SEND SMS: ', sendPass);
      if (sendPass) {
        setPassSend(!isPassSend);
        setSmsPass(sendPass);
      } else {
        //console.log(`Помилка номера. Або користувач з номером вже існує.`);
        setFormError(`${t('navBar.phone_number_error', { phone: telnumber })}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const matchGetPass = async (passFromTel: number) => {
    try {
      const matchPass = await matchPassSms(smsPass!, passFromTel);
      // console.log('PASS_TEL: ', passFromTel);
      // console.log('MATCH PASS: ', matchPass);
      // console.log('SMS: ', smsPass)
      if (matchPass) {
        setIsMatchPass(!isMatchPass);
        setAuthConfirm(!activeAuthConfirm); 
        setSignUp(!signUp);
      } else {
        setFormError(t('navBar.password_error'))
      }
    } catch (error: any) {
      console.log(error);
      setFormError(error.response.data.message);
    }
  };

  const logOutUser = async () => {
    await logOut();
    customer.setIsAuth(false);
    customer.setUser({});
    document.location.assign('/');
  };

  const signUpCustm = async (dataSignIn: any) => {
    try {
      await signUpCustomer(dataSignIn);
      //console.log( 'SIGN_UP_DATA: ', dataSignIn);
    } catch (error: any) {
      console.log('SIGN_UP_ERROR', error);
      setFormError(error.response.data.message);
    }
  };

  const logInCustomer = async (dataLogIn: any) => {
    try {
      const logInData: boolean = await logInCustm(dataLogIn);
      if(logInData) {
        setActiveAuth(!activeAuth);
        customer.setIsAuth(true);
      } else {
        setFormError(t('navBar.auth_error'));
      }
    } catch (error: any) {
      console.log('LOGIN_ERROR_DATA:', error.response.data.message);
      setFormError(error.response.data.message);
    }
  };

  const chooseLanguage = (e: any) => {
    const langChoose: string = e.target.value;
    i18n.changeLanguage(langChoose);
    document.location.reload();
  };
 
  return (
  <div className="navbar">
    <div className='navBarLogoBox'>
      {isMobile ? 
        <i className={isOpenMobileBar ? 
          "fas fa-times fa-2x"
          : "fas fa-bars fa-2x"}
          onClick={openMobileBar}
        ></i> 
        : null
      }
      <a href='/'>
        <img 
          fetchpriority="high"
          src='/logoSky180.webp' 
          alt='logoShop'
        />
      </a>
      {isMobile ? 
        <ButtonSearch isSearched={false} 
          clickSearchBtn={clickSearchBtn}
        />
        : null
      }
      {searchBtn && isMobile ? 
        <NavBarSearch searchBtn={searchBtn} clickSearchBtn={clickSearchBtn}/>
        :null
      }
      {isMobile ? 
        <BasketNavBar setActive={openBasket}/>
        : null
      }
    </div>
    {!isMobile || (isMobile && isOpenMobileBar) ?
    <>
    <NavBarDropTyres/>
    <NavBarDropWheels/>
    <a href={DELIVERY_ROUTE} className='anchorBtn'>{t('navBar.delivery_section')}</a>
    <a href='/contact' className='anchorBtn'>{t('navBar.contact_section')}</a>
    <div className='navbarPhoneBox'>
      <span className='navbarPhone'>067 777 77 77 
        <span className='navbarPhoneBtnDown'> <i className="fa fa-caret-down"></i></span>
        <span className='navbarPhoneBtnUp'> <i className="fa fa-caret-up"></i></span>
      </span>
      <span className='navbarPhoneDropDown'>
        <span>099 777 77 77</span>
        <span>063 777 77 77</span>
      </span>
    </div>
    <span data-href="/">{t('navBar.more_section')}</span>
    <ButtonSearch isSearched={true}  clickSearchBtn={clickSearchBtn}/>
    {searchBtn ? 
      <NavBarSearch searchBtn={searchBtn} clickSearchBtn={clickSearchBtn}/>
    :null
    }
    {page.favoritesCount.length !== 0 ?
    <a href={FAVORITES_ROUTE}>
      <FavoriteGoods countFavorite={page.favoritesCount.length ?? 0}/>
    </a>
    :
    <div onClick={openFavorite}>
      <FavoriteGoods countFavorite={page.favoritesCount.length ?? 0}/>
    </div>
    }
    {page.comparisonCount.length !== 0 ?
    <a href={COMPARISON_ROUTE}>
      <CompareGoods countCompare={page.comparisonCount.length ?? 0} /> 
    </a>
    :
    <div onClick={openCompare}>
      <CompareGoods countCompare={page.comparisonCount.length ?? 0} /> 
    </div>
    }
    <div className='navbarLanguageBox'>
      <div>
        {Object.keys(locales).map((locale: any) => (
          <div key={locale}>
            <button style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }} 
            //type="submit" 
            value={locale}
            onClick={chooseLanguage}>
            {locales[locale].title}
            </button>
          </div>
        ))}
      </div>
    </div>
    {customer._isAuth ?
      <AuthView logOutUser={logOutUser}/>
      : <span className='enterAuthNavBar' onClick={authActive}>
           {t('navBar.auth_link')}
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
    {isEmptyBasket ?
      <Modal active={isEmptyBasket} setActive={openBasket}>
        <span>{t('navBar.basket_is_empty')} &nbsp;</span>
      </Modal> 
      :null
    }
    {isEmptyFavorite ?
      <Modal active={isEmptyFavorite} setActive={openFavorite}>
        <span>{t('navBar.no_favorite_goods')} &nbsp;</span>
      </Modal> 
      :null
    }
    {isEmptyCompare ?
      <Modal active={isEmptyCompare} setActive={openCompare}>
        <span>{t('navBar.no_compare_goods')} &nbsp;</span>
      </Modal> 
      :null
    }
    {!isMobile ?
      <BasketNavBar setActive={openBasket}/>
      : null
    }
    </>
    : null
    }
  </div>
  );
});
export default NavBar;