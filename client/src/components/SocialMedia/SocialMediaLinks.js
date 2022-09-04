import React from 'react';
import '../../css/SocialMedia/SocialMediaLinks.css';
import telegramIcon from '../../assets/icons/iconsSocialMedia/telegram48.png';
import viberIcon from '../../assets/icons/iconsSocialMedia/viber48.png';
import twitterIcon from '../../assets/icons/iconsSocialMedia/twitter48.png';
import instagramIcon from '../../assets/icons/iconsSocialMedia/instagram48.png';
import facebookIcon from '../../assets/icons/iconsSocialMedia/facebook48.png';

const SocialMediaLinks = () => {
    return (
        <div className='socialLinks'>
            <a href={'/#'}><img src={telegramIcon} alt={'iconTelegram'}/></a>
            <a href={'/#'}><img src={viberIcon} alt={'iconViber'}/></a>
            <a href={'/#'}><img src={twitterIcon} alt={'iconTwitter'}/></a>
            <a href={'/#'}><img src={instagramIcon} alt={'iconInstargam'}/></a>
            <a href={'/#'}><img src={facebookIcon} alt={'iconFacebook'}/></a>
        </div>
    );
};

export default SocialMediaLinks;