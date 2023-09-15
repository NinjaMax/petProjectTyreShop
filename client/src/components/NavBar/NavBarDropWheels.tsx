import React from 'react';
import '../../css/NavBarCss/NavBarDropTyres.css';
//import { useParams } from 'react-router-dom';

const NavBarDropWheels = () => {
    //const { season } = useParams()

    return (
        
    <div className="dropdownNavbar">
      <button className="dropbtnNavbar" >
        <a className='navbarAnchMain' href="/wheels">Диски </a> 
         <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdownContentNavbar">
        <div className="headerNavbar">
          <h3>Каталог дисків</h3>
        </div>
        <div className="rowNavbar">
          <div className="columnNavbar">
            <h4>по типу диска</h4>
            <a className='columnNavbarAnch' href="/wheels/stalni">Сталеві</a>
            <a className='columnNavbarAnch' href="/wheels/litoi">Легкосплавні</a>
            <a className='columnNavbarAnch' href="/#">Ковані</a>
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
            <a className='columnNavbarAnch' href="/wheels/r13">R13</a>
            <a className='columnNavbarAnch' href="/wheels/r14">R14</a>
            <a className='columnNavbarAnch' href="/wheels/r15">R15</a>
            <a className='columnNavbarAnch' href="/wheels/r16">R16</a>
            <a className='columnNavbarAnch' href="/wheels/r17">R17</a>
            <a className='columnNavbarAnch' href="/wheels/r18">R18</a>
            <a className='columnNavbarAnch' href="/wheels/r19">R19</a>
            <a className='columnNavbarAnch' href="/wheels/r20">R20</a>
            <a className='columnNavbarAnch' href="/wheels/r21">R21</a>
            <a className='columnNavbarAnch' href="/wheels/r17.5">R17.5</a>
            <a className='columnNavbarAnch' href="/wheels/r19.5">R19.5</a>
            <a className='columnNavbarAnch' href="/wheels/r22.5">R22.5</a>
          </div>
        </div>
      </div>
    </div>
        
    );
};

export default NavBarDropWheels;