import React from 'react';
import TyresCard from '../components/Cards/TyresCard';
import '../css/PromotionBox.css';

const PromotionBox = () => {
    return (

        <div className='promotionBox'>
            <div className="newsCard">
                <img src="img_avatar.png" alt="newsCard"/>
                    <div className="newsContainer">
                        <h4><b>HTML CSS</b></h4>
                        <p>Architect  Engineer</p>
                    </div>
            </div>
            <div className="newsCard">
                <img src="img_avatar.png" alt="newsCard"/>
                <div className="newsContainer">
                    <h4><b>Web and SASS</b></h4>
                    <p>Manager  Engineer</p>
                </div>
            </div>
            <div className="newsCard">
                <img src="img_avatar.png" alt="newsCard"/>
                <div className="newsContainer">
                    <h4><b>Crocodile</b></h4>
                    <p>Team Lead</p>
                </div>
            </div>
            <TyresCard/>    
        </div>
        
    );
};

export default PromotionBox;