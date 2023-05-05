import React, {useState, Fragment} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalGoods.css';

interface IModalGoods {
    props: [[] | null, ...any[][] | null[]];
    storageGoods: [ 
        {id_storage: number;
        storage?: string} 
    ] | null;
    
    showRowModData(e: any): void;
}

// type IModalGoodsStorage = IModalGoods & {
//     storage: string;
// }

type ItyreModData ={
    price: [{id: number; price: number; id_storage: number; storage: string}];
    id: number; 
    full_name: string;
    full_name_color?: string;  
    category: { category: string;}; 
    stock: [{remainder: number; id_storage: number}]; 
}

const AdminModalGoods = ({props, showRowModData, storageGoods}: IModalGoods) => {
    const [tyreModData, wheelModData] = props;
    const [chooseCatMod, setChooseCatMod] = useState<string>('Шини');

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
                        tyreModData.map((item: ItyreModData) => (
                        item.price.length !== 1 ?   

                        item.price.map((entity, indexEntity) => (
                            
                        <tr key={'tm' + entity.id} 
                            onDoubleClick={e => showRowModData(e.currentTarget.getAttribute("data-value"))} 
                            data-value={[item.id, indexEntity]}>
                            <Fragment key={'tid' + item.id}>
                                <td>{item.id}</td>
                                <td>{item.full_name}</td>
                                <td>{item.category?.category ?? ''}</td>
                                <td>{item.price[indexEntity]?.price ?? ''}</td>                             
                                <td>{item.stock[item.stock?.findIndex(
                                    itemI => itemI.id_storage === entity.id_storage)]?.remainder ?? ''}</td>
                                <td>{storageGoods![storageGoods!.findIndex((itemS) => itemS.id_storage === entity.id_storage)]?.storage}</td>     
                                <td>{item.stock[item.stock?.findIndex(
                                    itemI => itemI.id_storage === entity.id_storage)]?.id_storage ?? ''}</td>     
                            </Fragment>       
                        </tr>
                        
                       ))
                        :
                        <tr key={'tm' + item.id} 
                            onDoubleClick={e => showRowModData(e.currentTarget.getAttribute("data-value"))} 
                            data-value={[item.id, 0]}>
                            <Fragment key={'tid' + item.id}>
                                <td>{item.id}</td>
                                <td>{item.full_name}</td>
                                <td>{item.category?.category ?? ''}</td>
                                <td>{item.price[0].price ?? ''}</td> 
                                <td>{item.stock[0].remainder ?? ''}</td>
                                <td>{storageGoods![storageGoods!.findIndex((itemS) => itemS.id_storage === item.stock[0].id_storage)]?.storage}</td>     
                                <td>{item.stock[0].id_storage ?? ''}</td> 
                            </Fragment> 
                        </tr>  
                       
                         ))
                        : null 
                    }
                    {chooseCatMod=== 'Диски' && wheelModData ?
                        wheelModData.map((item: ItyreModData) => (
                            <tr key={'wm' + item.id} 
                                data-value={item.id}
                                onDoubleClick={e => showRowModData(e.currentTarget.getAttribute("data-value"))} 
                                >
                                <td >{item.id}</td>
                                <td >{item.full_name_color}</td>
                                <td >{item.category?.category ?? ''}</td>
                                <td >{item.price[0]?.price ?? ''}</td>
                                <td >{item.stock[0]?.remainder ?? ''}</td>
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