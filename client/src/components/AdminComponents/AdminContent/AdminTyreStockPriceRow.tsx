import React, {Fragment} from 'react';

interface IAdmTyreStockPriceRow {
    stockTyres: any[] | undefined; 
    priceTyres: any[] | undefined;
   
}

type IStockTyrelRow = {
    id: number;
    storage: {storage: string};
    update_date: Date;
    supplier: {name: string; city_ua: string;};
    stock: number;
    reserve: number;
    remainder: number;
}

// type IPriceTyreRow = {
//     id: number;
//     price_wholesale: number; 
//     price: number;
//     price_plus_delivery: number;
// }

const AdminTyreStockPriceRow = (
    {stockTyres, priceTyres}: IAdmTyreStockPriceRow
    ) => {
    return (
        <>
        {stockTyres?.length !==0 || priceTyres?.length !==0 ? 
            priceTyres?.map((
                item: IStockTyrelRow,
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
                        priceTyres.findIndex((entity:{id_storage: number}) => entity.id_storage === stockTyres![index]?.id_storage)
                        ]?.price_wholesale ?? ''}</td>
                    <td >{priceTyres[
                        priceTyres.findIndex((entity:{id_storage: number}) => entity.id_storage === stockTyres![index]?.id_storage)
                        ]?.price ?? ''}</td>
                    <td >{priceTyres[
                        priceTyres.findIndex((entity:{id_storage: number}) => entity.id_storage === stockTyres![index]?.id_storage)
                        ]?.price_plus_delivery ?? ''}</td>
                </Fragment> 
               : <td>Покищо немає данних. Очікуємо...</td>
            }  
          </tr> ))
          : <tr>Покищо немає данних...</tr>
        }
        </>
    );
};

export default AdminTyreStockPriceRow;