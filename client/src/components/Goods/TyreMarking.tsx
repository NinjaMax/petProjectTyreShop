import React from 'react';
import '../../css/Goods/TyreMarking.css';
import tyreMarkingWinter from '../../assets/img/imgTyreMarking/euroMarkingWinter.png';

type ITyreMarket = {
    brand?: string,
    param?: string,
    tyreMarkFuel?: string,
    tyreMarkWet?: string,
    tyreMarkNoise?: string,
};

const TyreMarking = ({brand, param, tyreMarkFuel, tyreMarkWet, tyreMarkNoise}:ITyreMarket ) => {
    return (
        <div className='tyreMarkingBox'>
            <img id='imgTyreMarking' src={tyreMarkingWinter}  alt='tyreMarking'/>
            <div className='tyreMarkingBrandName'><span>{brand}</span></div> 
            <div className='tyreMarkingTyreSize'><span>{param}</span></div> 
            <div className='tyreMarkingFuelCount'><span>{tyreMarkFuel}</span></div>
            <div className='tyreMarkingWetCount'><span>{tyreMarkWet}</span></div>
            <div className='tyreMarkingNoiseCount'><span>{tyreMarkNoise}</span></div>
        </div>
    );
};

export default TyreMarking;