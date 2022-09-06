import React from 'react';
import '../../css/ButtonsCss/ButtonSearch.css';

const ButtonSearch = ({clickSearchBtn}) => {
    
    return (
        <div>
            <button className="btnSearch"
            onClick={clickSearchBtn}
            > Пошук <i class='fa fa-search'></i>
            </button>
            
        </div>
    );
};

export default ButtonSearch;