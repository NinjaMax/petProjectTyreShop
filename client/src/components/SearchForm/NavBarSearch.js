import React from 'react';

const NavBarSearch = () => {
    return (
        <div id="myOverlay" className="overlay">
            <span className="closebtn" onclick="closeSearch()" title="Close Overlay">x</span>
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