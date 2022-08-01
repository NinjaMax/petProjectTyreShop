import React from 'react';
import '../../css/SortCss/SortLine.css';

const SortLine = () => {
    return (
        <div className='sortLine'>
            <span>Сортувати:</span> 
            <label className='sortLineItem'><input type="radio" checked/>Від дешевих до дорогих</label>
            <label className='sortLineItem'><input type="radio"/>Від дорогих до дешевих</label>
            <label className='sortLineItem'><input type="radio"/>По рейтингу</label>
        </div>
    );
};

export default SortLine;