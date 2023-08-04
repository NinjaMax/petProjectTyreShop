import React from 'react';
import '../../css/Goods/ProductPayDel.css'; 

const ProductPayDel = () => {
    return (

        <div className='productPayDelBox'>
            <div>
                <h5>Доставляємо</h5>
                <div className='productPayDelBlock'>
                    <span>Доставка НОВОЮ ПОШТОЮ</span>
                    <span>Доставка УКР ПОШТОЮ</span>
                    <span>Доставка САТ</span>
                    <span>Самовивіз</span>
                </div>   
            </div>
            <div>
                <h5>Приймаємо</h5>
                <div className='productPayDelBlock'>    
                    <span>
                        <img src='./iconPayment/cash_48_b.png' 
                            width={48}
                            height={48}
                            alt='cash'
                            title='Можливість оплати готівкою'
                        />
                    </span>
                    <span>
                        <img src='./iconPayment/merchant_48_b.png' 
                            width={48}
                            height={48}
                            alt='merchant'
                            title='Можливість оплати по Безготівковому розрахунку'
                        />
                        
                    </span>
                    <span>
                        <img src='./iconPayment/cardVisaMaster.png' 
                            width={85}
                            height={30}
                            alt='card'
                            title='Можливість оплати картками VISA MASTERCARD'
                        />
                    </span>
                    <span>
                        <img src='./iconPayment/pay24.png' 
                            width={75}
                            height={30}
                            alt='cardPrivat'
                            title='Можливість оплати картками Приватбанку'
                        />
                    </span>
                    <span>
                        <img src='./iconPayment/monobank_logo_100.png' 
                            width={40}
                            height={40}
                            alt='monobank'
                            title='Можливість оплати картками Monobank'
                        />
                    </span>
                    <span>Apple Pay</span>
                    <span>Google Pay</span>
                </div>   
            </div>
            <div>
                <h5>Надаємо</h5>
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