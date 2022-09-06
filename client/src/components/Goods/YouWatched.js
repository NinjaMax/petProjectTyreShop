import React from 'react';
import '../../css/Goods/YouWatched.css';
import TyresCard from '../Cards/TyresCard';

const YouWatched = () => {
    return (
        <div>
            <div>Ви дивились</div>
            <div className='youWatched'>    
                <TyresCard/>
                <TyresCard/>
                <TyresCard/>
            </div>
        </div>
       
    );
};

export default YouWatched;