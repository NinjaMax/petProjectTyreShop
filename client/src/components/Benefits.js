import React from 'react';
import '../css/Benefits.css';
import onlineSupport from '../assets/icons/onlineSupport100.png';
import fastDelivery from '../assets/icons/fastDelivery100.png';
import handShake from '../assets/icons/handshake100.png';

const Benefits = () => {
    return (
        <div>
            <div className='benefitsBox'>
                <div className="containerBenefit">
                    <img src={onlineSupport} alt="OnlineSupport"/>
                    <p><span>Chris Fox.</span> CEO at Mighty Schools.</p>
                    <p>HTML CSS saved us from a web disaster.</p>
                </div>

                <div className="containerBenefit">
                    <img src={fastDelivery} alt="FastDelivery" />
                    <p><span >Rebecca Flex.</span> CEO at Company.</p>
                    <p>No one is better than HTML CSS.</p>
                </div>
                <div className="containerBenefit">
                    <img src={handShake} alt="Handshake" />
                    <p><span >Rebecca Flex.</span> CEO at Company.</p>
                    <p>No one is better than HTML CSS.</p>
                </div>
            </div>
        </div>

    );
};

export default Benefits;