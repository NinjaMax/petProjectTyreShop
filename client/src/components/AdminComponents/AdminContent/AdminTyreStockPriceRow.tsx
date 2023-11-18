import React, {Fragment} from 'react';
import { IAdmTyreStockPriceRow } from './interfaces/AdminTyreRow.interface';
import { IStockTyreRow } from './types/StockTyreRow.type';
import { TyreStockPriceRow } from './types/TyreRowStockPrice.type';

// type IPriceTyreRow = {
//     id: number;
//     price_wholesale: number; 
//     price: number;
//     price_plus_delivery: number;
// }

const AdminTyreStockPriceRow = (
    {stockTyres, priceTyres}: TyreStockPriceRow
    ) => {
        console.log('PRICE_TYRE_DATA: ', priceTyres);
        console.log('STOCK_TYRE_DATA: ', stockTyres);
    return (
        <>
        { priceTyres ? 
            priceTyres?.map((
                item: any,
                index: number) => (
        <tr key={'tyrerow ' + item?.id}>
            {stockTyres ?
                <Fragment key={'stt' + stockTyres[index]?.id} >
                    <td >{stockTyres[index]?.storage.storage ?? ''}</td>
                    <td >{
                    new Date(stockTyres[index].update_date).toLocaleString() ?? ''
                    }</td>
                    <td >{stockTyres[index]?.supplier.name ?? ''}</td>
                    <td >{stockTyres[index]?.supplier.city_ua ?? ''}</td>
                    <td >{stockTyres[index]?.stock ?? ''}</td>
                    <td >{stockTyres[index]?.reserve ?? ''}</td>
                    <td >{stockTyres[index]?.remainder ?? ''}</td>
                </Fragment>
                    : 
                    <td>Покищо немає данних. Очікуємо...</td>
            } 
            {priceTyres ? 
                <Fragment key={'tp' + priceTyres[index]?.id}>
                    <td >{priceTyres[
                        priceTyres.findIndex((entity: any) => entity.id_supplier === stockTyres![index]?.id_supplier)
                        ]?.price_wholesale ?? ''}</td>
                    <td >{priceTyres[
                        priceTyres.findIndex((entity: any) => entity.id_supplier === stockTyres![index]?.id_supplier)
                        ]?.price ?? ''}</td>
                    <td >{priceTyres[
                        priceTyres.findIndex((entity: any) => entity.id_supplier === stockTyres![index]?.id_supplier)
                        ]?.price_plus_delivery ?? ''}</td>
                </Fragment> 
               : <td>Покищо немає данних. Очікуємо...</td>
            }  
          </tr> ))
          : <tr>{'Покищо немає данних...'}</tr>
        }
        </>
    );
};

export default AdminTyreStockPriceRow;