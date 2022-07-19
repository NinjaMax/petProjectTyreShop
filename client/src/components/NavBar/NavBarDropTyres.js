import React from 'react';
import '../../css/NavBarCss/NavBarDropTyres.css';

const NavBarDropTyres = () => {
    return (
        
    <div className="dropdownNavbar">
      <button className="dropbtnNavbar">Шини 
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdownContentNavbar">
        <div className="headerNavbar">
          <h3>Каталог шин</h3>
        </div>
        <div className="rowNavbar">
          <div className="columnNavbar">
            <h4>по сезону</h4>
              <a href="/#">Літні шини</a>
              <a href="/#">Зимові шини</a>
              <a href="/#">Всесезонні шини</a>
          </div>
          <div className="columnNavbar">
            <h4>по типу транспорту</h4>
            <a href="/#">легкові</a>
            <a href="/#">грузові</a>
            <a href="/#">позашляховик</a>
            <a href="/#">мікроавтобус</a>
            <a href="/#">с/х</a>
            <a href="/#">спецтехніка</a>
            <a href="/#">мото</a>
          </div>
          <div className="columnNavbar">
            <h4>по діаметру</h4>
            <a href="/#">R13</a>
            <a href="/#">R14</a>
            <a href="/#">R15</a>
            <a href="/#">R16</a>
            <a href="/#">R17</a>
            <a href="/#">R18</a>
            <a href="/#">R19</a>
            <a href="/#">R20</a>
            <a href="/#">R21</a>
            <a href="/#">R17.5</a>
            <a href="/#">R19.5</a>
            <a href="/#">R22.5</a>
          </div>
        </div>
      </div>
    </div>
        
    );
};

export default NavBarDropTyres;