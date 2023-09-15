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
            <a className='columnNavbarAnch' href='/tyres/litni'>Літні шини</a>
            <a className='columnNavbarAnch' href="/tyres/zimni">Зимові шини</a>
            <a className='columnNavbarAnch' href="/tyres/vsesezon">Всесезонні шини</a>
          </div>
          <div className="columnNavbar">
            <h4>по типу транспорту</h4>
            <a className='columnNavbarAnch' 
              href="/tyres/legkovi">легкові</a>
            <a className='columnNavbarAnch' 
              href="/tyres/gruzovi">грузові</a>
            <a className='columnNavbarAnch' 
              href="/tyres/vnedorognik">позашляховик</a>
            <a className='columnNavbarAnch' 
              href="/tyres/microavtobus">мікроавтобус</a>
            <a className='columnNavbarAnch' 
              href="/tyres/selhoz">с/х</a>
            <a className='columnNavbarAnch' 
              href="/tyres/spectehnika">спецтехніка</a>
            <a className='columnNavbarAnch' 
              href="/tyres/moto">мото</a>
          </div>
          <div className="columnNavbar">
            <h4>по діаметру</h4>
            <a className='columnNavbarAnch' href="/tyres/r13">R13</a>
            <a className='columnNavbarAnch' href="/tyres/r14">R14</a>
            <a className='columnNavbarAnch' href="/tyres/r15">R15</a>
            <a className='columnNavbarAnch' href="/tyres/r16">R16</a>
            <a className='columnNavbarAnch' href="/tyres/r17">R17</a>
            <a className='columnNavbarAnch' href="/tyres/r18">R18</a>
            <a className='columnNavbarAnch' href="/tyres/r19">R19</a>
            <a className='columnNavbarAnch' href="/tyres/r20">R20</a>
            <a className='columnNavbarAnch' href="/tyres/r21">R21</a>
            <a className='columnNavbarAnch' href="/tyres/r17.5">R17.5</a>
            <a className='columnNavbarAnch' href="/tyres/r19.5">R19.5</a>
            <a className='columnNavbarAnch' href="/tyres/r22.5">R22.5</a>
          </div>
        </div>
      </div>
    </div>
        
    );
};

export default NavBarDropTyres;