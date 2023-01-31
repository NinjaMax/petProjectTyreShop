import React from 'react';
import ButtonSearch from '../../Buttons/ButtonSearch';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderSupContent.css';

const AdminOrderSupContent = () => {
    return (
        <div>
        <div className="admOrderSupContent">
            <span>Замовлення Постачальника:</span>
            <div className='admOrderSupHeader'>
                <button>Додати замовлення</button>
            </div>
            <input className='inputAdminOrderSup' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch/>
        </div>
        <div className='admOrdersSupTable'>
        <table className='admListOrdersSupTable'>
            <thead>
                <tr className='headerOrderSupTable'>
                    <th>Тип</th>
                    <th>Код</th>
                    <th>Дата</th>
                    <th>Дата оновлення</th>
                    <th>Поcтачальник</th>
                    <th>Склад</th>
                    <th>Сума</th>
                    <th>Статус</th>
                    <th>Тип замовлення</th>
                    <th>Статус Доставки</th>
                    <th>Перевізник</th>
                    <th>Статус Оплати</th>
                    <th>Тип оплати</th>
                    <th>Користувач</th>
                    <th>Коментар</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <td>V</td>
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Интершина(Київ)</td>
                    <td>Склад Поставщик</td>
                    <td>11200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr> 
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr> 
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr> 
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr> 
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>  
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>  
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>    
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>        
                <tr>
                <td>V</td>
                    <td>264302</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Тімошенко Н.В.</td>
                    <td>Склад Поставщик</td>
                    <td>10200.00</td>
                    <td>Новий</td>
                    <td>Сайт</td>
                    <td>Доставляеться</td>
                    <td>Нова Пошта</td>
                    <td>Очікує Оплати</td>
                    <td>Карта</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>                  
            </tbody>
        </table>
        </div> 
    </div>
    );
};

export default AdminOrderSupContent;