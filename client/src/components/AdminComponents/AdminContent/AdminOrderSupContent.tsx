import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderSupContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalOrderSup from '../adminModalForm/AdminModalOrderSup';

interface IOrderSupContent {
    
    props:[[] | null, ...[][] | null[]];
    customer?:{} | null;
    storage?:[] | null;
    comments?:[] | null;
    //stockByIdTyre?:[]; 
    // tyreStockData:[];
    // tyrePriceData:[];
    // wheelData:[]; 
    // wheelPriceData:[];
    // wheelStockData:[]; 
}

const AdminOrderSupContent = (
    {props, storage, customer, comments}: IOrderSupContent) => {
    const [createOrdSup, setCreateOrdSup] = useState(false);

    const createOrdSupBtn = () => {
        setCreateOrdSup(!createOrdSup);
    };

    return (
        <div>
        <div className="admOrderSupContent">
            <span>Замовлення Постачальника:</span>
            <div className='admOrderSupHeader'>
                <button className='admOrderSupAddOrderBtn'
                    onClick={createOrdSupBtn}>Додати замовлення
                </button>
            </div>
            <input className='inputAdminOrderSup' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch clickSearchBtn={undefined}/>
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
                            <i className="fas fa-warehouse"></i>
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
        <div className='admOrderSupCommitGroup'>
                <table className='admOrderSupCommitTable'>
                <thead>
                    <tr>
                        <th>Замовлення</th>
                        <th>Користувач</th>
                        <th>Дата</th>
                        <th>Коментар</th>
                    </tr>  
                </thead>
                <tbody>
                    <tr>
                        <td>100255</td>
                        <td>Миколай</td>
                        <td>02.02.2023</td>
                        <td>Треба передзвоники кліенту та домовитись про адресну доставку</td>
                    </tr>
                    <tr>
                        <td>100255</td>
                        <td>Кирило</td>
                        <td>02.02.2023</td>
                        <td>Кліент буде буде опалчувати по безготівковому розрахунку. Тількт б/г с ПДВ. Важливо.</td>
                    </tr>
                    <tr>
                        <td>100255</td>
                        <td>Миколай</td>
                        <td>02.02.2023</td>
                        <td>Оплата є. ТАкож після приходу хоче ще звробити замовлення. Обовязково передзвонити. Приблизно через неділю.</td>
                    </tr>
                    <tr>
                        <td>100255</td>
                        <td>Кирило</td>
                        <td>02.02.2023</td>
                        <td>Кліент буде буде опалчувати по безготівковому розрахунку. Тількт б/г с ПДВ. Важливо.</td>
                    </tr>
                    <tr>
                        <td>100255</td>
                        <td>Миколай</td>
                        <td>02.02.2023</td>
                        <td>Оплата є. ТАкож після приходу хоче ще звробити замовлення. Обовязково передзвонити. Приблизно через неділю.</td>
                    </tr>     
                </tbody>
                </table>       
            </div> 
            {createOrdSup ? 
            <ModalAdmin active={createOrdSup} setActive={setCreateOrdSup}>
                <AdminModalOrderSup 
                    storage={storage}/>
            </ModalAdmin>
            : null
        }
    </div>
    );
};

export default AdminOrderSupContent;