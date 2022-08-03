import React from 'react';
import '../../css/SortCss/SortLine.css';

const SortLine = () => {
    return (
        <div className='sortLine'>
            <span>Сортувати:</span> 
            <label className='sortLineItem'>
                <input className='inputSortLineItem' 
                       type="radio" 
                       value="deshevihDodorogih" 
                       name="sortLine" /> Від дешевих до дорогих
            </label>
            <label className='sortLineItem'>
                <input className='inputSortLineItem' 
                       type="radio" value="dorogihDeshevih"
                       name="sortLine"/> Від дорогих до дешевих
            </label>
            <label className='sortLineItem'>
                <input className='inputSortLineItem' 
                       type="radio" 
                       value="poRatingu" 
                       name="sortLine"/> По рейтингу
            </label>
        </div>
    );
};

export default SortLine;