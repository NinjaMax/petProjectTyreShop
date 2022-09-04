import React from 'react';
import '../../css/Goods/TyreMarking.css';
import tyreMarkingWinter from '../../assets/img/imgTyreMarking/euroMarkingWinter.png';

const TyreMarking = () => {
    return (
        <div className='tyreMarkingBox'>
            <img id='imgTyreMarking' src={tyreMarkingWinter}  alt='tyreMarking'/>  
            <div className='tyreMarkingFuelCount'><span>0</span></div>
            <div className='tyreMarkingWetCount'><span>0</span></div>
            <div className='tyreMarkingNoiseCount'><span>0</span></div>
        </div>
    );
};

export default TyreMarking;