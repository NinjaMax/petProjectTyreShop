import React from 'react';
import '../../css/Goods/AllAboutProduct.css';
import productImage from '../../assets/autotyrespilotspotps2.png';
import ButtonAction from '../Buttons/ButtonAction';
import Rating from '../UX/Rating';
import PropsCardIcons from '../Cards/PropsCardIcons';
import FlagsIcon from '../Cards/FlagsIcon';

const AllAboutProduct = () => {

    return (
        <div className='allAboutProduct'>
            <div>
                <img id='productImgGoods' src={productImage} alt='productImg'/>   
            </div>
            <div className='allAboutProductInfo'>
                <span>CONTINENTAL CONTICROSSPREMIUMCONTACT 6 UHPD 5P 195/65 R15 105T XL</span>
                <div className='productInfoRating'><Rating numScore={4.8}/><a href='/#'>0 отзывов</a></div>
                <div className="productInfoCode">код товара: 0123565447</div>
                <div className='productInfoProps'><PropsCardIcons/></div>
                <div className="productInfoCountry"><FlagsIcon/></div>
                <div className="productInfoPrice">2005 UAH</div>
                <ButtonAction props={"Купити"}/>
                <p/>    
            </div>
            <div className='productStickerRight'>
                <span>Доставка НОВОЮ ПОШТОЮ</span>
                <span>Самовивіз</span>
                <span>ОПЛАТА КАРТКОЮ</span>
                <span>ГАРАНТІЯ</span>
                <span>ЗНИЖКИ</span>
                <span>РОЗШИРЕНА ГАРАНТІЯ</span>
                <span>ПАРТНЕРСЬКА ПРОГРАММА</span>
            </div>
        </div>
    );
};

export default AllAboutProduct;