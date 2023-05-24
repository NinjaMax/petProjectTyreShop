import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminWheelContent.css';
import { IWheelContentItem } from './types/WheelContent.type';
import { IAdminWheelContent } from './interfaces/WheelContent.interface';

const AdminWheelContent = (
    {
        props,
        showRowData,
        addWheelToOrder,
        value,
        sortWheels
    }: IAdminWheelContent
    ) => {
    const [newProps, setNewProps] = useState<any[] | null>(props);
    
    useEffect(() => {
        setNewProps(props);
    },[props, value])

    return (
        <div>
            <div className='admWheelTable'>
            <table className='admListWheelTable'>
                <thead>
                    <tr className='headerWheelTable'>
                        <th onClick={sortWheels}>Код 
                           <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortWheels}>Назва товару
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortWheels}>Бренд
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortWheels}>Тип Диску
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortWheels}>Цвіт короткий
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortWheels}>Категорія
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Опції</th> 
                    </tr>
                </thead>    
                <tbody> 
                {newProps ? newProps.map((item: IWheelContentItem) => (
                <tr key={'w' + item.id} 
                    onClick={showRowData} 
                    data-value={item.id}>
                    <td >{item.id}</td>
                    <td >{item.full_name_color}</td>
                    <td >{item.wheel_brand?.brand}</td>
                    <td >{item.type?.type ?? ''}</td>
                    <td >{item.color?.color_short ?? ''}</td>
                    <td >{item.category?.category ?? ''}</td>
                    <td  onClick={(e)=> e.preventDefault()}>
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