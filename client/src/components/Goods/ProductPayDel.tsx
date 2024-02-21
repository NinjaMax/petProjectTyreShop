import React from 'react';
import '../../css/Goods/ProductPayDel.css'; 
import { useTranslation } from 'react-i18next';

const ProductPayDel = () => {
    const { t } = useTranslation();

    return (
        <div className='productPayDelBox'>
            <div>
                <h5>{t('productPerDay.delivery')}</h5>
                <div className='productPayDelBlock'>
                    <span className='productPayDelNovaPoshta'>
                        <img 
                            loading='lazy'
                            decoding='async'
                            src='/iconsDelivery/nova_Poshta_2022_logo.webp' 
                            width={90}
                            height={40}
                            alt='deliveryNova'
                        />
                        <span className='tooltipProductPayDelNova'>
                            {t('productPerDay.nova_poshta_tooltip')}
                        </span>
                    </span>
                    <span className='productPayDelDelivery'>
                        <img 
                            loading='lazy'
                            decoding='async'
                            src='/iconsDelivery/delivery_logo.webp' 
                            width={85}
                            height={37}
                            alt='deliveryDelivery'
                        />
                        <span className='tooltipProductPayDelDelivery'>
                            {t('productPerDay.delivery_tooltip')}
                        </span>
                    </span>
                    <span className='productPayDelPickUp'>
                        {t('productPerDay.take_off')}
                        <img 
                            loading='lazy'
                            decoding='async'
                            src='/iconsDelivery/warehouse_55.webp' 
                            width={48}
                            height={48}
                            alt='deliveryPickUp'
                        />
                        <span className='tooltipProductPayDelPickUp'>
                            {t('productPerDay.take_off_tooltip')}
                        </span>
                    </span>
                </div>   
            </div>
            <div>
                <h5>{t('productPerDay.accept')}</h5>
                <div className='productPayDelBlock'>    
                    <span className='productPayDelCash'>
                        <img 
                            loading='lazy'
                            decoding='async'
                            src='/iconPayment/cash_48_b.webp' 
                            width={48}
                            height={48}
                            alt='cash'
                        />
                        <span className='tooltipProductPayDelCash'>
                        {t('productPerDay.accept_cash_tooltip')}
                        </span>
                    </span>
                    <span className='productPayDelBank'>
                        <img 
                            loading='lazy'
                            decoding='async'
                            src='/iconPayment/merchant_48_b.webp' 
                            width={48}
                            height={48}
                            alt='merchant'
                        />
                        <span className='tooltipProductPayDelBank'>
                        {t('productPerDay.accept_invoic_tooltip')}
                        </span>
                    </span>
                    <span className='productPayDelVisa'>
                        <img 
                            loading='lazy'
                            decoding='async'
                            src='/iconPayment/cardVisaMaster.webp' 
                            width={85}
                            height={30}
                            alt='card'
                        />
                        <span className='tooltipProductPayDelVisaMaster'>
                        {t('productPerDay.accept_visa_tooltip')}
                        </span>
                    </span>
                    <span className='productPayDelPrivat'>
                        <img 
                            loading='lazy'
                            decoding='async'
                            src='/iconPayment/pay24.webp' 
                            width={75}
                            height={30}
                            alt='cardPrivat'
                        />
                        <span className='tooltipProductPayDelPrivat'>
                        {t('productPerDay.accept_privat_tooltip')}
                        </span>
                    </span>
                    <span className='productPayDelMono'>
                        <img 
                            loading='lazy'
                            decoding='async'
                            src='/iconPayment/monobank_logo_100.webp' 
                            width={40}
                            height={40}
                            alt='monobank'
                        />
                        <span className='tooltipProductPayDelMono'>
                        {t('productPerDay.accept_mono_tooltip')}
                        </span>
                    </span>
                </div>   
            </div>
            <div>
                <h5>{t('productPerDay.provide')}</h5>
                <div className='productPayDelBlock'>
                    <span className='productPayDelGaranty'>
                        {t('productPerDay.provide_garanty')}
                        <span className='tooltipProductPayDelGaranty'>
                        {t('productPerDay.provide_garanty_tooltip')}
                        </span>
                    </span>
                    <span className='productPayDelReturn'>
                        {t('productPerDay.provide_return')}
                        <span className='tooltipProductPayDelReturn'>
                        {t('productPerDay.provide_return_tooltip')}
                        </span>
                    </span>
                    <span className='productPayDelBonus'>
                        {t('productPerDay.provide_bonuse')}
                        <span className='tooltipProductPayDelBonus'>
                        {t('productPerDay.provide_bonus_tooltip')}
                        </span>
                    </span>
                    <span className='productPayDeSertificate'>
                        {t('productPerDay.provide_sert')}
                        <span className='tooltipProductPayDeSertificate'>
                        {t('productPerDay.provide_sert_tooltip')}
                        </span>
                    </span>
                </div>  
            </div>    
        </div>
    );
};

export default ProductPayDel;