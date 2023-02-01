import {React, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';
import Modal from '../../Modal/Modal';
import AdminFormOrder from '../AdminMain/AdminFormOrder';

const AdminOrderContent = () => {
    const [active, setActive] = useState(false);

    const activeForm = () => {
        setActive(!active);
    }

    return (
        <div>
            <div className="admOrderContent">
                <span>Замовлення Покупців:</span>
                <div className='admOrderHeader'>
                    <button>Додати замовлення</button>
                </div>
                <input className='inputAdminOrder' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
                <ButtonSearch/>
            </div>
            <div className='admOrdersTable'>
            <table className='admListOrdersTable'>
                <thead>
                    <tr className='headerOrderTable'>
                        <th>Тип</th>
                        <th>Код</th>
                        <th>Дата</th>
                        <th>Дата оновлення</th>
                        <th>Покупець</th>
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
                        <td>2643020000000</td>
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
                            <button className='basketAdmGoods'
                                onClick={activeForm}>
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
            {active ?
                <Modal active={active} setActive={activeForm}>
                    <AdminFormOrder/>
                </Modal>  
                : null
            }
            
        </div>
    );
};

export default AdminOrderContent;