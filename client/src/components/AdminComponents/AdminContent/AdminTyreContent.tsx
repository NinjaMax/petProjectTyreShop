import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminTyreContent.css';
import { TyreContent } from './types/TyreContent.type';
import { ITyreContent } from './interfaces/TyreContent.interface';

const AdminTyreContent = (
    {props, showRowData, addTyreToOrder, sortTyres, value}: ITyreContent) => {
    const [newProps, setNewProps] = useState<any[] | null>(props);
    
    useEffect(() => {
        setNewProps(props);
    },[props, value])

    return (
        <div>
            <div className='admTyreTable'>
                <table className='admListTyreTable'>
                <thead>
                    <tr className='headerTyreTable'>
                        <th onClick={sortTyres}>Код 
                           <i className="fas fa-sort"></i>
                        </th>
                        <th>Назва товару
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortTyres}>Бренд
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortTyres}>Сезон
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortTyres}>Рік Виробн.
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortTyres}>Країна поход.
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortTyres}>Категорія
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Опції</th> 
                    </tr>
                </thead>    
                <tbody> 
                    {newProps ? newProps.map((item: TyreContent) => (
                    <tr key={'t' + item.id} 
                        onClick={showRowData} 
                        data-value={item.id}>
                        <td >{item.id}</td>
                        <td >{item.full_name}</td>
                        <td >{item.tyre_brand?.brand ?? ''}</td>
                        <td >{item.season?.season_ua ?? ''}</td>
                        <td >{item.year?.manufacture_year ?? ''}</td>
                        <td >{item.country?.country_manufacturer_ua ?? ''}</td>
                        <td >{item.category?.category ?? ''}</td>
                        <td  onClick={(e: any)=> e.preventDefault()}>
                            <button className='basketAdmTyre' value={item.id}
                                onClick={addTyreToOrder}>
                                <i className="fa fa-shopping-cart"></i>
                            </button>
                            <button className='editAdmTyre'>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className='closeAdmTyre'>
                                <i className="fa fa-remove"></i>
                            </button>                  
                        </td>
                    </tr> 
                    ))
                    : <tr><td>"Нема товарів"</td></tr>
                    }         
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default AdminTyreContent;