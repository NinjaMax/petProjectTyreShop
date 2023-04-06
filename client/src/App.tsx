import React, { useContext } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import NavBar from './components/navBar/NavBar';
import Announcement from './components/Announcement';
import { observer } from 'mobx-react-lite';
import { Context } from './context/Context';

const App = observer(() => {
  const {user} = useContext<any | null>(Context);

  return (
    <BrowserRouter >
         <Announcement/>
         <NavBar />
         <AppRouter />
         <Footer/>
      
    </BrowserRouter>
  );
});

export default App;
