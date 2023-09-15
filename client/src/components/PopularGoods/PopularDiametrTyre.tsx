import React from 'react';
import '../../css/PopularGoodsCss/PopularDiametrTyre.css';

const PopularDiametrTyre = () => {
    return (
        <div className='popularDiametrTyre'> 
            <a href='/tyres/w195/h65/r15'>
               195/65 R15 літо
            </a>   
            <a href='/tyres/legkovantazhnii'>
                шини для мікроавтобуса
            </a>
            <a href='/tyres/zimova/w205/h55/r16'>
                зимние шини 205/55 R16
            </a>
            <a href='/tyres/goodyear/w215/h65/r16'>
                шини Goodyear 215/65 R16
            </a>
            <a href='/tyres/zimova/w195/h65/r15'>
                195/65 R15 зима
            </a>
            <a href='/tyres/michelin/w215/h55/r17'>
                Michelin 215/55 R17
            </a>
        </div>   
    );
};

export default PopularDiametrTyre;
