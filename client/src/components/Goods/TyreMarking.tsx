import React from 'react';
import '../../css/Goods/TyreMarking.css';
import tyreMarkingWinter from '../../assets/img/imgTyreMarking/euroMarkingWinter.png';

const TyreMarking = () => {
    return (
        <div className='tyreMarkingBox'>
            <img id='imgTyreMarking' src={tyreMarkingWinter}  alt='tyreMarking'/>
            <div className='tyreMarkingBrandName'><span>Continental</span></div> 
            <div className='tyreMarkingTyreSize'><span>315/70 R22.5 105/155 T</span></div> 
            <div className='tyreMarkingFuelCount'><span>C</span></div>
            <div className='tyreMarkingWetCount'><span>B</span></div>
            <div className='tyreMarkingNoiseCount'><span>72</span></div>
        </div>
    );
};

export default TyreMarking;