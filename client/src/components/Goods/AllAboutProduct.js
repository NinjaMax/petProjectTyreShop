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
            <div className='allProductImgBox'>
                <img id='productImgGoods' src={productImage} alt='productImg'/>   
            </div>
            <div className='allAboutProductInfo'>
                <div className='productInfoName'>CONTINENTAL CONTICROSSPREMIUMCONTACT 6 UHPD 5P 195/65 R15 105T XL</div>
                <div className='productInfoRating'><Rating numScore={4.8}/><a href='/#'>0 отзывов</a></div>
                <div className="productInfoCode">код товара: 0123565447</div>
                <div className='productInfoProps'><PropsCardIcons/></div>
                <div className="productInfoCountry"><FlagsIcon/></div>
                <div className="productInfoPrice">2005 UAH</div>
                <ButtonAction props={"КУПИТИ"}/>
                <p/>
                <ButtonAction props={"Швидке замовлення"}/>
                <div>Розширенна Гарантія</div>
                <div>Додати в обранне</div>
                <div>Додати в порівняння</div>

            </div>
            <div className='productStickerBox'>
                <h6>Доставляємо</h6>
                <div className='productStickerRight'>
                    <span>Доставка НОВОЮ ПОШТОЮ</span>
                    <span>Доставка УКР ПОШТОЮ</span>
                    <span>Доставка САТ</span>
                    <span>Самовивіз</span>
                </div>
                <h6>Приймаємо</h6>
                <div className='productStickerRight'>    
                    <span>Готівка</span>
                    <span>Безготівковий розрахунок</span>
                    <span>VISA</span>
                    <span>Mastercard</span>
                    <span>24 Pay</span>
                    <span>Mono</span>
                    <span>Apple Pay</span>
                    <span>Google Pay</span>
                </div>
                <h6>Надаємо</h6>
                <div className='productStickerRight'>
                    <span>Гарантію на товари до 3 років</span>
                    <span>Повернення /обмін протягом 14 днів</span>
                    <span>Знижки</span>
                    <span>Сертіфікати на розширенні гарантіі</span>
                </div>
            </div>
        </div>
    );
};

export default AllAboutProduct;