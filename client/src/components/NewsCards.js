import React from 'react';
import '../css/NewsCards.css'

const NewsCards = () => {
    return (
        <div className='news'>
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
            <div className="newsCard">
                <img src="img_avatar.png" alt="newsCard"/>
                <div className="newsContainer">
                    <h4><b>Helicopter</b></h4>
                    <p>Manager Engineer</p>
                </div>
            </div>
      
        </div>
        
    );
};

export default NewsCards;