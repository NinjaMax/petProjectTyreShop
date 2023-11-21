import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminWheelContent.css';
import { IAdminWheelContent } from './interfaces/WheelContent.interface';
import { FixedSizeList  as List } from 'react-window';
import SpinnerCarRot from '../../spinners/SpinnerCarRot';
import Modal from '../../modal/Modal';

const AdminWheelContent = (
    {
        props,
        showRowData,
        addWheelToOrder,
        value,
        showRowImage,
        activeShowImage,
        setActiveShowImage,
        sortWheels
    }: IAdminWheelContent
    ) => {

    const tableWheelRow = ({index, style}: any) => (
        <div className='admWheelGridItem' style={style}
            onClick={showRowData} 
            data-value={props![index].id}
        >
            <div>{props![index].id}</div>
            <div>{props![index].full_name_color}</div>
            <div>{props![index].wheel_brand?.brand ?? ''}</div>
            <div>{props![index].type?.type ?? ''}</div>
            <div>{props![index].color?.color_short ?? ''}</div>
            <div>{props![index].country?.country_manufacturer_ua ?? ''}</div>
            <div>{props![index].category?.chapter ?? ''}</div>
            <div>{props![index].category?.category ?? ''}</div>
            <div className='admWheelGridItemBtn'  
                onClick={(e: any)=> e.preventDefault()}>
                <button 
                    className='basketAdmWheel' 
                    value={props![index].id}
                    onClick={addWheelToOrder}>
                    <i className="fa fa-shopping-cart"></i>
                </button>
                <button className='editAdmWheel'>
                    <i className="fas fa-edit"></i>
                </button>
                <button 
                    className='eyeAdmTyre'
                    value={`/disk/vossen_cvt_gloss_graphite-16325-a.png,${props![index].full_name_color}`}
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
            <div className='admWheelTable'>
            <table className='admListWheelTable'>
                <thead>
                    <tr className='headerWheelTable'>
                        <th className='headerWheelTableCode'
                            onClick={sortWheels}>Код 
                           <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerWheelTableName'
                            onClick={sortWheels}>Назва товару
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerWheelTableBrand'
                            onClick={sortWheels}>Бренд
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerWheelTableType'
                            onClick={sortWheels}>Тип Диску
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerWheelTableColor'
                            onClick={sortWheels}>Цвіт
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerWheelTableCat'
                            onClick={sortWheels}>Категорія
                            <i className="fas fa-sort"></i>
                        </th>
                        <th className='headerWheelTableCatCh'
                            onClick={sortWheels}>Категорія
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Опції</th> 
                    </tr>
                </thead>    
                <tbody> 
                </tbody>
            </table>
            <List
                className="admWheelTableColmId"
                itemCount={props?.length}
                itemSize={61}
                height={295}
                width={1320}
            >
                {tableWheelRow}
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
            alt='wheelRowImage'
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

export default AdminWheelContent;