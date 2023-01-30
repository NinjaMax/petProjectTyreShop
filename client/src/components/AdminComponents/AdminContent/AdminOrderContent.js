import React from 'react';
import ButtonSearch from '../../Buttons/ButtonSearch';

const AdminOrderContent = () => {
    return (
        <div>
            <div id="myDIV" className="headerGoods">
                <span>Замовлення:</span>
                <div className='admHeaderCatalog'>
                    <button>Додати замовлення</button>
                </div>
                <input className='inputAdminGoods' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
                <ButtonSearch/>
            </div>
            <div className='admGoodsTable'>
            <table className='admListGoodsTable'>
                <thead>
                    <tr className='headerGoodsTable'>
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
                    </tr>
                </thead>    
                <tbody >
                    
                    <tr >
                        <td>264302</td>
                        <td>BFGoodrich Activan 185/75 R16C 104/102R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>264299</td>
                        <td>BFGoodrich Activan 195/65 R16C 104/102R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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
                        <td>263127</td>
                        <td>BFGoodrich Activan 205/70 R15C 106/104R</td>
                        <td>Літо</td>
                        <td>2022</td>
                        <td>Румунія</td>
                        <td>Шини</td>
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

export default AdminOrderContent;