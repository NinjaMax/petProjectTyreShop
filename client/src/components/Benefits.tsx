import React from 'react';
import '../css/Benefits.css';
import onlineSupport from '../assets/icons/onlineSupport100.png';
import fastDelivery from '../assets/icons/fastDelivery100.png';
import handShake from '../assets/icons/handshake100.png';
import { useTranslation } from 'react-i18next';

const Benefits = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <div className='benefitsBox'>
                <div className="containerBenefit">
                    <img src={onlineSupport} alt="OnlineSupport"/>
                    <p><span>{t('benefitsBox.online_support_head')}</span></p>
                    {t('benefitsBox.online_support_text')}
                </div>
                <div className="containerBenefit">
                    <img src={fastDelivery} alt="FastDelivery" />
                    <p><span>{t('benefitsBox.online_delivery_head')}</span></p>
                    {t('benefitsBox.online_delivery_text')}
                </div>
                <div className="containerBenefit">
                    <img src={handShake} alt="Handshake" />
                    <p><span>{t('benefitsBox.online_handshake_head')}</span></p>
                    <p>{t('benefitsBox.online_handshake_text')}</p>
                </div>
            </div>
        </div>
    );
};

export default Benefits;