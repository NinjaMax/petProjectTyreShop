import React from 'react';
import '../../css/ButtonsCss/ButtonSearch.css';

interface IButtonSearch {
    clickSearchBtn(arg: any): void;
    isSearched: boolean;
}

const ButtonSearch = ({clickSearchBtn, isSearched}: IButtonSearch) => {
    
    return (
        <div>
            <button 
            name='searchButton'
            className="btnSearch"
            onClick={clickSearchBtn}
            >{isSearched ? 'Пошук' : ''}<i className='fa fa-search'></i>
            </button>        
        </div>
    );
};

export default ButtonSearch;