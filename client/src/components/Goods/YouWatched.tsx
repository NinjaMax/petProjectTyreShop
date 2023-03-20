import React from 'react';
import '../../css/Goods/YouWatched.css';
import TyresCard from '../cards/TyresCard';

const YouWatched = () => {
    return (
        <div>
            <div>Ви дивились</div>
            <div className='youWatched'>    
                <TyresCard optionsBox={undefined} checkOrders={undefined}/>
                <TyresCard optionsBox={undefined} checkOrders={undefined}/>
                <TyresCard optionsBox={undefined} checkOrders={undefined}/>
            </div>
        </div>
       
    );
};

export default YouWatched;