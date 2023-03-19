import React, {Fragment} from 'react';

const AdminWheelStockPriceRow = ({stockWheels, priceWheels}) => {
    return (
        <>
            {stockWheels ? stockWheels.map((item) => (
                <Fragment key={'stw' + item.id}>
                    <td >{item.storage?.storage ?? ''}</td>
                    <td >{item?.update_date ?? ''}</td>
                    <td >{item.supplier?.name ?? ''}</td>
                    <td >{item.supplier?.city_ua ?? ''}</td>
                    <td >{item?.stock ?? ''}</td>
                    <td >{item?.reserve ?? ''}</td>
                    <td >{item?.remainder ?? ''}</td>
                </Fragment>
                    ))
                    : <td>Покищо немає данних. Очікуємо...</td>
            } 
            {priceWheels ? priceWheels.map((item) =>(
                <Fragment key={'wp' + item.id}>
                    <td >{item?.price_wholesale ?? ''}</td>
                    <td >{item?.price ?? ''}</td>
                    <td >{item?.price_plus_delivery ?? ''}</td>
                </Fragment> 
                ))
               : <td>Покищо немає данних. Очікуємо...</td>
            }     
        </>
    );
};

export default AdminWheelStockPriceRow;