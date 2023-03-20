import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import NavBar from './components/navBar/NavBar';
import Announcement from './components/Announcement';

const App = () => {
  return (
    <BrowserRouter >
         <Announcement/>
         <NavBar />
         <AppRouter />
         <Footer/>
      
    </BrowserRouter>
  );
}

export default App;
