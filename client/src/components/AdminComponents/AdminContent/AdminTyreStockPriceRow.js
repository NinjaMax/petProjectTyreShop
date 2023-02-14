import {React, Fragment} from 'react';

const AdminTyreStockPriceRow = ({stockTyres, priceTyres}) => {
    return (
        <>
            {stockTyres ? stockTyres.map((item) => (
                <Fragment key={'stt' + item.id}>
                    <td key={'stst' + item.id}>{item.storage?.storage ?? ''}</td>
                    <td key={'stut' + item.id}>{item?.update_date ?? ''}</td>
                    <td key={'sts' + item.id}>{item.supplier?.name ?? ''}</td>
                    <td key={'stsc' + item.id}>{item.supplier?.city_ua ?? ''}</td>
                    <td key={'stsk' + item.id}>{item?.stock ?? ''}</td>
                    <td key={'strs' + item.id}>{item?.reserve ?? ''}</td>
                    <td key={'strm' + item.id}>{item?.remainder ?? ''}</td>
                </Fragment>
                    ))
                    : <td>Покищо немає данних. Очікуємо...</td>
            } 
            {priceTyres ? priceTyres.map((item) =>(
                <Fragment key={'tp' + item.id}>
                    <td key={'tpr' + item.id}>{item?.price_wholesale ?? ''}</td>
                    <td key={'tprr' + item.id}>{item?.price ?? ''}</td>
                    <td key={'tprd' + item.id}>{item?.price_plus_delivery ?? ''}</td>
                </Fragment> 
                ))
               : <td>Покищо немає данних. Очікуємо...</td>
            }     
        </>
    );
};

export default AdminTyreStockPriceRow;