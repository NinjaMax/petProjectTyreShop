import React, { lazy, useContext, useEffect, useState } from 'react';
import '../css/Pages/Compare.css';
import { addGoodsToBasket, clearCompare, createBasket, getBasketById, getCompare, getStorageByIdParam, getTyresById, getTyresModelRatingAvg, getWheelsById, getWheelsModelRatingAvg } from '../restAPI/restGoodsApi';
import TyresCardList from '../components/cards/CardList';
import { Context } from '../context/Context';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import CardSmall from '../components/cards/CardSmall';
import { ICheckOrderItem } from '../components/catalogs/types/CheckOrder.type';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const ReviewsGoodsExtend = lazy(() => import('../components/reviews/ReviewsGoodsExtend'));
const CheckOrder = lazy(() => import('../components/modal/CheckOrder'));
const Modal = lazy(() => import('../components/modal/Modal'));

const Compare = observer(() => {
    const {page, customer} = useContext<any | null>(Context);
    const [active, setActive] = useState(false);
    const [compareTyres, setCompareTyres] = useState<any[] | null>([]);
    const [compareWheels, setCompareWheel] = useState<any[] | null>([]);
    const [tabSearchMod, setTabSearchMod] = useState<string>('Шини');
    const [tabSearchModOil, setTabSearchModOil] = useState<[]>([]);
    const [tabSearchModBattery, setTabSearchModBattery] = useState<[]>([]);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
    const { t } = useTranslation();

    useEffect(() => {
        let isMounted = false;
        const getFavoriteCompare = async () => {
            const taskCompare: any[] = [
                getCompare,
            ];
          let i:number = 0;
          while(taskCompare.length > i) {
            if (!isMounted && taskCompare[i] === getCompare) {
              let curFavorites: any = await taskCompare[i]();
              page.setFavoritesCount(curFavorites);
                if(Array.isArray(curFavorites)){
                    curFavorites.forEach(async (element: string) => {      
                    let newTyresCompare: any = await getTyresById(element);
                    if(newTyresCompare) {
                        let compareRatingModel = await getTyresModelRatingAvg(newTyresCompare.id_model);
                        newTyresCompare.ratingAvg = compareRatingModel[0];
                        setCompareTyres(oldCompare => [...oldCompare!, newTyresCompare]);
                    }
                    let newWheelsCompare: any = await getWheelsById(element);
                    if(newWheelsCompare){
                       let compareWheelRatingModel = await getWheelsModelRatingAvg(newWheelsCompare.id_model);
                        newWheelsCompare.ratingAvg = compareWheelRatingModel[0];
                        setCompareWheel(oldCompare => [...oldCompare!, newWheelsCompare]); 
                    }
                    });
                }
            }
            const task = taskCompare.shift();
            task();
            await yieldToMain();
          }
        }
        getFavoriteCompare();
        return () => {isMounted = true}
    },[page])

    const searchTabModChange = (e: any) => {
        if (e.target.title === t('comparePage.addReviewStore')) {
            setTabSearchMod(t('comparePage.addReviewStore'));
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

    const clearFavoritesGoods = async () => {
        try {
           await clearCompare(); 
           setCompareTyres(null);
        } catch (error) {
            console.log(error);
        }
    }

    const checkOrders = async (
        item : ICheckOrderItem, 
        ratingModel: {avgRatingModel: number },
        storageItem: number,
        priceStockIndex: number,
        ) => {
        try {
            setActive(!active);
            if (!active) {
                const getStorageComp = await getStorageByIdParam(storageItem);
                const basket: any = await createBasket({
                    id_customer: customer.customer?.id, 
                    storage: getStorageComp.storage
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
            console.log('BASKET_ERROR: ',error);
        }
    }

  return (
    <div id="myOverlay" className="overlayCompareActive">
            {    
                compareTyres?.length !== 0 || 
                compareWheels?.length !== 0 || 
                tabSearchModOil?.length !== 0 || 
                tabSearchModBattery?.length !== 0 ?
                <div className='outputCompareData'>
                    <div className='outputDataCompareItemsTitle'>
                        <div>{t('comparePage.compareGoods')}</div>
                    </div>
                    <div className='outputDataCompareItemsLines'>
                        {compareTyres?.length !== 0 ? 
                        <div className='outputDataCompareItems'>
                        <span 
                            title={t('comparePage.compareTyre')}
                            className={tabSearchMod === t('comparePage.compareTyre') ? 
                            'activatedCompareTitle':
                            'titleCompareSearch' }
                            onClick={searchTabModChange}
                        >{t('comparePage.compareTyre')}
                            {compareTyres ?
                            <span className='countCompareSearch'>
                                {compareTyres?.length}
                            </span>  : null
                            }
                        </span>
                        </div>
                        : null
                        }
                        {compareWheels?.length !== 0 ?
                        <div className='outputDataCompareItems'>
                        <span 
                            title='Диски'
                            className={tabSearchMod === 'Диски' ? 
                            'activatedCompareTitle' :
                             'titleCompareSearch' }
                            onClick={searchTabModChange}
                        >Диски 
                        {compareWheels ?
                            <span className='countCompareSearch'>
                            {compareWheels?.length}
                            </span> : null
                        }
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModBattery?.length !== 0 ?
                        <div className='outputDataCompareItems'>
                        <span 
                            title='Акб'
                            className={tabSearchMod === 'Акб' ?  
                            'activatedCompareTitle' : 
                            'titleCompareSearch' }
                            onClick={searchTabModChange}
                        >Акб 
                            <span className='countCompareSearch'>
                                {20}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModOil?.length !== 0 ?
                        <div className='outputDataCompareItems'>
                        <span 
                            title='Масло'
                            className={tabSearchMod === 'Масло' ? 
                            'activatedCompareTitle':
                            'titleCompareSearch' }
                            onClick={searchTabModChange}
                        >Масло 
                            <span className='countCompareSearch'>
                                {20}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        <div className='titleCompareClear'
                            onClick={clearFavoritesGoods}
                        >
                            {t('comparePage.clearCompareGoods')}
                        </div>
                    </div>
                    <p/>
                    <div className='outputDataCompareContainer'>
                        <span className='outputDataCompareContainerText'>{t('comparePage.compareCharacterGoods')}</span>
                        <span className='outputDataCompareContainerList'>{t('comparePage.compareGoodsList')}</span>
                        <span className='outputDataCompareContainerRating'>{t('comparePage.compareGoodsRating')}</span>
                        <div className='outputDataCompareTable'>
                        {compareTyres && tabSearchMod === t('comparePage.compareTyre') ?
                            <div className='propertiesTyresCompare'>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsWidth')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsWidthToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsHeight')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsHeightToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsDiameter')} 
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsDiameterToolTip')}</span>                        
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsBrand')} 
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsBrandToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsModel')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsModelToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsSeason')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsSeasonToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsYear')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsYearToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsCountry')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsCountryToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsType')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsTypeToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsLoadIndex')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsLoadIndexToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsSpeedIndex')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsSpeedIndexToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsStud')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsStudToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsFullName')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsFullNameToolTip')}</span>
                                    </span>
                                </div>
                        </div>
                        : null
                        }
                        {compareWheels && tabSearchMod === 'Диски' ?
                            <div className='propertiesWheelsCompare'>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsWidthWheel')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsWidthWheelTool')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsPcd')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsPcdToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsDiameterWheel')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsDiameterWheelToolTip')}</span>                        
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsBrandWheel')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsBrandWheelToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsModelWheel')} 
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsModelWheelToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsTypeWheel')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsTypeWheelToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsEt')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsEtToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsDia')} 
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsDiaToolTip')}</span>
                                    </span>
                                </div>
                                <div className="compareGoodsColor">
                                    <span>{t('comparePage.compareGoodsColor')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsColorToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsPcd2')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsPcd2ToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsPcdBolt')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsPcdBoltToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsBoltCount')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsBoltCountToolTip')}</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>{t('comparePage.compareGoodsFullNameWheel')}
                                        <span className="tooltiTextCompareTyres">{t('comparePage.compareGoodsFullNAmeWheelToolTip')}</span>
                                    </span>
                                </div>
                        </div>
                        : null
                        }
                        </div>
                        <div className='outputDataCompareItemsBox'>
                            {compareTyres && tabSearchMod === t('comparePage.compareTyre') ? 
                            compareTyres?.map((goods:any) => (                    
                                <div 
                                    className='outputDataCompareItemsList' 
                                    key={goods.id}>
                                <CardSmall
                                    key={goods.id}
                                    product={goods}
                                    checkOrders={checkOrders}
                                />
                                <p/>
                                <div className='outputDataCompareItemsBoxRating'>
                                    <ReviewsGoodsExtend 
                                        typeRating={'tyres'}
                                        ratingItem={goods.ratingAvg}
                                    />
                                    <a href='/'>{goods.reviews?.length + 
                                    `${goods.reviews?.length === 1 ? t('comparePage.compareGoodsReview'): t('comparePage.compareGoodsReviews')}`}</a>    
                                </div>
                                <div className='dataCompareItemsPropsTyre'>
                                    <span>{goods.width.width ?? ''}</span>
                                    <span>{goods.height.height ?? ''}</span>
                                    <span>{goods.diameter.diameter ?? ''}</span>
                                    <span>{goods.tyre_brand.brand ?? ''}</span>
                                    <span>{goods.tyre_model.model ?? ''}</span>
                                    <span>{goods.season.season_ua ?? ''}</span>
                                    <span>{goods.year.manufacture_year ?? ''}</span>
                                    <span>{goods.country.country_manufacturer_ua ?? ''}</span>
                                    <span>{goods.vehicle_type.vehicle_type_ua ?? ''}</span>
                                    <span>{goods.load_index.load_index_with_desc ?? ''}</span>
                                    <span>{goods.speed_index.speed_index_with_desc ?? ''}</span>
                                    <span>{goods.studded.studded ?? ''}</span>
                                    <span>{goods.full_name ?? ''}</span>
                                </div>
                                </div>
                                ))
                                : null
                            }
                            {compareWheels && tabSearchMod === 'Диски' ? 
                                compareWheels.map((goods: any) => (                    
                                <div className='outputDataCompareItemsList'
                                    key={goods.id}
                                >
                                    <CardSmall
                                        key={goods.id}
                                        product={goods}
                                        checkOrders={checkOrders}
                                    />
                                <p/>
                                <div className='outputDataCompareItemsBoxRating'>
                                    <ReviewsGoodsExtend 
                                    ratingItem={goods.ratingAvg}
                                    typeRating={'wheels'}
                                    />
                                    <a href='/'>{goods.reviews?.length + 
                                    `${goods.reviews?.length === 1 ? t('comparePage.compareGoodsReview'): t('comparePage.compareGoodsReviews')}`}</a>    
                                </div>
                                <div className='dataCompareItemsPropsTyre'>
                                    <span>{goods.width.width ?? ''}</span>
                                    <span>{goods.pcd?.pcd ?? ''}</span>
                                    <span>{goods.diameter.diameter ?? ''}</span>
                                    <span>{goods.wheel_brand.brand ?? ''}</span>
                                    <span>{goods.wheel_model.model ?? ''}</span>
                                    <span>{goods.type.type ?? ''}</span>
                                    <span>{goods.et?.et ?? ''}</span>
                                    <span>{goods.dia?.dia ?? ''}</span>
                                    <span>{goods.color?.color?? ''}</span>
                                    <span>{goods.pcd2.pcd2 ?? ''}</span>
                                    <span>{goods.bolt_count_pcd?.bolt_count_pcd ?? ''}</span>
                                    <span>{goods.bolt_count?.bolt_count ?? ''}</span>
                                    <span>{goods.full_name_color ?? ''}</span>
                                </div>
                                </div>
                                ))
                                : null
                            }
                            {tabSearchModBattery && tabSearchMod === 'Акб' ? 
                                tabSearchModBattery.map((goods: any) => (                    
                                <div className='outputDataCompareItemsList'
                                    key={goods.id}
                                >
                                    <TyresCardList
                                        key={goods.id}
                                        goods={goods}
                                        forOrder={false} 
                                        checkOrders={checkOrders}
                                    />
                                <p/>
                                <div className='outputDataCompareItemsBoxRating'>
                                    <ReviewsGoodsExtend ratingItem={goods.ratingAvg}/>
                                    <a href='/'>{goods.reviews?.length + 
                                    `${goods.reviews?.length === 1 ? t('comparePage.compareGoodsReview') : t('comparePage.compareGoodsReviews')}`}</a>    
                                </div>
                                <div className='dataCompareItemsPropsTyre'>
                                    <span>{goods.width.width ?? ''}</span>
                                    <span>{goods.height.height ?? ''}</span>
                                    <span>{goods.diameter.diameter ?? ''}</span>
                                    <span>{goods.tyre_brand.brand ?? ''}</span>
                                    <span>{goods.tyre_model.model ?? ''}</span>
                                    <span>{goods.season.season_ua ?? ''}</span>
                                    <span>{goods.year.manufacture_year ?? ''}</span>
                                    <span>{goods.country.country_manufacturer_ua ?? ''}</span>
                                    <span>{goods.vehicle_type.vehicle_type_ua ?? ''}</span>
                                    <span>{goods.load_index.load_index_with_desc ?? ''}</span>
                                    <span>{goods.speed_index.speed_index_with_desc ?? ''}</span>
                                    <span>{goods.studded.studded ?? ''}</span>
                                    <span>{goods.full_name ?? ''}</span>
                                </div>
                                </div>
                                ))
                                : null
                            }
                            {tabSearchModOil && tabSearchMod === 'Масло' ? 
                                tabSearchModOil.map((goods: any) => (                    
                                <div className='outputDataCompareItemsList'
                                    key={goods.id}
                                >
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
                    </div>
                </div>
            : <div className='noCompareGoods'>{t('comparePage.compareGoodsNoGoods')}{t('comparePage.addReviewStore')}</div>
            }
            <Modal active={active} setActive={setActive}>
                <CheckOrder orderItem={checkOrderItem}/> 
            </Modal> 
        </div>
    )
});

export default Compare;