import React, {Fragment} from 'react';
import { TyreStockPriceRow } from './types/TyreRowStockPrice.type';

const AdminTyreStockPriceRow = (
    {stockTyres, priceTyres}: TyreStockPriceRow
    ) => {

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
                    new Date(stockTyres[index]?.update_date).toLocaleString() ?? ''
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
          : <tr><td>{'Покищо немає данних...'}</td></tr>
        }
        </>
    );
};

export default AdminTyreStockPriceRow;