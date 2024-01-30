import React, {useContext, useEffect, useState} from 'react';
import '../../css/Catalogs/CatalogTyres.css';
import Card from '../cards/Card';
import PopularSizeTyre from '../popularGoods/PopularSizeTyre';
import PopularRequests from '../popularGoods/PopularRequests';
import SelectRadio from '../select/SelectRadio';
import Pagination from '../Pagination';
import CheckOrder from '../modal/CheckOrder';
import Modal from '../modal/Modal';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import LoadMoreGoods from '../ux/LoadMoreGoods';
import { ICheckOrderItem } from './types/CheckOrder.type';
import { addGoodsToBasket, createBasket, getBasketById, getStorageByIdParam, getTyresBrandByName, getTyresBrandRatingAvg } from '../../restAPI/restGoodsApi';
import { tyreBrandLogo } from '../../services/tyreBrandImg.service';
import SpinnerCarRot from '../spinners/SpinnerCarRot';
import Rating from '../ux/Rating';
import { useTranslation } from 'react-i18next';

type RatingBrandTyre = {
    count: number,
    rows: [
        {avgRatingBrand: number}
    ],
};
type DescTyreBrand = {
    description: string,
    id_brand?: number, 
    id_description: number, 
};

const CatalogTyres = observer(() => {
    const [active, setActive] = useState<boolean>(false);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
    const [tyreBrandDesc, setTyresBrandDesc] = useState<DescTyreBrand>();
    const [tyreRatingAvr, setTyreRatingAvr] = useState<RatingBrandTyre>();
    const {goodsTyre, page, filter, customer} = useContext<any | null>(Context);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        let isMounted = false;
        const getBrandTyreData = async () => {
           if (!isMounted && filter.brands && !filter.brands.includes(',')) {
                try {
                    const getBrandsIdTyre = await getTyresBrandByName(filter.brands);
                    //console.log('GET_TYRE_BRAND: ', getBrandsIdTyre);
                    const getTyresRatingBrand = await getTyresBrandRatingAvg(getBrandsIdTyre.id_brand);
                    //console.log('GET_RATING_TYRE_BRAND: ', getTyresRatingBrand);
                    if (getTyresRatingBrand) {
                        setTyreRatingAvr(getTyresRatingBrand);
                    }
                } catch (error) {
                    console.log(error);
                } 
            }
        };
        getBrandTyreData();
        return () => {
            isMounted = true;
          };
    },[filter.brands]);

    const checkOrders = async (
        item : ICheckOrderItem, 
        ratingModel: {avgRatingModel: number },
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
                //console.log('CREATE_BASKET_ID_BASKET: ', basket.data.id_basket);
                //console.log('ITEM_GOODS: ', item)
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
                    item.season.season_ua,
                    ratingModel?.avgRatingModel,
                    item.reviews.length,
                    item.diameter.diameter,
                    ); 
                    //console.log('ADD_BASK: ', addTobasket);
                    if (addTobasket?.status === 201) {
                        const updateBasketStorage = await getBasketById(basket.data.id_basket);
                        setCheckOrderItem(
                            [...updateBasketStorage?.basket_storage]
                        );
                        page.setBasketCount(
                            updateBasketStorage?.basket_storage.reduce(
                                (sum: any, current: any) => (sum + current.quantity),0)
                        );
                    //console.log('BASKET_ORDERS_ARR: ', basket?.data.basket_storage);
                    //console.log('ADD_TO_BASKET: ', addTobasket?.data); 
                    }  
                }
            }
        } catch (error) {
            console.log('BASKET_ERROR: ',error);
        }
    }

    const loadMoreGoods = (e: any) => {
        e.stopPropagation();
        page.setLoadMore(page.loadMore + 1);
        page.setOffset(page.offset + 9);
    };
    //console.log('CHECK_ORDERS: ', checkOrderItem);

    const sortTyresGoods = (e: any) => {
        if (e.target.value === 'vidDeshevih') {
            page.setOffset(0);
            page.setLoadMore(0);
            filter.setSort('ASC');
        }
        if (e.target.value === 'vidDorogih') {
            page.setOffset(0);
            page.setLoadMore(0);
            filter.setSort('DESC');
        }
        if (e.target.value === 'poRatingu') {
            page.setOffset(0);
            page.setLoadMore(0);
            filter.setSort('rating');
        }
        if (e.target.value === 'poNazvi') {
            page.setOffset(0);
            page.setLoadMore(0);
            filter.setSort('title');
        }
        if (e.target.value === 'poAkcii') {
            page.setOffset(0);
            page.setLoadMore(0);
            filter.setSort('oldPrice');
        }
    };

    return (
        <div>
            <h2>{`${t('catalogTyre.title')} ${filter.season && !filter.season.includes(',') ? `${filter.season}` : ''} ${filter.studded && !filter.studded.includes(',') ? `${filter.studded}` : ''} ${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `${filter.vehicle_type}` : ''} ${filter.brands && !filter.brands.includes(',') ? `${filter.brands}` : ''} ${filter.width ? `${filter.width}` : ''} ${filter.height ? `/${filter.height}` : ''} ${filter.diameter ? `R${filter.diameter}` : ''}`}</h2>
            { filter.brands && !filter.brands.includes(',') ?
                <div>
                    <img className='cataloTyresImg' src={tyreBrandLogo(filter.brands) ?? ''} alt='tyreBrandLogo'/>
                    <Rating 
                        id={'brand'}
                        numScore={tyreRatingAvr?.rows[0]?.avgRatingBrand ?? 0}
                        disabled={true}
                    />
                    <span>{t('catalogTyre.brand_rating_one')} {tyreRatingAvr?.count} {t('catalogTyre.brand_rating_two')}</span>
                </div> 
                : null  
            }
            <div className='popularCatalogTyre'>
                <div>{t('catalogTyre.popular_size')}<PopularSizeTyre/></div>
                <div>{t('catalogTyre.popular_request')}
                    <PopularRequests
                        entityLink={[
                        { link: '/tyres/lіtnya/w195/h65/r15', title: '195/65 R15 літо'},
                        { link: '/tyres/legkovantazhnii', title: ' шини для мікроавтобуса'},
                        { link: '/tyres/zimova/w205/h55/r16', title: 'зимние шини 205/55 R16'},
                        { link: '/tyres/goodyear/w215/h65/r16', title: 'шини Goodyear 215/65 R16'},
                        { link: '/tyres/zimova/w195/h65/r15', title: '195/65 R15 зима'},
                        ]}
                    />
                </div>
            </div> 
            <div className='sortBtnCatalog'>
                <span>{t('catalogTyre.sort_title')}</span>
                <SelectRadio
                    activeOptions={sortTyresGoods} 
                    radioData={{ 
                        value: "vidDeshevih", 
                        radioName: t('catalogTyre.sort_cheapest'),
                        name: "sortTyreCatalog",
                    }}
                    direction={"row"} />
                <SelectRadio 
                    activeOptions={sortTyresGoods} 
                    radioData={{ 
                        value: "vidDorogih", 
                        radioName: t('catalogTyre.sort_expensive'),
                        name: "sortTyreCatalog",
                    }}
                    direction={"row"} />
                <SelectRadio 
                    activeOptions={sortTyresGoods} 
                    radioData={{ 
                        value: "poRatingu", 
                        radioName: t('catalogTyre.sort_rating'), 
                        name: "sortTyreCatalog",
                    }}
                    direction={"row"} />
                <SelectRadio 
                    activeOptions={sortTyresGoods} 
                    radioData={{ 
                        value: "poNazvi", 
                        radioName: t('catalogTyre.sort_name'), 
                        name: "sortTyreCatalog",
                    }}
                    direction={"row"} />
                <SelectRadio 
                    activeOptions={sortTyresGoods} 
                    radioData={{ 
                        value: "poAkcii",
                        radioName: t('catalogTyre.sort_promotion'),
                        name: "sortTyreCatalog",
                    }}
                    direction={"row"} />               
            </div>
            {goodsTyre._tyres.length !== 0 ?
            <div className="rowCatalogTyres">
                {goodsTyre._tyres ? goodsTyre._tyres?.map(
                    (goods: any) => (
                 <Card
                    key={goods.id}
                    goods={goods}
                    optionsBox={true} 
                    checkOrders={checkOrders} 
                    forOrder={false}
                    typeCard={'tyre'}
                    />
                ))   
                : null
                }
                <Modal active={active} setActive={setActive}>
                    <CheckOrder orderItem={checkOrderItem}/> 
                </Modal> 
            </div> 
            : 
            <div className='spinerCatalogGoodsLoad'>
                <SpinnerCarRot/>
            </div>
            }
            <div className='pagePagCatalog'>
                <LoadMoreGoods loadMore={loadMoreGoods}/>
                <Pagination/>   
            </div>
        </div>
    );
});

export default CatalogTyres;