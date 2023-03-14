import {React, Fragment} from 'react';

const AdminTyreStockPriceRow = ({stockTyres, priceTyres}) => {
    return (
        <>
        {stockTyres?.lenght !==0 || priceTyres?.lenght !==0 ? 
            priceTyres?.map((item, index) => (
        <tr key={'tyrerow ' + item?.id}>
            {stockTyres ?
                <Fragment key={'stt' + stockTyres[index]?.id}>
                    <td >{stockTyres[index]?.storage.storage ?? ''}</td>
                    <td >{stockTyres[index]?.update_date ?? ''}</td>
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
                    <td >{priceTyres[index]?.price_wholesale ?? ''}</td>
                    <td >{priceTyres[index]?.price ?? ''}</td>
                    <td >{priceTyres[index]?.price_plus_delivery ?? ''}</td>
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