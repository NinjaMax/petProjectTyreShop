import React from 'react';
import '../css/Benefits.css';
import { useTranslation } from 'react-i18next';

const Benefits = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className='benefitsBox'>
                <div className="containerBenefit">
                    <img src='onlineSupport100.webp' 
                        loading='lazy'
                        decoding='async' 
                        alt="OnlineSupport"
                    />
                    <p><span>{t('benefitsBox.online_support_head')}</span></p>
                    {t('benefitsBox.online_support_text')}
                </div>
                <div className="containerBenefit">
                    <img src='fastDelivery100.webp' 
                        loading='lazy'
                        decoding='async' 
                        alt="FastDelivery" 
                    />
                    <p><span>{t('benefitsBox.online_delivery_head')}</span></p>
                    {t('benefitsBox.online_delivery_text')}
                </div>
                <div className="containerBenefit">
                    <img src='handshake100.webp' 
                        loading='lazy'
                        decoding='async' 
                        alt="Handshake" 
                    />
                    <p><span>{t('benefitsBox.online_handshake_head')}</span></p>
                    <p>{t('benefitsBox.online_handshake_text')}</p>
                </div>
            </div>
        </div>
    );
};

export default Benefits;