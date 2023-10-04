import React from 'react';
import '../css/Pages/DeliveryPage.css';
import MapDelivery from '../components/maps/MapDelivery';
import { createStringUrl } from '../services/stringUrl';
import { DELIVERY_GOODS_ROUTE } from '../utils/consts';

const DeliveryPage = () => {
  
  const addDeliveryLink = (e: any) => {
    localStorage.setItem('regionData', e.currentTarget.getAttribute('data-region'));
  };

  return (
    <div className='deliveryPageContainer'>
      <h2>
        Доставка і оплата
      </h2>
      <div className='deliveryPageBox'>
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
        </div>
        <div className='deliveryPageRegionList'>
          
          <ul className='deliveryPageRegionListUl'>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Сімферопіль АРК')}
                data-region='Сімферопіль,АРК'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в АРК'
              >
                АРК
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Вінниця Вінницька область')}
                data-region='Вінниця,Вінницька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Вінницька область'
              >
                Вінницька область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Луцьк Волинська область')}
                data-region='Луцьк,Волинська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Волинська область'
              >
                Волинська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Дніпро Дніпропетровська область')}
                data-region='Дніпро,Дніпропетровська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Дніпропетровська область'
              >
                Дніпропетровська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Краматорськ Донецька область')}
                data-region='Краматорськ,Донецька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Донецька область'
              >
                Донецька область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Житомир Житомирська область')}
                data-region='Житомир,Житомирська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Житомирська область'
              >
                Житомирська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Ужгород Закарпатська область')}
                data-region='Ужгород,Закарпатська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Закарпатська область'
              >
                Закарпатська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Запоріжжя Запорізька область')}
                data-region='Запоріжжя,Запорізька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Запорізька область'
              >
                Запорізька область
              </a>
            </li>
          </ul>
          <ul className='deliveryPageRegionListUl'>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Івано-Франківськ Івано-Франківська область')}
                data-region='Івано-Франківськ,Івано-Франківська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Івано-Франківська область'
              >
                Івано-Франківська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Київ Київська область')}
                data-region='Київ,Київська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Київська область'
              >
                Київська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Кропивницький Кіровоградська область')}
                data-region='Кропивницький,Кіровоградська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Кіровоградська область'
              >
                Кіровоградська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Луганськ Луганська область')}
                data-region='Луганськ,Луганська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Луганська область'
              >
                Луганська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Львів Львівська область')}
                data-region='Львів,Львівська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Львівська область'
              >
                Львівська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Миколаїв Миколаївська область')}
                data-region='Миколаїв,Миколаївська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Миколаївська область'
              >
                Миколаївська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Одеса Одеська область')}
                data-region='Одеса,Одеська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Одеська область'
              >
                Одеська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Полтава Полтавська область')}
                data-region='Полтава,Полтавська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Полтавська область'
              >
                Полтавська область
              </a>
            </li>
          </ul>
          <ul className='deliveryPageRegionListUl'>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Рівне Рівненська область')}
                data-region='Рівне,Рівненська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Рівненська область'
              >
                Рівненська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Суми Сумська область')}
                data-region='Суми,Сумська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Сумська область'
              >
                Сумська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Тернопіль Тернопільська область')}
                data-region='Тернопіль,Тернопільська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Тернопільська область'
              >
                Тернопільська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Харків Харківська область')}
                data-region='Харків,Харківська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Харківська область'
              >
                Харківська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Херсон Херсонська область')}
                data-region='Херсон,Херсонська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Херсонська область'
              >
                Херсонська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Хмельницький Хмельницька область')}
                data-region='Хмельницький,Хмельницька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Хмельницька область'
              >
                Хмельницька область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Черкаси Черкаська область')}
                data-region='Черкаси,Черкаська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Черкаська область'
              >
                Черкаська область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Чернівці, Чернівецька область')}
                data-region='Чернівці,Чернівецька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Чернівецька область'
              >
                Чернівецька область
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Чернігів, Чернігівська область')}
                data-region='Чернігів,Чернігівська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Чернігівська область'
              >
                Чернігівська область
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DeliveryPage