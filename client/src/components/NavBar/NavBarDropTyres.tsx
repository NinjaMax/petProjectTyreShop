import React from 'react';
import '../../css/NavBarCss/NavBarDropTyres.css';

const NavBarDropTyres = () => {


    return (
        
    <div className="dropdownNavbar">
      <button className="dropbtnNavbar" >
        <a className='navbarAnchMain' href="/tyres">Шини </a> 
         <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdownContentNavbar">
        <div className="headerNavbar">
          <h3>Каталог шин</h3>
        </div>
        <div className="rowNavbar">
          <div className="columnNavbar">
            <h4>по сезону</h4>
            <a className='columnNavbarAnch' href="/#">Літні шини</a>
            <a className='columnNavbarAnch' href="/#">Зимові шини</a>
            <a className='columnNavbarAnch' href="/#">Всесезонні шини</a>
          </div>
          <div className="columnNavbar">
            <h4>по типу транспорту</h4>
            <a className='columnNavbarAnch' href="/#">легкові</a>
            <a className='columnNavbarAnch' href="/#">грузові</a>
            <a className='columnNavbarAnch' href="/#">позашляховик</a>
            <a className='columnNavbarAnch' href="/#">мікроавтобус</a>
            <a className='columnNavbarAnch' href="/#">с/х</a>
            <a className='columnNavbarAnch' href="/#">спецтехніка</a>
            <a className='columnNavbarAnch' href="/#">мото</a>
          </div>
          <div className="columnNavbar">
            <h4>по діаметру</h4>
            <a className='columnNavbarAnch' href="/#">R13</a>
            <a className='columnNavbarAnch' href="/#">R14</a>
            <a className='columnNavbarAnch' href="/#">R15</a>
            <a className='columnNavbarAnch' href="/#">R16</a>
            <a className='columnNavbarAnch' href="/#">R17</a>
            <a className='columnNavbarAnch' href="/#">R18</a>
            <a className='columnNavbarAnch' href="/#">R19</a>
            <a className='columnNavbarAnch' href="/#">R20</a>
            <a className='columnNavbarAnch' href="/#">R21</a>
            <a className='columnNavbarAnch' href="/#">R17.5</a>
            <a className='columnNavbarAnch' href="/#">R19.5</a>
            <a className='columnNavbarAnch' href="/#">R22.5</a>
          </div>
        </div>
      </div>
    </div>
        
    );
};

export default NavBarDropTyres;