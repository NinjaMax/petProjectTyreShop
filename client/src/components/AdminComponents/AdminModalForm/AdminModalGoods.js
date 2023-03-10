import {React, useState, Fragment} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalGoods.css';

const AdminModalGoods = ({props, showRowModData, storage}) => {
    const [tyreModData, wheelModData] = props;
    const [chooseCatMod, setChooseCatMod] = useState('Шини');

    return (
        <div className='admModalGoodsBox'>
                <span>Каталог товарів: {chooseCatMod}</span>
            <div className='admModalGoodsHeader'>
                
                <div className='admModalCatalog'>  
                  <label className='admChooseLabelMod'>
                    <input className='admChooseCatMod'
                    onChange={(e) => setChooseCatMod(e.currentTarget.value)}
                    name='chooseGoodsModCat' value='Шини'
                    type='radio'/>Шини</label>
                  <label className='admChooseLabelMod'>
                    <input className='admChooseCat'
                    onChange={(e) => setChooseCatMod(e.currentTarget.value)}
                    name='chooseGoodsModCat' value='Диски'
                    type='radio'/>Диски</label>
                  <label className='admChooseLabelMod'>
                    <input className='admChooseCat'
                    onChange={(e) => setChooseCatMod(e.currentTarget.value)}
                    name='chooseGoodsModCat' value='АКБ'
                    type='radio'/>АКБ</label>
                  <label className='admChooseLabelMod'>
                    <input className='admChooseCat'
                    onChange={(e) => setChooseCatMod(e.currentTarget.value)}
                    name='chooseGoodsModCat' value='Масла'
                    type='radio'/>Масла</label> 
                  <label className='admChooseLabelMod'>
                    <input className='admChooseCat'
                    onChange={(e) => setChooseCatMod(e.currentTarget.value)}
                    name='chooseGoodsModCat'value='Запчастини' 
                    type='radio'/>Запчастини</label>
                </div>
            </div>
                <input type="text" className="admInpModalGoods" 
                    //onKeyUp={() =>console.log('search Goods')} 
                    placeholder="Пошук товару..."/>
            <div className='admModalGoodsTableBox'>
            <table className="admModalGoodsTable">
                <thead>
                    <tr className="admModalHeaderGoodsTable">
                        <th>id</th>
                        <th>Назва</th>
                        <th>Категорія</th>
                        <th>Ціна</th>
                        <th>Залишки</th>
                        <th>Склад</th>
                        <th>Склад ID</th>
                    </tr>   
                </thead>
                <tbody>
                    {chooseCatMod === 'Шини' && tyreModData ?
                        tyreModData.map((item) => (
                        item.price.length !== 1 ?   

                        item.price.map((entity, indexEntity) => (
                            
                        <tr key={'tm' + entity.id} 
                            onDoubleClick={e => showRowModData(e.currentTarget.getAttribute("value"))} 
                            value={[item.id, indexEntity]}>
                            <Fragment key={'tid' + item.id}>
                                <td>{item.id}</td>
                                <td>{item.full_name}</td>
                                <td>{item.category?.category ?? ''}</td>
                                <td>{item.price[indexEntity]?.price ?? ''}</td>                             
                                <td>{item.stock[item.stock.findIndex(
                                    itemI => itemI.id_storage === entity.id_storage)]?.remainder ?? ''}</td>
                                <td>{storage[storage.findIndex(itemS => itemS.id_storage === entity.id_storage)]?.storage}</td>     
                                <td>{item.stock[item.stock.findIndex(
                                    itemI => itemI.id_storage === entity.id_storage)]?.id_storage ?? ''}</td>     
                            </Fragment>       
                        </tr>
                        
                       ))
                        :
                        <tr key={'tm' + item.id} 
                            onDoubleClick={e => showRowModData(e.currentTarget.getAttribute("value"))} 
                            value={[item.id, 0]}>
                            <Fragment key={'tid' + item.id}>
                                <td>{item.id}</td>
                                <td>{item.full_name}</td>
                                <td>{item.category?.category ?? ''}</td>
                                <td>{item.price[0].price ?? ''}</td> 
                                <td>{item.stock[0].remainder ?? ''}</td>
                                <td>{storage[storage.findIndex(itemS => itemS.id_storage === item.stock[0].id_storage)]?.storage}</td>     
                                <td>{item.stock[0].id_storage ?? ''}</td> 
                            </Fragment> 
                        </tr>  
                       
                         ))
                        : null 
                    }
                    {chooseCatMod=== 'Диски' && wheelModData ?
                        wheelModData.map((item) => (
                            <tr key={'wm' + item.id} 
                                onDoubleClick={e => showRowModData(e.currentTarget.getAttribute("value"))} 
                                value={item.id}>
                                <td key={'wmid' + item.id}>{item.id}</td>
                                <td key={'wmfn' + item.id}>{item.full_name_color}</td>
                                <td key={'wmca' + item.id}>{item.category?.category ?? ''}</td>
                                <td key={'wmpr' + item.id}>{item.price?.price ?? ''}</td>
                                <td key={'wmsr' + item.id}>{item.stock?.remainder ?? ''}</td>
                            </tr> ))
                    : null
                    }
                    {chooseCatMod === 'АКБ' ?
                    <tr>
                        <td>264302</td>
                        <td>BFGoodrich Activan 185/75 R16C 104/102R</td>
                        <td>Шини</td>
                        <td>2055</td>
                        <td>4</td>
                    </tr>
                    : null
                    }
                    {chooseCatMod === 'Масла' ?
                    <tr>
                        <td>264302</td>
                        <td>BFGoodrich Activan 185/75 R16C 104/102R</td>
                        <td>Шини</td>
                        <td>2055</td>
                        <td>4</td>
                    </tr>
                    :null
                    }
                    {chooseCatMod === 'Запчастини' ?
                    <tr>
                        <td>Печалька... Нажаль немає зараз товарів</td>
                    </tr>
                    :null
                    }

                </tbody>     
            </table>
            </div>
        </div>
    );
};

export default AdminModalGoods;