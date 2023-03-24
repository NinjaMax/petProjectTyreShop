import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminWheelContent.css';

interface IAdminWheelContent {
    props: any[] | null;
    showRowData(arg0: any):void;
    addWheelToOrder(arg0: any): void;
}

type IWheelContentItem = {
    id: number;
    full_name_color: string;
    type: {type: string;};
    color: {color_short: string}
    category:{category: string}
}


const AdminWheelContent = (
    {props, showRowData, addWheelToOrder}: IAdminWheelContent
    ) => {
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
                {props ? props.map((item: IWheelContentItem) => (
                
                <tr key={'w' + item.id} onClick={showRowData} 
                    data-value={item.id}>
                    <td >{item.id}</td>
                    <td >{item.full_name_color}</td>
                    <td >{item.type?.type ?? ''}</td>
                    <td >{item.color?.color_short ?? ''}</td>
                    <td >{item.category?.category ?? ''}</td>
                    <td  onClick={(e)=>e.preventDefault()}>
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