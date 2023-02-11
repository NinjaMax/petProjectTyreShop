import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminTyreContent.css';

const AdminTyreContent = ({props, showRowData}) => {

    return (
        <div>
            <div className='admTyreTable'>
                <table className='admListTyreTable'>
                <thead>
                    <tr className='headerTyreTable'>
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
                    {props ? props.map((item) => (
                
                    <tr key={'t' + item.id} onClick={showRowData} value={item.id}>
                        <td key={'tid' + item.id}>{item.id}</td>
                        <td key={'tn' + item.id}>{item.full_name}</td>
                        <td key={'ts' + item.id}>{item.season?.season_ua ?? ''}</td>
                        <td key={'ty' + item.id}>{item.year?.manufacture_year ?? ''}</td>
                        <td key={'tc' + item.id}>{item.country?.country_manufacturer_ua ?? ''}</td>
                        <td key={'tca' + item.id}>{item.category?.category ?? ''}</td>
                        <td key={'t' + item.id}>
                            <button className='basketAdmTyre'>
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