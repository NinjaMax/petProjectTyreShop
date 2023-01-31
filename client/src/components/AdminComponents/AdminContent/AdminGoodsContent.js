import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminGoodsContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';

const AdminGoodsContent = () => {
    return (
        <div>
            <div id="myDIV" className="headerGoods">
                <span>Каталог товарів:</span>
                <div className='admHeaderCatalog'>  
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    name='chooseGoodsCat' value='Шини'
                    type='radio'/>Шини</label>
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    name='chooseGoodsCat' value='Диски'
                    type='radio'/>Диски</label>
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    name='chooseGoodsCat' value='АКБ'
                    type='radio'/>АКБ</label>
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    name='chooseGoodsCat' value='Масла'
                    type='radio'/>Масла</label> 
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    name='chooseGoodsCat'value='Запчастини' 
                    type='radio'/>Запчастини</label>
                </div>
                <div className='admBtnSearch'>
                    <input className='inputAdminGoods' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
                    <ButtonSearch/>  
                </div>
            </div>
            <div className='admGoodsTable'>
            <table className='admListGoodsTable'>
                <thead>
                    <tr className='headerGoodsTable'>
                        <th>Код 
                           <i className="fas fa-sort"></i>
                        </th>
                        <th>Назва товару
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Сезон
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Рік Виробн.
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Країна поход.
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Категорія
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Опції</th> 
                    </tr>
                </thead>    
                <tbody> 
                    <tr>
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
            <table className='admStockGoodsTable'>
                <tbody>
                    <tr>
                        <th>Склад</th>
                        <th>Наявність</th>
                        <th>Резерв</th>
                        <th>Залишки</th>
                        <th>Ціна Закупка</th>
                        <th>Ціна Оптова</th>
                        <th>Ціна Роздріб</th>
                    </tr>
                    <tr>
                        <td>Прайс Постачальник</td>
                        <td>8</td>
                        <td>2</td>
                        <td>6</td>
                        <td>2000</td>
                        <td>2100</td>
                        <td>2300</td>
                    </tr>
                    <tr>
                        <td>Склад Основний</td>
                        <td>4</td>
                        <td>0</td>
                        <td>4</td>
                        <td>1950</td>
                        <td>2150</td>
                        <td>2380</td>
                    </tr>
                    
                </tbody>
            </table>    
        </div>
    );
};

export default AdminGoodsContent;