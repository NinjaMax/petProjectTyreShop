import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import Main from './components/Main';
import NavBar from './components/NavBar';


const App = () => {
  return (
    <BrowserRouter >
         <NavBar />
         <Main/>
         <AppRouter />
         <Footer/>
      
    </BrowserRouter>
  );
}

export default App;
