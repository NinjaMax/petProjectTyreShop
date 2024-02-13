import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from './context/Context';
import SpinnerCarRot from './components/spinners/SpinnerCarRot';
import { getCurUser } from './restAPI/restUsersApi';
//import AppRouter from './components/AppRouter';

const AppRouter = lazy(() => import('./components/AppRouter'));
const Footer= lazy(() => import('./components/Footer'));
const NavBar = lazy(() => import('./components/navBar/NavBar'));
const Announcement = lazy(() => import('./components/Announcement'));

const App = observer(() => {
  const {user} = useContext<any | null>(Context);
  const [loading, setLoading] = useState(true)

    useEffect(() => {
      getCurUser().then(
        (dataUser) => {
          if(dataUser) {
            //console.log('ISUSER: ', dataUser)
            user.setUser(dataUser);
            user.setIsAuth(true)
          }
        }).finally(() => setLoading(false))      
    }, [user])

    if (loading) {
        return <SpinnerCarRot/>
    }

  return (
    <BrowserRouter >
      <Suspense fallback={<SpinnerCarRot/>}>
        <Announcement/>
        <NavBar />
        <AppRouter />
        <Footer/>
      </Suspense>
    </BrowserRouter>

  );
});

export default App;
