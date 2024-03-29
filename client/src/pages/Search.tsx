import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import '../css/Pages/Search.css';
import { useHistory, useLocation } from 'react-router-dom';
import { addGoodsToBasket, createBasket, getBasketById, getStorageByIdParam, getTyresAll, getWheelsAll } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import Card from '../components/cards/Card';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';
import { ICheckOrderItem } from '../components/catalogs/types/CheckOrder.type';
import { useTranslation } from 'react-i18next';

const Pagination = lazy(() => import('../components/Pagination'));
const LoadMoreGoods = lazy(() => import('../components/ux/LoadMoreGoods'));
const Modal = lazy(() => import('../components/modal/Modal'));
const CheckOrder = lazy(() => import('../components/modal/CheckOrder'));

const Search = observer(() => {
    const {page, customer, goodsTyre, goodsWheel} = useContext<any | null>(Context);
    const [inputTextSearch, setInputTextSearch] = useState<string>('');
    const [inputSearch, setInputSearch] = useState<string | null>('');
    const [tyreSearch, setTyreSearch] = useState<[] | null>(null);
    const [wheelSearch, setWheelSearch] = useState<[] | null>(null);
    const [tabSearch, setTabSearch] = useState<string>('');
    const [tabSearchTyre, setTabSearchTyre] = useState<any[]>([]);
    const [tabSearchWheel, setTabSearchWheel] = useState<any[]>([]);
    const [tabSearchOil, setTabSearchOil] = useState<any[]>([]);
    const [tabSearchBattery, setTabSearchBattery] = useState<any[]>([]);
    const [active, setActive] = useState(false);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
    const history = useHistory();
    const { t } = useTranslation();

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();

    useEffect(() =>{
        let isMounted = false;
        if(query.get('q') && !isMounted) {
            setInputSearch(query.get('q'));
            query.delete('q');
            history.replace({
                search: query.toString(),
              })
        }
        return () => {
            isMounted = true;
        };
    },[history, query]);
  
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
                setTyreSearch(tyreFilterGoods);
            }
            if(!isMounted && taskLoad[i] === getWheelsAll) {
                let wheelFilterGoods: any = await taskLoad[i]();
                setWheelSearch(wheelFilterGoods);
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
        if(inputSearch?.length !== 0) {
            const newTyresSearch: any = tyreSearch?.filter((itemGoods:any) =>
            (itemGoods.id.toLowerCase().includes(inputSearch?.toLowerCase()) ||    
            itemGoods.full_name.toLowerCase().includes(inputSearch?.toLowerCase()) ||
            itemGoods.size_digits.size_only_digits.toLowerCase().includes(inputSearch?.toLowerCase())
            ));
            if (page.loadMore > 0) {
                goodsTyre.setTotalCount(newTyresSearch?.length);
                setTabSearchTyre( prevState =>
                    [...prevState, 
                        ...newTyresSearch?.splice(page.offset, page.limit)]
                ); 
            } else {
                goodsTyre.setTotalCount(newTyresSearch?.length);
                setTabSearchTyre(
                    newTyresSearch?.splice(
                        page.offset, page.limit)
                );
            }
        }
        if(inputSearch?.length !== 0) {
            const newWheelsSearch: any = wheelSearch?.filter((itemGoods:any) =>
            (itemGoods.id.toLowerCase().includes(inputSearch?.toLowerCase()) ||    
            itemGoods.full_name.toLowerCase().includes(inputSearch?.toLowerCase()) ||
            itemGoods.size_digits.size_only_digits.toLowerCase().includes(inputSearch?.toLowerCase())
            ));
            if (page.loadMore > 0) {
                goodsWheel.setTotalCount(newWheelsSearch?.length);
                setTabSearchWheel( prevState =>
                    [...prevState, 
                        ...newWheelsSearch?.splice(page.offset, page.limit)]
                ); 
            } else {
                goodsWheel.setTotalCount(newWheelsSearch?.length);
                setTabSearchWheel(
                    newWheelsSearch?.splice(
                        page.offset, page.limit)
                );
            }
        }    
    },[
        goodsTyre, 
        inputSearch, 
        page.limit, 
        page.offset, 
        tyreSearch, 
        page.loadMore, 
        wheelSearch, 
        goodsWheel
    ]);

    const loadMoreGoods = (e: any) => {
        e.stopPropagation();
        page.setLoadMore(page.loadMore + 1);
        page.setOffset(page.offset + 9);
    };

    const searchTabChange = (e: any) => {
        if (e.target.title === t('search.typeTyre')) {
            setTabSearch(t('search.typeTyre'));
        }
        if (e.target.title === 'Диски') {
            setTabSearch('Диски');
        }
        if (e.target.title === 'Акб') {
            setTabSearch('Акб');
        }
        if (e.target.title === 'Масло') {
            setTabSearch('Масло');
        }
    }

    const inputSetsearch =() => {
        setTabSearchTyre([]);
        setTabSearch('');
        setInputSearch(inputTextSearch);
        setInputTextSearch('');
    };

    const checkOrders = async (
        item : ICheckOrderItem, 
        ratingModel: {avgRatingModel: number },
        storageItem: number,
        priceStockIndex: number,
    ) => {
    try {
        setActive(!active);
        if (!active) {
            const getStorage = await getStorageByIdParam(storageItem);
            const basket: any = await createBasket({
                id_customer: customer.customer?.id, 
                storage: getStorage.storage
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
                item.season?.season_ua ?? null,
                ratingModel?.avgRatingModel,
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
        console.log('BASKET_ERROR: ', error);
    }
    }

    return (
    <div className='searchContainer'>
        <h2>{t('search.searchTitle')}</h2>
        <input 
            className='inputSearchContatiner'
            defaultValue={query.get('q') ?? ''}
            onChange={
                (e: any) => setInputTextSearch(e.target.value)
            }
            type="text" 
            placeholder={t('search.placeHolder')}
            name="search"
        />
        <button 
            className='searchBtnContainer'
            onClick={inputSetsearch}
        >
            {t('search.searchButton')}
        </button>
        
        <p/>
        <span className='countAllGoods'>
        {t('search.foundGoods')}
        </span>
            <div className="btnSearchTabContainer">
                {tabSearchTyre?.length !== 0 ? 
                <span  
                    title={t('search.typeTyre')}
                    className={tabSearch === t('search.typeTyre') ? 
                    'activeBtn' :
                    'btnCatalogSearch'
                    }
                    onClick={searchTabChange}
                > 
                    {t('search.typeTyre')}
                    <span className='countSearchPage'>
                        {goodsTyre.totalCount} 
                    </span>
                </span>
                : null}
                {tabSearchWheel?.length !== 0 ? 
                <span 
                    title='Диски'
                    className={tabSearch === 'Диски' ? 
                    'activeBtn' :
                    'btnCatalogSearch' 
                    }
                    onClick={searchTabChange}
                > 
                    Диски
                    <span className='countSearchPage'>
                        {tabSearchWheel?.length} 
                    </span>
                </span>
                : null}
                {tabSearchBattery.length !== 0 ? 
                <span 
                    title='АКБ'
                    className={tabSearch === 'АКБ' ? 
                    'activeBtn' :
                    'btnCatalogSearch'
                    }
                    onClick={searchTabChange} 
                > 
                    АКБ
                    <span className='countSearchPage'>
                        {tabSearchBattery?.length} 
                    </span>
                </span>
                :null}
                {tabSearchOil?.length !== 0 ? 
                <span 
                    title='Масло'
                    className={tabSearch === 'Масло' ? 
                    'activeBtn' :
                    'btnCatalogSearch'
                    }
                    onClick={searchTabChange}  
                > 
                    Масло
                    <span className='countSearchPage'>
                        {tabSearchOil?.length} 
                    </span>
                </span>
                : null}
                <span>{t('search.helpTosearch')}</span>
                <span>{t('search.howTosearch')}</span>  
            </div>
            <p/>
            <div className='outputDataSearchBox'>
                {tabSearchTyre && tabSearch === t('search.typeTyre') ? 
                tabSearchTyre.map(
                    (goods: any) => (                    
                <div className='outputDataSearchList' 
                    key={goods.id}>
                    <Card
                        key={goods.id}
                        goods={goods}
                        forOrder={false} 
                        typeCard={'tyre'}
                        checkOrders={checkOrders}
                    />
                </div>
                ))
                : null
                }
                {tabSearchWheel && tabSearch === 'Диски' ? 
                tabSearchWheel.map(
                    (goods: any) => (                    
                <div className='outputDataSearchList' 
                    key={goods.id}>
                    <Card
                        key={goods.id}
                        goods={goods}
                        forOrder={false} 
                        typeCard={'wheel'}
                        checkOrders={checkOrders}
                    />
                </div>
                ))
                : null
                }
                {tabSearchBattery && tabSearch === 'Акб' ? 
                tabSearchBattery.map(
                    (goods: any) => (                    
                <div className='outputDataSearchList' 
                    key={goods.id}>
                    <Card
                        key={goods.id}
                        goods={goods}
                        forOrder={false} 
                        checkOrders={checkOrders}
                    />
                </div>
                ))
                : null
                }
                {tabSearchOil && tabSearch === 'Масло' ? 
                tabSearchOil.map(
                    (goods: any) => (                    
                <div className='outputDataSearchList' 
                    key={goods.id}>
                    <Card
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
            { 
                tabSearch === 'Шини'||
                tabSearch === 'Диски'||
                tabSearch === 'Акб' || 
                tabSearch === 'Масло' ?
             <div className='searchPagination'>
            <Suspense fallback={<span>...</span>}>
                <LoadMoreGoods loadMore={loadMoreGoods}/> 
                <Pagination/>  
            </Suspense> 
            </div> 
            : null
            }
            {tabSearchTyre?.length !== 0 ||
            tabSearchWheel?.length !== 0 ||
            tabSearchOil?.length !== 0 || 
            tabSearchBattery?.length !== 0
            ? null :
            <span>
                {t('search.noGoodsFound')} 
                {inputSearch ? 
                `${t('search.youLooked')} ${inputSearch}` : null
                }
            </span>
            }
            <Suspense fallback={<span>...</span>}>
            <Modal active={active} setActive={setActive}>
                <CheckOrder orderItem={checkOrderItem}/> 
            </Modal> 
            </Suspense>
    </div>
  )
})

export default Search;

