import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminTyreContent.css';
import { TyreContent } from './types/TyreContent.type';
import { ITyreContent } from './interfaces/TyreContent.interface';
import { FixedSizeList  as List } from 'react-window';

const AdminTyreContent = (
    {props, showRowData, addTyreToOrder, sortTyres, value}: ITyreContent) => {
    // const [newProps, setNewProps] = useState<any[] | null>(props);

    const arrColumnHeader = ['Назва товару', 'Бренд', 'Сезон', 'Рік Виробн', 'Країна поход', 'Тип транс'];
    // useEffect(() => {
    //     setNewProps(props);
    // },[props, value])

    const tableTyreRow = ({index, style}: any) => (
        <div className='admTyreGridItem' style={style}
            onClick={showRowData} 
            data-value={props![index].id}
        >
            <div>{props![index].id}</div>
            <div>{props![index].full_name}</div>
            <div>{props![index].tyre_brand?.brand ?? ''}</div>
            <div>{props![index].season?.season_ua ?? ''}</div>
            <div>{props![index].year?.manufacture_year ?? ''}</div>
            <div>{props![index].country?.country_manufacturer_ua ?? ''}</div>
            <div>{props![index].category?.chapter ?? ''}</div>
            <div>{props![index].vehicle_type?.vehicle_type_ua ?? ''}</div>
            <div className='admTyreGridItemBtn'  
                onClick={(e: any)=> e.preventDefault()}>
                <button 
                    className='basketAdmTyre' 
                    value={props![index].id}
                    onClick={addTyreToOrder}>
                    <i className="fa fa-shopping-cart"></i>
                </button>
                <button className='editAdmTyre'>
                    <i className="fas fa-edit"></i>
                </button>
                {/* <button className='closeAdmTyre'>
                    <i className="fa fa-remove"></i>
                </button>                   */}
            </div>
        </div>
    );

    return (
        <div>
            {props ?
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
                        <th onClick={sortTyres}>Тип транс
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Опції</th> 
                    </tr>
                </thead>  
                </table>           
                <List
                    className="admTyreTableColmId"
                    itemCount={props?.length}
                    itemSize={45}
                    height={295}
                    width={1320}
                >
                    {tableTyreRow}
                </List>
            </div>
            : null
            }
        </div>
    );
};

export default AdminTyreContent;