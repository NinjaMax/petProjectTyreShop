import React, { useContext } from 'react';
import imgFavorite from '../../assets/icons/heart_64BlueClear.png';
import '../../css/UXcss/FovoriteGoods.css';
import { Context } from '../../context/Context';

type IFavoriteCount = {
    countFavorite: number
};

const FavoriteGoods = ({countFavorite}: IFavoriteCount) => {
    const {customer} = useContext<any | null>(Context);

    return (
        <div className='favoriteGoods'>
            <i className={countFavorite !== 0 ? 'iconFavoriteActive' : 'iconFavorite'}>  
            </i>
            {countFavorite !==0 ?
                <span className={ 
                    customer._isAuth ? 'favoriteGoodsCount activeFavCount' : 
                    'favoriteGoodsCount'
                    
                    }
                >
                {countFavorite}
            </span>  
              : null
            }
            {/* <img id='favoriteGoodsImg' src={imgFavorite} alt='imgFavorite'/> */}
        </div>
    );
};

export default FavoriteGoods;

