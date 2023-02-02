import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminPayExpenseContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';

const AdminPayExpensesContent = () => {
    return (
        <div>
        <div className="admExpenseContent">
            <span>Платежі вихідні:</span>
            <div className='admExpenseHeader'>
                <button>Додати замовлення</button>
            </div>
            <input className='inputAdminExpense' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch/>
        </div>
        <div className='admExpenseTable'>
        <table className='admListExpenseTable'>
            <thead>
                <tr className='headerExpenseTable'>
                    <th>Тип</th>
                    <th>Код</th>
                    <th>Дата</th>
                    <th>Дата оновлення</th>
                    <th>Вид Платежа</th>
                    <th>Каса</th>
                    <th>Сума</th>
                    <th>Статус</th>
                    <th>Тип платежа</th>
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
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Оплата Поcтачальнику</td>
                    <td>Михайло</td>
                    <td>Треба уточнення</td>
                    <td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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
                    <td>264302000</td>
                    <td>02.01.2023</td>
                    <td>25.01.2023</td>
                    <td>Б/н</td>
                    <td>ФОП Гайворонский</td>
                    <td>11200.00</td>
                    <td>Оплачено</td>
                    <td>Продажа Товара</td>
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

export default AdminPayExpensesContent;