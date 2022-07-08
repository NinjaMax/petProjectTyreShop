import React from 'react';
//import {Context} from '../index';
import { observer } from 'mobx-react-lite';
import ButtonSearch from './Buttons/ButtonSearch';
import logoShop from '../assets/logoShop/logoSkyshina302_100.png';
import BasketNav from '../components/Basket/BasketNav';
import '../css/NavBar.css';

const NavBar = observer(() => {
    //const {user} = useContext(Context);

  return (

  <div className="navbar">
      <img href='/#' src={logoShop} alt='logoShop'/>
      <a href="/#home">Home</a>
      <a href="/#news">News</a>
    <div className="dropdownNavbar">
        <button className="dropbtnNavbar">Dropdown
          <i className="fa fa-caret-down"></i>
        </button>
      <div className="dropdownContentNavbar">
        <div className="headerNavbar">
          <h2>Mega Menu</h2>
        </div>
        <div className="rowNavbar">
          <div className="columnNavbar">
            <h3>Category 1</h3>
              <a href="/#">Link 1</a>
              <a href="/#">Link 2</a>
              <a href="/#">Link 3</a>
          </div>
          <div className="columnNavbar">
            <h3>Category 2</h3>
              <a href="/#">Link 1</a>
              <a href="/#">Link 2</a>
              <a href="/#">Link 3</a>
          </div>
          <div className="columnNavbar">
            <h3>Category 3</h3>
              <a href="/#">Link 1</a>
              <a href="/#">Link 2</a>
              <a href="/#">Link 3</a>
          </div>
        </div>
      </div>
    </div>
    <ButtonSearch/>
    <BasketNav/>
  </div>

    );
});
export default NavBar;