import {React, useState, Fragment} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalGoods.css';

const AdminModalGoods = ({tyreModData, wheelModData, showRowModData}) => {

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
                    </tr>   
                </thead>
                <tbody>
                    {chooseCatMod === 'Шини' ?
                
                        tyreModData.map((item, index) => (
                
                        <tr key={'tm' + item.id} onDoubleClick={showRowModData} value={item.id}>
                            {item.price.lenght > 0 || item.stock.lenght > 0 ? 
                            <Fragment key={'tid' + item.id}>
                                <td key={'tmid' + item.id}>{item.id}</td>
                                <td key={'tmfn' + item.id}>{item.full_name}</td>
                                <td key={'tmca' + item.id}>{item.category?.category ?? ''}</td>
                                {item.price.map((entity) => (
                                    <td key={'tmpr' + entity.id}>{entity.price ?? ''}</td>
                                ))}     
                                {item.stock.map((entity) => (
                                    <td key={'tmr' + entity.id}>{entity.remainder ?? ''}</td>
                                ))}</Fragment> 
                              : 
                              <Fragment key={'tid' + item.id}>
                                <td key={'tmid' + item.id}>{item.id}</td>
                                <td key={'tmfn' + item.id}>{item.full_name}</td>
                                <td key={'tmca' + item.id}>{item.category?.category ?? ''}</td>
                                <td key={'tmpr' + item.id}>{item.price.price ?? ''}</td> 
                                <td key={'tmr' + item.id}>{item.stock.remainder ?? ''}</td> 
                              </Fragment>   
                            }    
                        </tr> ))
                        : null 
                    }
                    {chooseCatMod=== 'Диски' ?
                        wheelModData.map((item) => (
                            <tr key={'wm' + item.id} onDoubleClick={showRowModData} value={item.id}>
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