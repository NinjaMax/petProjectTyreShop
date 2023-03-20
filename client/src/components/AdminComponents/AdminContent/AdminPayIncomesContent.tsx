import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminPayIncomesContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalPayIncome from '../adminModalForm/AdminModalPayIncome';

const AdminPayIncomesContent = () => {
    const [incomePay, setIncomePay] = useState(false);

    const createIncPay = () => {
        setIncomePay(!incomePay);
    };

    return (
        <div>
        <div className="admIncomesContent">
            <span>Платежі вхідні:</span>
            <div className='admIncomesHeader'>
                <button className='admIncomesAddBtn'
                    onClick={createIncPay}>Додати платіж
                </button>
            </div>
            <input className='inputAdminIncomes' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch clickSearchBtn={undefined}/>
        </div>
        <div className='admIncomesTable'>
        <table className='admListIncomesTable'>
            <thead>
                <tr className='headerIncomesTable'>
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
                    <td>Продажа Товара</td>
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
        {incomePay ?
            <ModalAdmin active={incomePay} setActive={setIncomePay}>
                <AdminModalPayIncome/>
            </ModalAdmin> : null
        } 
    </div>
    );
};

export default AdminPayIncomesContent;