import React from 'react';
import '../../css/ButtonsCss/ButtonSearch.css';

interface IButtonSearch {
    clickSearchBtn(arg: any): void;
}

const ButtonSearch = ({clickSearchBtn}: IButtonSearch) => {
    
    return (
        <div>
            <button className="btnSearch"
            onClick={clickSearchBtn}
            > Пошук <i className='fa fa-search'></i>
            </button>        
        </div>
    );
};

export default ButtonSearch;