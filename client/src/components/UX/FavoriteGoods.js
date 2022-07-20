import React from 'react';
import imgFavorite from '../../assets/icons/heart_64BlueClear.png';
import '../../css/UXcss/FovoriteGoods.css';

const FavoriteGoods = () => {
    return (
        <div className='favoriteGoods'>
            <img id='favoriteGoodsImg' src={imgFavorite} alt='imgFavorite'/>
        </div>
    );
};

export default FavoriteGoods;