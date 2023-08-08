import React from 'react';
import imgFavorite from '../../assets/icons/heart_64BlueClear.png';
import '../../css/UXcss/FovoriteGoods.css';

type IFavoriteCount = {
    countFavorite: number
};

const FavoriteGoods = ({countFavorite}: IFavoriteCount) => {

    //<i className="far fa-heart fa-lg">
    //    _favorites_count:number;
    //_comparison_count:number;
    //favoritesCount
    //comparisonCount
    return (
        <div className='favoriteGoods'>
            <i className={countFavorite !== 0 ? 'iconFavoriteActive' : 'iconFavorite'}>  
            </i>
            {countFavorite !==0 ?
              <span>{countFavorite}</span>  
              : null
            }
            {/* <img id='favoriteGoodsImg' src={imgFavorite} alt='imgFavorite'/> */}
        </div>
    );
};

export default FavoriteGoods;

