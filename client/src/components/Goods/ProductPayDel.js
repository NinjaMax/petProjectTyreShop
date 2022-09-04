import React from 'react';
import '../../css/Goods/ProductPayDel.css'; 

const ProductPayDel = () => {
    return (

        <div className='productPayDelBox'>
            <div>
                <h6>Доставляємо</h6>
                <div className='productPayDelBlock'>
                    <span>Доставка НОВОЮ ПОШТОЮ</span>
                    <span>Доставка УКР ПОШТОЮ</span>
                    <span>Доставка САТ</span>
                    <span>Самовивіз</span>
                </div>   
            </div>
            <div>
                <h6>Приймаємо</h6>
                <div className='productPayDelBlock'>    
                    <span>Готівка</span>
                    <span>Безготівковий розрахунок</span>
                    <span>VISA</span>
                    <span>Mastercard</span>
                    <span>24 Pay</span>
                    <span>Mono</span>
                    <span>Apple Pay</span>
                    <span>Google Pay</span>
                </div>   
            </div>
            <div>
                <h6>Надаємо</h6>
                <div className='productPayDelBlock'>
                    <span>Гарантію на товари до 3 років</span>
                    <span>Повернення /обмін протягом 14 днів</span>
                    <span>Знижки</span>
                    <span>Сертіфікати на розширенні гарантіі</span>
                </div>  
            </div>    
        </div>
    );
};

export default ProductPayDel;