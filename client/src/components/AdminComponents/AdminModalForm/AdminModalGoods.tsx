import React, {useState, useEffect} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalGoods.css';
import { FixedSizeList  as List } from 'react-window';

interface IModalGoods {
    props: [any[] | null, ...any[][] | null[]];
    storageGoods: [ 
        {id_storage: number;
        storage?: string} 
    ] | null;
    
    showRowModData(e: any): void;
}

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
    const [changedTyreData, setChangedTyreData] = useState<any[] | null>(tyreModData);
    const [changedWheelData, setChangedWheelData] = useState<any[] | null>(wheelModData);
    const [valueTyres, setValueTyres] = useState('');
    const [valueWheels, setValueWheels] = useState('');

    useEffect(() => {
        if(valueTyres.length !== 0) {
            const filteredTyreDataMod: any = tyreModData?.filter((goodsItem: any) => {
            return goodsItem.id.toLowerCase().includes(valueTyres.toLowerCase()) ||
            goodsItem.full_name.toLowerCase().includes(valueTyres.toLowerCase()) 
            })
            setChangedTyreData(filteredTyreDataMod);  
        } else {
            setChangedTyreData(tyreModData);
        }
    },[tyreModData, valueTyres]);

    useEffect(() => {
        if(valueWheels.length !== 0) {
            const filteredWheelDataMod: any = wheelModData?.filter((goodsItem: any) => {
                return goodsItem.id.toLowerCase().includes(valueWheels.toLowerCase()) ||
                goodsItem.full_name_color.toLowerCase().includes(valueWheels.toLowerCase())  
            })
            setChangedWheelData(filteredWheelDataMod);  
        } else {
            setChangedWheelData(wheelModData);
        }
    },[wheelModData, valueWheels]);


    const goodsRowTableTyre = ({index, style}: any) => (
        <div>
        {changedTyreData![index].price.length !== 1 ? 
        <div className='admModalGoodsGridItem' style={style}
            onDoubleClick={e => showRowModData(e.currentTarget.getAttribute("data-value"))} 
            data-value={[changedTyreData![index].id, index]}
        >
            <div>{changedTyreData![index].id}</div>
            <div>{changedTyreData![index].full_name}</div>
            <div>{changedTyreData![index].category?.category ?? ''}</div>
            <div>{changedTyreData![index].price[index]?.price ?? ''}</div>                             
            <div>{changedTyreData![index].stock[changedTyreData![index].stock?.findIndex(
                (itemI: any) => itemI.id_storage === changedTyreData![index].id_storage)]?.remainder ?? ''}</div>
            <div>{storageGoods![storageGoods!.findIndex((itemS) => itemS.id_storage === changedTyreData![index].id_storage)]?.storage}</div>     
            <div>{changedTyreData![index].stock[changedTyreData![index].stock?.findIndex(
                (itemI: any) => itemI.id_storage === changedTyreData![index].id_storage)]?.id_storage ?? ''}</div>      
        </div>
        :
        <div className='admModalGoodsGridItem' style={style}
            onDoubleClick={e => showRowModData(e.currentTarget.getAttribute("data-value"))} 
            data-value={[changedTyreData![index].id, 0]}
        >
            <div>{changedTyreData![index].id}</div>
            <div>{changedTyreData![index].full_name}</div>
            <div>{changedTyreData![index].category?.category ?? ''}</div>
            <div>{changedTyreData![index].price[0].price ?? ''}</div> 
            <div>{changedTyreData![index].stock[0].remainder ?? ''}</div>
            <div>{storageGoods![storageGoods!.findIndex((itemS) => itemS.id_storage === changedTyreData![index].stock[0].id_storage)]?.storage}</div>     
            <div>{changedTyreData![index].stock[0].id_storage ?? ''}</div> 
        </div> 
        } 
        </div>
    );

    const goodsRowTableWheel = ({index, style}: any) => (
        <div className='admModalGoodsGridItem' style={style} 
            data-value={changedWheelData![index].id}
            onDoubleClick={e => showRowModData(e.currentTarget.getAttribute("data-value"))} 
        >
            <div>{changedWheelData![index].id}</div>
            <div>{changedWheelData![index].full_name_color}</div>
            <div>{changedWheelData![index].category?.category ?? ''}</div>
            <div>{changedWheelData![index].price[0]?.price ?? ''}</div>
            <div>{changedWheelData![index].stock[0]?.remainder ?? ''}</div>
            <div>{storageGoods![storageGoods!.findIndex((itemS) => itemS.id_storage === changedWheelData![index].stock[0].id_storage)]?.storage}</div>     
            <div>{changedWheelData![index].stock[0].id_storage ?? ''}</div> 
        </div>
    );

    const goodsRowTableBattery = ({index, style}: any) => (
        <div className='admModalGoodsGridItem' style={style}>
            <div>264302</div>
            <div>BFGoodrich Activan 185/75 R16C 104/102R</div>
            <div>Шини</div>
            <div>2055</div>
            <div>4</div>
            <div>storage</div>
            <div>id stor</div>
        </div>
    );

    const goodsRowTableOil = ({index, style}: any) => (
        <div className='admModalGoodsGridItem' style={style}>
            <div>264302</div>
            <div>BFGoodrich Activan 185/75 R16C 104/102R</div>
            <div>Шини</div>
            <div>2055</div>
            <div>4</div>
            <div>storage</div>
            <div>id stor</div>
        </div>
    );

    const goodsRowTableParts = ({index, style}: any) => (
        <div className='admModalGoodsGridItem' style={style}>
            <div>Печалька... Нажаль немає зараз товарів</div>
        </div>
    );

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
            {chooseCatMod === 'Шини' ?
                <input className="admInpModalGoods" 
                    id='tyre_content_input'
                    name='tyre_content_input'
                    type="text"
                    onChange={(e) =>setValueTyres(e.target.value)} 
                    placeholder="Пошук товару..."
                />
                : null
            }
            {chooseCatMod === 'Диски' ?
                <input  className="admInpModalGoods"
                    id='wheel_content_input'
                    name='wheel_content_input'
                    type="text"
                    onChange={(e) => setValueWheels(e.target.value)} 
                    placeholder="Пошук товару..."
                />
                : null
            }
            {chooseCatMod === 'АКБ' ?
                <input  className="admInpModalGoods"
                    id='battery_content_input'
                    name='battery_content_input'
                    type="text"
                    placeholder="Пошук товару..."
                />
                : null
            }
            {chooseCatMod === 'Масла' ?
                <input className="admInpModalGoods" 
                    id='oil_content_input'
                    name='oil_content_input'
                    type="text" 
                    placeholder="Пошук товару..."
                />
                : null
            }
            {chooseCatMod === 'Запчастини' ?
                <input  className="admInpModalGoods"
                    id='part_content_input'
                    name='part_content_input'
                    type="text"
                    placeholder="Пошук товару..."
                />
                : null
            }
            <div className='admModalGoodsTableBox'>
            <table className="admModalGoodsTable">
                <thead>
                    <tr className="admModalHeaderGoodsTable">
                        <th className='admModalGoodsGridItemId'>id</th>
                        <th className='admModalGoodsGridItemName'>Назва</th>
                        <th className='admModalGoodsGridItemCat'>Категорія</th>
                        <th className='admModalGoodsGridItemPrice'>Ціна</th>
                        <th className='admModalGoodsGridItemStock'>Залишки</th>
                        <th className='admModalGoodsGridItemStor'>Склад</th>
                        <th className='admModalGoodsGridItemStockId'>Скл ID</th>
                    </tr>   
                </thead>
            </table>
            {chooseCatMod === 'Шини' && changedTyreData ?
            <List
                className="admModalGoodsTableColmId"
                itemCount={changedTyreData!.length}
                itemSize={45}
                height={250}
                width={950}
            >
                {goodsRowTableTyre}
            </List> 
            : null
            }
            {chooseCatMod === 'Диски' && changedWheelData ?
            <List
                className="admModalGoodsTableColmId"
                itemCount={changedWheelData!.length}
                itemSize={65}
                height={250}
                width={950}
            >
                {goodsRowTableWheel}
            </List> 
            : null
            }
            {chooseCatMod === 'АКБ' ?
            <List
                className="admModalGoodsTableColmId"
                itemCount={25}
                itemSize={45}
                height={250}
                width={950}
            >
                {goodsRowTableBattery}
             </List> 
            : null
            }
            {chooseCatMod === 'Масла' ?
            <List
                className="admModalGoodsTableColmId"
                itemCount={25}
                itemSize={45}
                height={250}
                width={950}
            >
                {goodsRowTableOil}
            </List> 
            :null
            }
            {chooseCatMod === 'Запчастини' ?
            <List
                className="admModalGoodsTableColmId"
                itemCount={1}
                itemSize={45}
                height={250}
                width={950}
            >
                {goodsRowTableParts}
            </List> 
            :null
            }
            </div>
        </div>
    );
};

export default AdminModalGoods;