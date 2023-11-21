import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminTyreContent.css';
import { ITyreContent } from './interfaces/TyreContent.interface';
import { FixedSizeList  as List } from 'react-window';
import SpinnerCarRot from '../../spinners/SpinnerCarRot';
import Modal from '../../modal/Modal';

const AdminTyreContent = ({
    props, 
    showRowData, 
    addTyreToOrder, 
    sortTyres,
    showRowImage,
    activeShowImage,
    setActiveShowImage,
    value
}: ITyreContent) => {

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
                <button 
                    className='eyeAdmTyre'
                    value={`/tyre/autotyrespilotspotps2.png,${props![index].full_name}`}
                    onClick={showRowImage}
                >   
                    <i className="fas fa-eye"></i>
                </button>                  
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
                        <th className='headerTyreTableCode'
                            onClick={sortTyres}>Код 
                           <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerTyreTableName'
                            onClick={sortTyres}
                            >Назва товару
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerTyreTableBrand'
                            onClick={sortTyres}>Бренд
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerTyreTableSeason'
                            onClick={sortTyres}>Сезон
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerTyreTableYear'
                            onClick={sortTyres}>Рік
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerTyreTableCounty'
                            onClick={sortTyres}>Країна
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerTyreTableCat'
                            onClick={sortTyres}>Категорія
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerTyreTableType'
                            onClick={sortTyres}>Тип транс
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
            : <SpinnerCarRot/>
            }
            <Modal 
                active={activeShowImage} 
                setActive={setActiveShowImage} 
            >
            {value ?
            <>
            <img 
                src={value![0]} 
                alt='tyreRowImage'
                width={200}
                height={200}
            /><br/> 
            <span>{value![1]}</span>
            </>
            : <span>Немає фото</span>
            }  
            </Modal>
        </div>
    );
};

export default AdminTyreContent;