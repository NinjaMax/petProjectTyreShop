import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminWheelContent.css';

const AdminWheelContent = ({props, showRowData, addWheelToOrder}) => {
    return (
        <div>
            <div className='admWheelTable'>
            <table className='admListWheelTable'>
                <thead>
                    <tr className='headerWheelTable'>
                        <th>Код 
                           <i className="fas fa-sort"></i>
                        </th>
                        <th>Назва товару
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Тип Диску
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Цвіт короткий
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
                
                <tr key={'w' + item.id} onClick={showRowData} value={item.id}>
                    <td key={'wid' + item.id}>{item.id}</td>
                    <td key={'tn' + item.id}>{item.full_name_color}</td>
                    <td key={'ts' + item.id}>{item.type?.type ?? ''}</td>
                    <td key={'ty' + item.id}>{item.color?.color_short ?? ''}</td>
                    <td key={'tca' + item.id}>{item.category?.category ?? ''}</td>
                    <td key={'t' + item.id} onClick={(e)=>e.preventDefault({passive: false})}>
                            <button className='basketAdmWheel' value={item.id} 
                                onClick={addWheelToOrder}>
                                <i className="fa fa-shopping-cart"></i>
                            </button>
                            <button className='editAdmWheel'>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className='closeAdmWheel'>
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

export default AdminWheelContent;