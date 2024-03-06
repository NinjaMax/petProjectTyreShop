import React, { useContext, useEffect, useState } from 'react';
import '../../css/NavBarSearch.css';
import TyresCardList from '../cards/CardList';
import { NavLink, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';
import { addGoodsToBasket, createBasket, getBasketById, getStorageByIdParam, getTyresAll, getWheelsAll} from '../../restAPI/restGoodsApi';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { ICheckOrderItem } from '../catalogs/types/CheckOrder.type';
import Modal from '../modal/Modal';
import CheckOrder from '../modal/CheckOrder';

interface INavBarSearch {
    searchBtn: boolean; 
    clickSearchBtn(): void;
}

const NavBarSearch = observer((
        {searchBtn, clickSearchBtn}: INavBarSearch
    ) => {
    const history = useHistory();
    const [inputSearchMod, setInputSearchMod] = useState('');
    const [tyreSearchMod, setTyreSearchMod] = useState<[] | null>(null);
    const [wheelSearchMod, setWheelSearchMod] = useState<[] | null>(null);
    const [tabSearchMod, setTabSearchMod] = useState<string>('');
    const [tabSearchModTyre, setTabSearchModTyre] = useState<[] | null>([]);
    const [tabSearchModWheel, setTabSearchModWheel] = useState<[] | null>([]);
    const [tabSearchModOil, setTabSearchModOil] = useState<[]>([]);
    const [tabSearchModBattery, setTabSearchModBattery] = useState<[]>([]);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
    const [active, setActive] = useState<boolean>(false);
    const {page, customer} = useContext<any>(Context);
    
    useEffect(() => {
        let isMounted = false;
        const loadMaintask = async() => {
          const taskLoad: any[] = [
            getTyresAll,
            getWheelsAll
            ];
        
            let i:number = 0;
            while(taskLoad.length > i) {
            if(!isMounted && taskLoad[i] === getTyresAll) {
                let tyreFilterGoods: any = await taskLoad[i]();
                setTyreSearchMod(tyreFilterGoods);
            }
            if(!isMounted && taskLoad[i] === getWheelsAll) {
                let wheelFilterGoods: any = await taskLoad[i]();
                setWheelSearchMod(wheelFilterGoods);
            }
            const task = taskLoad.shift();
            task();
            await yieldToMain(); 
            }
        }
        loadMaintask();
        return () => {
            isMounted = true;
        };
    },[]);
    
    useEffect(() => {
        if ( inputSearchMod.length !== 0 ) {
            const newTyresSearch: any = tyreSearchMod?.filter((itemGoods:any) =>
            (itemGoods.id.toLowerCase().includes(inputSearchMod.toLowerCase()) ||    
            itemGoods.full_name.toLowerCase().includes(inputSearchMod.toLowerCase()) ||
            itemGoods.size_digits.size_only_digits.toLowerCase().includes(inputSearchMod.toLowerCase())
            ));
            if (newTyresSearch) {
                setTabSearchModTyre(newTyresSearch);
            }  
        }
        if ( inputSearchMod.length !== 0 ) {
            const newWheelsSearch: any = wheelSearchMod?.filter((itemGoods:any) =>
            (itemGoods.id.toLowerCase().includes(inputSearchMod.toLowerCase()) ||    
            itemGoods.full_name_color.toLowerCase().includes(inputSearchMod.toLowerCase()) ||
            itemGoods.size_digits.size_only_digits.toLowerCase().includes(inputSearchMod.toLowerCase())
            ));
            if (newWheelsSearch) {
                setTabSearchModWheel(newWheelsSearch);
            } 
        } 
    },[
        inputSearchMod, 
        tyreSearchMod, 
        wheelSearchMod
    ]);

    const checkOrders = async (
        item : any, 
        avgRatingModel: number | undefined,
        storageItem: number,
        priceStockIndex: number,
        ) => {
        try {
            setActive(!active);
            if (!active) {
                const getStorageTyre = await getStorageByIdParam(storageItem);
                const basket: any = await createBasket({
                    id_customer: customer.customer?.id, 
                    storage: getStorageTyre.storage
                });
                if(basket?.status === 201) {
                    const checkItem = checkOrderItem?.find(value => +value.id === +item.id);
                    const addTobasket: any = await addGoodsToBasket(
                    +item.id,
                    item.id_cat,
                    checkItem?.quantity ? checkItem?.quantity + 4 : 4,
                    item.price[priceStockIndex].price_wholesale,
                    item.price[priceStockIndex].price,
                    item.stock[priceStockIndex].id_supplier,
                    item.stock[priceStockIndex].id_storage,
                    item.category?.category,
                    basket.data.id_basket,
                    item.full_name,
                    item.season?.season_ua,
                    avgRatingModel,
                    item.reviews.length,
                    item.diameter.diameter,
                    ); 
                    if (addTobasket?.status === 201) {
                        const updateBasketStorage = await getBasketById(basket.data.id_basket);
                        setCheckOrderItem(
                            [...updateBasketStorage?.basket_storage]
                        );
                        page.setBasketCount(
                            updateBasketStorage?.basket_storage.reduce(
                                (sum: any, current: any) => (sum + current.quantity),0)
                        );
                    }  
                }
            }
        } catch (error) {
            console.log('BASKET_ERROR: ',error);
        }
    }

    const searchTabModChange = (e: any) => {
        if (e.target.title === 'Шини') {
            setTabSearchMod('Шини');
        }
        if (e.target.title === 'Диски') {
            setTabSearchMod('Диски');
        }
        if (e.target.title === 'Акб') {
            setTabSearchMod('Акб');
        }
        if (e.target.title === 'Масло') {
            setTabSearchMod('Масло');
        }
    }

    const handleModClick = () => {
        history.push('/search?q=' + inputSearchMod);
        clickSearchBtn();
    }
    
    return (
        <div id="myOverlay" className={searchBtn ? "overlayActive" : "overlay"}>
            <span className="closebtn" onClick={clickSearchBtn} title="Закрити пошук">&#10006;</span>
                <div className="overlayForm">
                    <form action="">
                    <input 
                        onChange={
                            (e: any) => setInputSearchMod(e.target.value)}
                        type="text" 
                        placeholder="Пошук..." 
                        name="search"/>
                    </form>    
                </div>
                { 
                    tabSearchModTyre?.length !== 0 || 
                    tabSearchModWheel?.length !== 0 || 
                    tabSearchModOil?.length !== 0 || 
                    tabSearchModBattery?.length !== 0 ?
                <div className='outputData'>
                    <div className='outputDataItemsTitle'>
                        <div>Результати пошуку:</div>
                    </div>
                    <div className='outputDataItemsLines'>
                        {tabSearchModTyre?.length !== 0 ? 
                        <div className='outputDataItems'>
                        <span 
                            title='Шини'
                            className={tabSearchMod === 'Шини' ? 
                            'activatedTitle':
                            'titleSearch' }
                            onClick={searchTabModChange}
                        >Шини 
                            <span className='countSearch'>
                                {tabSearchModTyre?.length}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModWheel?.length !== 0 ?
                        <div className='outputDataItems'>
                        <span 
                            title='Диски'
                            className={tabSearchMod === 'Диски' ? 
                            'activatedTitle' :
                             'titleSearch' }
                            onClick={searchTabModChange}
                        >Диски 
                            <span className='countSearch'>
                            {tabSearchModWheel?.length}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModBattery?.length !== 0 ?
                        <div className='outputDataItems'>
                        <span 
                            title='Акб'
                            className={tabSearchMod === 'Акб' ?  
                            'activatedTitle' : 
                            'titleSearch' }
                            onClick={searchTabModChange}
                        >Акб 
                            <span className='countSearch'>
                                {tabSearchModBattery?.length}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModOil?.length !== 0 ?
                        <div className='outputDataItems'>
                        <span 
                            title='Масло'
                            className={tabSearchMod === 'Масло' ? 
                            'activatedTitle':
                            'titleSearch' }
                            onClick={searchTabModChange}
                        >Масло 
                            <span className='countSearch'>
                                {tabSearchModOil?.length}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                    </div>
                    <p/>
                    <div className='outputDataItemsBox'>
                        {tabSearchModTyre && tabSearchMod === 'Шини' ? 
                        tabSearchModTyre.slice(0, 12).map((goods: any) => (                    
                        <div className='outputDataItemsList' key={goods.id}>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
                            />
                        </div>
                        ))
                        : null
                        }
                        {tabSearchModWheel && tabSearchMod === 'Диски' ? 
                        tabSearchModWheel.slice(0, 12).map((goods: any) => (                    
                        <div className='outputDataItemsList' key={goods.id}>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
                            />
                        </div>
                        ))
                        : null
                        }
                        {tabSearchModBattery && tabSearchMod === 'Акб' ? 
                        tabSearchModBattery.map((goods: any) => (                    
                        <div className='outputDataItemsList'  key={goods.id}>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
                            />
                        </div>
                        ))
                        : null
                        }
                        {tabSearchModOil && tabSearchMod === 'Масло' ? 
                        tabSearchModOil.map((goods: any) => (                    
                        <div className='outputDataItemsList'  key={goods.id}>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
                            />
                        </div>
                        ))
                        : null
                        } 
                    </div>
                    <Modal active={active} setActive={setActive}>
                        <CheckOrder orderItem={checkOrderItem}/> 
                    </Modal> 
                    <NavLink 
                        className='overlayLinkAll' 
                        to={`/search?q=${inputSearchMod}`} 
                        onClick={handleModClick}
                        > 
                        Показати всі результати
                    </NavLink> 
                </div>
            : null
            }
        </div>
    );
});

export default NavBarSearch;