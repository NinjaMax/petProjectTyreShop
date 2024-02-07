import React from 'react';
import '../../css/SocialMedia/SocialMediaLinks.css';

const SocialMediaLinks = () => {
    return (
        <div className='socialLinks'>
            <a href={'/#'}><img src={'telegram48.webp'} alt={'iconTelegram'}/></a>
            <a href={'/#'}><img src={'viber48.webp'} alt={'iconViber'}/></a>
            <a href={'/#'}><img src={'twitter48.webp'} alt={'iconTwitter'}/></a>
            <a href={'/#'}><img src={'instagram48.webp'} alt={'iconInstargam'}/></a>
            <a href={'/#'}><img src={'facebook48.webp'} alt={'iconFacebook'}/></a>
        </div>
    );
};

export default SocialMediaLinks;