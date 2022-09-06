import React from 'react';
import '../../css/NavBarSearch.css';

const NavBarSearch = ({searchBtn, clickSearchBtn}) => {
    return (
        <div id="myOverlay" className={searchBtn? "overlayActive" : "overlay"}>
            <span className="closebtn" onClick={clickSearchBtn} title="Close Overlay">x</span>
                <div className="overlay-content">
                    <form action="">
                    <input type="text" placeholder="Search.." name="search"/>
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
        </div>
    );
};

export default NavBarSearch;