import React from 'react';
import '../../css/NavBarSearch.css';

const NavBarSearch = ({searchBtn, clickSearchBtn}) => {
    return (
        <div id="myOverlay" className={searchBtn? "overlayActive" : "overlay"}>
            <span className="closebtn" onClick={clickSearchBtn} title="Close Overlay">&#10006;</span>
                <div className="overlayForm">
                    <form action="">
                    <input type="text" placeholder="Пошук..." name="search"/>
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>    
                </div>
                <div className='outputData'>   
                    <div className='outputDataItems'>
                    <span>Всі результати пошуку:</span>
                        
                    </div>
                    <div className='outputDataItems'>
                        Шини
                    </div>
                    <div className='outputDataItems'>
                        Грузові шини       
                    </div>
                    <div className='outputDataItems'>
                        Мото шини       
                    </div>
                    <div className='outputDataItems'>
                        С/х шини       
                    </div>
                    <div className='outputDataItems'>
                        Диски       
                    </div>
                    <div className='outputDataItems'>
                        Акб       
                    </div>
                    <div className='outputDataItems'>
                        Масло      
                    </div>
                    <div className='outputDataItems'>
                        Акб
                    </div>
                </div>
        </div>
    );
};

export default NavBarSearch;