import React from 'react';
import '../../css/Goods/ProductPayDel.css'; 

const ProductPayDel = () => {
    return (
        <div className='productPayDelBox'>
            <div>
                <h5>Доставляємо</h5>
                <div className='productPayDelBlock'>
                    <span className='productPayDelNovaPoshta'>
                        <img src='/iconsDelivery/nova_Poshta_2022_logo.png' 
                            width={90}
                            height={40}
                            alt='deliveryNova'
                        />
                        <span className='tooltipProductPayDelNova'>
                            Термін доставки 1-3 дні від 60 грн/од
                        </span>
                    </span>
                    <span className='productPayDelDelivery'>
                        <img src='/iconsDelivery/delivery_logo.png' 
                            width={85}
                            height={37}
                            alt='deliveryDelivery'
                        />
                        <span className='tooltipProductPayDelDelivery'>
                            Термін доставки 1-3 дні від 40 грн/од
                        </span>
                    </span>
                    <span className='productPayDelPickUp'>
                        Самовивіз
                        <img src='/iconsDelivery/warehouse_55.png' 
                            width={48}
                            height={48}
                            alt='deliveryPickUp'
                        />
                        <span className='tooltipProductPayDelPickUp'>
                            Можливість самовивозу зі складу в м.Харків. 
                            Детальніше дізнатися у менеджера з продажу. 
                        </span>
                    </span>
                </div>   
            </div>
            <div>
                <h5>Приймаємо</h5>
                <div className='productPayDelBlock'>    
                    <span className='productPayDelCash'>
                        <img src='./iconPayment/cash_48_b.png' 
                            width={48}
                            height={48}
                            alt='cash'
                        />
                        <span className='tooltipProductPayDelCash'>
                        Можливість оплати готівкою
                        </span>
                    </span>
                    <span className='productPayDelBank'>
                        <img src='./iconPayment/merchant_48_b.png' 
                            width={48}
                            height={48}
                            alt='merchant'
                        />
                        <span className='tooltipProductPayDelBank'>
                        Можливість оплати по Безготівковому розрахунку
                        </span>
                    </span>
                    <span className='productPayDelVisa'>
                        <img src='./iconPayment/cardVisaMaster.png' 
                            width={85}
                            height={30}
                            alt='card'
                        />
                        <span className='tooltipProductPayDelVisaMaster'>
                        Можливість оплати картками VISA MASTERCARD
                        </span>
                    </span>
                    <span className='productPayDelPrivat'>
                        <img src='./iconPayment/pay24.png' 
                            width={75}
                            height={30}
                            alt='cardPrivat'
                        />
                        <span className='tooltipProductPayDelPrivat'>
                        Можливість оплати картками Приватбанку
                        </span>
                    </span>
                    <span className='productPayDelMono'>
                        <img src='./iconPayment/monobank_logo_100.png' 
                            width={40}
                            height={40}
                            alt='monobank'
                        />
                        <span className='tooltipProductPayDelMono'>
                        Можливість оплати картками Monobank
                        </span>
                    </span>
                </div>   
            </div>
            <div>
                <h5>Надаємо</h5>
                <div className='productPayDelBlock'>
                    <span className='productPayDelGaranty'>
                        Гарантію на товари до 3 років
                        <span className='tooltipProductPayDelGaranty'>
                        Гарантія від виробника
                        </span>
                    </span>
                    <span className='productPayDelReturn'>
                        Повернення /обмін протягом 14 днів
                        <span className='tooltipProductPayDelReturn'>
                        Повернення протягом 14 днів (якщо товар не єксплуатувався)
                        </span>
                    </span>
                    <span className='productPayDelBonus'>
                        Бонуси
                        <span className='tooltipProductPayDelBonus'>
                        Нараховуємо бонуси після покупки на всі групи товарів які можна використати при наступній покупці 
                        </span>
                    </span>
                    <span className='productPayDeSertificate'>
                        Сертіфікати на розширенні гарантіі
                        <span className='tooltipProductPayDeSertificate'>
                        Надаємо сертіфікати на розширену гарантію до товарів
                        </span>
                    </span>
                </div>  
            </div>    
        </div>
    );
};

export default ProductPayDel;