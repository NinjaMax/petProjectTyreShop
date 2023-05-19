import React, {Fragment} from 'react';

interface IAdmWheelStockPriceRow {
    stockWheels: any[] | undefined; 
    priceWheels: any[] | undefined;
}

type IStockWheelRow = {
    id: number;
    storage: {storage: string};
    update_date: Date;
    supplier: {name: string; city_ua: string;};
    stock: number;
    reserve: number;
    remainder: number;
}

type IPriceWheelRow = {
    id: number;
    price_wholesale: number; 
    price: number;
    price_plus_delivery: number;
}


const AdminWheelStockPriceRow = (
        {stockWheels, priceWheels}: IAdmWheelStockPriceRow
    ) => {
    return (
        <>
            <tr>
            {stockWheels ? stockWheels?.map((item: IStockWheelRow) => (
                <Fragment key={'stw' + item.id}>
                    <td >{item.storage?.storage ?? ''}</td>
                    <td >{
                    new Date(item?.update_date).toLocaleString() ?? ''
                    }</td>
                    <td >{item.supplier?.name ?? ''}</td>
                    <td >{item.supplier?.city_ua ?? ''}</td>
                    <td >{item?.stock ?? ''}</td>
                    <td >{item?.reserve ?? ''}</td>
                    <td >{item?.remainder ?? ''}</td>
                </Fragment>
                    ))
                    : <td>Покищо немає данних. Очікуємо...</td>
            } 
            {priceWheels ? priceWheels?.map((item: IPriceWheelRow) =>(
                <Fragment key={'wp' + item.id}>
                    <td >{item?.price_wholesale ?? ''}</td>
                    <td >{item?.price ?? ''}</td>
                    <td >{item?.price_plus_delivery ?? ''}</td>
                </Fragment> 
                ))
               : <td>Покищо немає данних. Очікуємо...</td>
            } 
            </tr>
        </>
    );
};

export default AdminWheelStockPriceRow;