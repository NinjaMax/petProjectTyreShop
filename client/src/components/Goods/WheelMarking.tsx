import React from 'react';
import '../../css/Goods/WheelMarking.css';

type IWheelMarket = {
    brand?: string;
    param?: string;
    width?: string | null;
    diameter?: string | null;
    boltCount?: string | null;
};

const WheelMarking = ({brand, param, width, diameter, boltCount}:IWheelMarket ) => {
    return (
        <div className='wheelMarkingBox'>
            <img id='imgwheelMarking' src={'wheel_diameter_3.webp'}  alt='tyreMarking'/>
            <div className='wheelMarkingBrandName'><span>{brand}</span></div> 
            <div className='wheelMarkingTyreSize'><span>{param}</span></div> 
            <div className='wheelMarkingWidth'><span>{width}
                <span className="tooltipWheelMarking">
                    Ширина профиля диску
                </span>
            </span>
            </div>
            <div className='wheelMarkingDiameter'>
                <span>{diameter}
                    <span className="tooltipWheelMarking">
                        Посадковий діаметр диску
                    </span>
                </span>
            </div>
            <div className='wheelMarkingBoltCount'>
                <span>{boltCount}
                    <span className="tooltipWheelMarking">
                        Кількість отворів для болтів диску
                    </span>
                </span>
            </div>
        </div>
    );
};

export default WheelMarking;