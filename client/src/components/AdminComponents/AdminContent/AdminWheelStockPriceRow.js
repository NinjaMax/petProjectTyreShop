import {React, Fragment} from 'react';

const AdminWheelStockPriceRow = ({stockWheels, priceWheels}) => {
    return (
        <>
            {stockWheels ? stockWheels.map((item) => (
                <Fragment key={'stw' + item.id}>
                    <td key={'stsw' + item.id}>{item.storage?.storage ?? ''}</td>
                    <td key={'stuw' + item.id}>{item?.update_date ?? ''}</td>
                    <td key={'sts' + item.id}>{item.supplier?.name ?? ''}</td>
                    <td key={'stsc' + item.id}>{item.supplier?.city_ua ?? ''}</td>
                    <td key={'stsk' + item.id}>{item?.stock ?? ''}</td>
                    <td key={'strs' + item.id}>{item?.reserve ?? ''}</td>
                    <td key={'strm' + item.id}>{item?.remainder ?? ''}</td>
                </Fragment>
                    ))
                    : <td>Покищо немає данних. Очікуємо...</td>
            } 
            {priceWheels ? priceWheels.map((item) =>(
                <Fragment key={'wp' + item.id}>
                    <td key={'wpr' + item.id}>{item?.price_wholesale ?? ''}</td>
                    <td key={'wprr' + item.id}>{item?.price ?? ''}</td>
                    <td key={'wprd' + item.id}>{item?.price_plus_delivery ?? ''}</td>
                </Fragment> 
                ))
               : <td>Покищо немає данних. Очікуємо...</td>
            }     
        </>
    );
};

export default AdminWheelStockPriceRow;