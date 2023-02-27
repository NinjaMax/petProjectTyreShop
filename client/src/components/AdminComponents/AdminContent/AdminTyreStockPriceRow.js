import {React, Fragment} from 'react';

const AdminTyreStockPriceRow = ({stockTyres, priceTyres}) => {
    return (
        <>
        {stockTyres?.lenght !==0 || priceTyres?.lenght !==0 ? 
            priceTyres?.map((item, index) => (
        <tr key={'tyrerow ' + item?.id}>
            {stockTyres ?
                <Fragment key={'stt' + stockTyres[index]?.id}>
                    <td key={'stst' + stockTyres[index]?.id}>{stockTyres[index]?.storage.storage ?? ''}</td>
                    <td key={'stut' + stockTyres[index]?.id}>{stockTyres[index]?.update_date ?? ''}</td>
                    <td key={'sts' + stockTyres[index]?.id}>{stockTyres[index]?.supplier.name ?? ''}</td>
                    <td key={'stsc' + stockTyres[index]?.id}>{stockTyres[index]?.supplier.city_ua ?? ''}</td>
                    <td key={'stsk' + stockTyres[index]?.id}>{stockTyres[index]?.stock ?? ''}</td>
                    <td key={'strs' + stockTyres[index]?.id}>{stockTyres[index]?.reserve ?? ''}</td>
                    <td key={'strm' + stockTyres[index]?.id}>{stockTyres[index]?.remainder ?? ''}</td>
                </Fragment>
                    : 
                    <td>Покищо немає данних. Очікуємо...</td>
            } 
            {priceTyres ? 
                <Fragment key={'tp' + priceTyres[index]?.id}>
                    <td key={'tpr' + priceTyres[index]?.id}>{priceTyres[index]?.price_wholesale ?? ''}</td>
                    <td key={'tprr' + priceTyres[index]?.id}>{priceTyres[index]?.price ?? ''}</td>
                    <td key={'tprd' + priceTyres[index]?.id}>{priceTyres[index]?.price_plus_delivery ?? ''}</td>
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