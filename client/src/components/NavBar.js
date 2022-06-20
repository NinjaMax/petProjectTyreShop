import React from 'react';
//import {Context} from '../index';
import { observer } from 'mobx-react-lite';
import '../css/NavBar.css';

const NavBar = observer(() => {
    //const {user} = useContext(Context);

  return (

  <div className="navbar">
      <a href="/#home">Home</a>
      <a href="/#news">News</a>
    <div className="dropdown">
      <button className="dropbtn">Dropdown
        <i className="fa fa-caret-down"></i>
      </button>
    <div className="dropdown-content">
      <div className="header">
        <h2>Mega Menu</h2>
      </div>
      <div className="row">
        <div className="column">
          <h3>Category 1</h3>
          <a href="/#">Link 1</a>
          <a href="/#">Link 2</a>
          <a href="/#">Link 3</a>
        </div>
        <div className="column">
          <h3>Category 2</h3>
          <a href="/#">Link 1</a>
          <a href="/#">Link 2</a>
          <a href="/#">Link 3</a>
        </div>
        <div className="column">
          <h3>Category 3</h3>
          <a href="/#">Link 1</a>
          <a href="/#">Link 2</a>
          <a href="/#">Link 3</a>
        </div>
      </div>
    </div>
  </div>
</div>
          
        
   
    );
});
export default NavBar;