import React from 'react';
import '../css/Pages/DeliveryPage.css';
import MapDelivery from '../components/maps/MapDelivery';
import { createStringUrl } from '../services/stringUrl';
import { DELIVERY_GOODS_ROUTE } from '../utils/consts';
import { useTranslation } from 'react-i18next';

const DeliveryPage = () => {
  const { t, i18n } = useTranslation();

  const addDeliveryLink = (e: any) => {
    localStorage.setItem('regionData', e.currentTarget.getAttribute('data-region'));
  };

  return (
    <div className='deliveryPageContainer'>
      <h2>
        {t('deliveryPage.title')}
      </h2>
      <div className='deliveryPageBox'>
        {i18n.resolvedLanguage === 'uk' ?
          <div className='deliveryPageText'>
            <span className='deliveryPageTextHeader'>Доставка</span>
            <br/>
            Доставка по Україні здійснюється транспортними компаніями «Нова Пошта», Delivery
            Вартість доставки додається до замовлення клієнта.
            Клієнт може самостійно сплатити доставку на відділення перевізника таким чином сума доставки буде вищою за надану нашим магазином
            Вартість доставки шин-дисків для спецтехніка, сільгосп-техніки обговорюється індивідуально
            Доставка в середньому займає 2-3 дні.<p/>
            Зверніть увагу товар на відділення "Нова Пошта" та "Delivery" зберігаються безкоштовно 7 календарних днів. З 8-го дня нараховується платне зберігання.
            Вартість доплати за доставку легкових шин та дисків біля села (Україною) – від 25 грн., вантажних від 40 грн., за одиницю.
            <p/>
            <span className='deliveryPageTextHeader'>Оплата</span>
            <br/>
            Післяплата (Наложений платіж) Оплата товару здійснюється після отримання товару на відділення транспортної компанії «Нова Пошта» та «Delivery».
            Безготівковий розрахунок,  фізичні особи можуть оплатити замовлення через будь-який зручний банк для них. Більше інформації ви можете отримати у менеджера.
            <p>Перелік регіонів в які здійснюється доставка:</p>
          </div> :
          <div className='deliveryPageText'>
            <span className='deliveryPageTextHeader'>Доставка</span>
            <br/>
            Доставка по Украине осуществляется транспортными компаниями «Новая Почта», Delivery
            Стоимость доставки прилагается к заказу клиента.
            Клиент может самостоятельно оплатить доставку на отделение перевозчика таким образом сумма доставки будет выше предоставленной нашим магазином
            Стоимость доставки шин-дисков для спецтехники, сельхозтехники оговаривается индивидуально.
            Доставка в среднем занимает 2-3 дня.<p/>
            Обратите внимание товары на отделения "Новая Почта" и "Delivery" хранятся бесплатно 7 календарных дней. С 8 дня начисляется платное хранение.
            Стоимость доплаты за доставку легковых шин и дисков возле села (Украина) – от 25 грн., грузовых от 40 грн., за единицу.
            <p/>
            <span className='deliveryPageTextHeader'>Оплата</span>
            <br/>
            Наложенный платеж (Наложенный платеж) Оплата товара осуществляется после получения товара на отделение транспортной компании «Новая Почта» и «Delivery».
            Безналичный расчет, физические лица могут оплатить заказ через любой удобный банк для них. Больше информации вы можете получить у менеджера.
            <p>Перечень регионов, в которые осуществляется доставка:</p>
          </div>
        }
        <div className='deliveryPageRegionList'>
          <ul className='deliveryPageRegionListUl'>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.cremea_string'))}
                data-region={t('deliveryPage.cremea_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.cremea_title')}
              >
                {t('deliveryPage.cremea_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.vinnica_string'))}
                data-region={t('deliveryPage.vinnica_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.vinnica_title')}
              >
                {t('deliveryPage.vinnicka_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.volinska_string'))}
                data-region={t('deliveryPage.volinska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.volinska_title')}
              >
                {t('deliveryPage.volinska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.dniprovska_string'))}
                data-region={t('deliveryPage.dniprovska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.dniprovska_title')}
              >
                {t('deliveryPage.dniprovska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.donecka_string'))}
                data-region={t('deliveryPage.donecka_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.donecka_title')}
              >
                {t('deliveryPage.donecka_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.gitomirska_string'))}
                data-region={t('deliveryPage.gitomirska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.gitomirska_title')}
              >
                {t('deliveryPage.gitomirska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.zakarpat_string'))}
                data-region={t('deliveryPage.zakarpat_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.zakarpat_title')}
              >
                {t('deliveryPage.zakarpat_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.zaporogs_string'))}
                data-region={t('deliveryPage.zaporogs_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.zaporogs_title')}
              >
                {t('deliveryPage.zaporogs_obl')}
              </a>
            </li>
          </ul>
          <ul className='deliveryPageRegionListUl'>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.ivanofr_string'))}
                data-region={t('deliveryPage.ivanofr_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.ivanofr_title')}
              >
                {t('deliveryPage.ivanofr_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.kiivska_string'))}
                data-region={t('deliveryPage.kiivska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.kiivska_title')}
              >
                {t('deliveryPage.kiivska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.kirovogr_string'))}
                data-region={t('deliveryPage.kirovogr_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.kirovogr_title')}
              >
                {t('deliveryPage.kirovogr_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.lygansk_string'))}
                data-region={t('deliveryPage.lygansk_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.lygansk_title')}
              >
                {t('deliveryPage.lygansk_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.lvivska_string'))}
                data-region={t('deliveryPage.lvivska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.lvivska_title')}
              >
                {t('deliveryPage.lvivska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.mikolaivska_string'))}
                data-region={t('deliveryPage.mikolaivska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.mikolaivska_title')}
              >
                {t('deliveryPage.mikolaivska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.odeska_string'))}
                data-region={t('deliveryPage.odeska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.odeska_title')}
              >
                {t('deliveryPage.odeska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.poltavska_string'))}
                data-region={t('deliveryPage.poltavska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.poltavska_title')}
              >
                {t('deliveryPage.poltavska_obl')}
              </a>
            </li>
          </ul>
          <ul className='deliveryPageRegionListUl'>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.rivenska_string'))}
                data-region={t('deliveryPage.rivenska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.rivenska_title')}
              >
                {t('deliveryPage.rivenska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.sumska_string'))}
                data-region={t('deliveryPage.sumska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.sumska_title')}
              >
                {t('deliveryPage.sumska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.ternopilska_string'))}
                data-region={t('deliveryPage.ternopilska_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.ternopilska_title')}
              >
                {t('deliveryPage.ternopilska_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.kharkiv_string'))}
                data-region={t('deliveryPage.kharkiv_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.kharkiv_title')}
              >
                {t('deliveryPage.kharkiv_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.kherson_string'))}
                data-region={t('deliveryPage.kherson_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.kherson_title')}
              >
                {t('deliveryPage.kherson_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.khmeln_string'))}
                data-region={t('deliveryPage.khmeln_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.khmeln_title')}
              >
                {t('deliveryPage.khmeln_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.cherkas_string'))}
                data-region={t('deliveryPage.cherkas_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.cherkas_title')}
              >
                {t('deliveryPage.cherkas_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.chernivec_string'))}
                data-region={t('deliveryPage.chernivec_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.chernivec_title')}
              >
                {t('deliveryPage.chernivec_obl')}
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl(t('deliveryPage.chernigiv_string'))}
                data-region={t('deliveryPage.chernigiv_region')}
                onClick={addDeliveryLink}
                title={t('deliveryPage.chernigiv_title')}
              >
                {t('deliveryPage.chernigiv_obl')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DeliveryPage