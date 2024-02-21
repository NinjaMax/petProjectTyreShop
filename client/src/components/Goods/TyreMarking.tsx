import React from 'react';
import '../../css/Goods/TyreMarking.css';

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
            <img id='imgTyreMarking' 
                src='/infoTyreMarking/eu_label_new.webp'  
                sizes='(max-width: 2560px) 300px,
                        (max-width: 1440px) 300px,
                        (max-width: 1024px) 300px,
                        (max-width: 768px) 300px,
                        (max-width: 425px) 300px,
                        (max-width: 375px) 300px,
                        (max-width: 320px) 280px, 100vw'
                width={300}
                height={445}
                alt='tyreMarking'
            />
            <div className='tyreMarkingBrandName'><span>{brand}</span></div> 
            <div className='tyreMarkingTyreSize'><span>{param}</span></div> 
            <div className='tyreMarkingFuelCount'><span>{tyreMarkFuel}</span></div>
            <div className='tyreMarkingWetCount'><span>{tyreMarkWet}</span></div>
            <div className='tyreMarkingNoiseCount'><span>{tyreMarkNoise}</span></div>
        </div>
    );
};

export default TyreMarking;