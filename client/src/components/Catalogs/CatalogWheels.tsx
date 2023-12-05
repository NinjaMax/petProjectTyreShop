import React, { useContext, useEffect, useState } from 'react';
import '../../css/Catalogs/CatalogTyres.css';
import SelectRadio from '../select/SelectRadio';
import Modal from '../modal/Modal';
import CheckOrder from '../modal/CheckOrder';
import LoadMoreGoods from '../ux/LoadMoreGoods';
import Pagination from '../Pagination';
import { ICheckOrderItem } from './types/CheckOrder.type';
import { addGoodsToBasket, createBasket, getBasketById, getStorageByIdParam, getWheelsBrandByName, getWheelsBrandRatingAvg } from '../../restAPI/restGoodsApi';
import { Context } from '../../context/Context';
import Card from '../cards/Card';
import PopularSizeTyre from '../popularGoods/PopularSizeTyre';
import PopularRequests from '../popularGoods/PopularRequests';
import { observer } from 'mobx-react-lite';
import SpinnerCarRot from '../spinners/SpinnerCarRot';
import Rating from '../ux/Rating';

type RatingBrandWheel = {
    count: number,
    rows: [
        {avgRatingBrand: number}
    ],
};
type DescWheelBrand = {
    description: string,
    id_brand?: number, 
    id_description: number, 
};

const CatalogWheels = observer(() => {
  const [active, setActive] = useState(false);
  const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
  const [wheelBrandRating, setWheelBrandRating] = useState<RatingBrandWheel>();
  //const [goodsCat, setGoodsCat] = useState([]);
  const { goodsWheel, page, filter, customer} = useContext<any | null>(Context);
  
    useEffect(() => {
        let isMounted = false;
        const getWheelBrandRatingAvg = async () => {
            if (!isMounted && filter.brands && !filter.brands.includes(',')) {
                const getWheelBrandName = await getWheelsBrandByName(filter.brands);
                const getRatingWheelBrand = await getWheelsBrandRatingAvg(getWheelBrandName.id_brands);
                setWheelBrandRating(getRatingWheelBrand);
                //console.log('GET_RATING_BRAND: ', getRatingWheelBrand);
            }
        };
        getWheelBrandRatingAvg();
        return () => {
            isMounted = true;
        };
    },[filter]);

    const checkOrders = async (
        item : ICheckOrderItem, 
        ratingModel: {avgRatingModel: number },
        storageItem: number,
        priceStockIndex: number,
    ) => {
    try {
        setActive(!active);
        if (!active) {
            // console.log("STORAGE_ITEM", storageItem);
            // console.log("PRICE_STOCK_ITEM", priceStockIndex);
            const getStorage = await getStorageByIdParam(storageItem);
            const basket: any = await createBasket({
                id_customer: customer.customer?.id, 
                storage: getStorage.storage
            });
            // console.log('GET_STORAGE: ', getStorage);
            // console.log('ITEM: ', item);
            // console.log('CREATE_BASKET_ID_BASKET: ', basket?.data);
            if(basket?.status === 201) {
                const checkItem = checkOrderItem?.find(value => +value.id === +item.id);
                const addTobasket: any = await addGoodsToBasket(
                +item.id,
                item.id_cat,
                checkItem?.quantity ? checkItem?.quantity + 4 : 4,
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
                // console.log('BASKET_ORDERS_ARR: ', basket?.data.basket_storage);
                // console.log('ADD_TO_BASKET: ', addTobasket?.data); 
                }  
            }
        }
    } catch (error) {
        console.log('BASKET_ERROR: ', error);
    }
  }

  const loadMoreGoods = (e: any) => {
    e.stopPropagation();
    page.setLoadMore(page.loadMore + 1);
    page.setOffset(page.offset + 9);
  };

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
        <h2>{`Диски ${filter.type && !filter.type.includes(',')  ? `${filter.type }` : ''} ${filter.brands && !filter.brands.includes(',') ? `${filter.brands}` : ''} ${filter.width ? `W${filter.width}` : ''} ${filter.diameter ? `R${filter.diameter}` : ''} ${filter.bolt_count && !filter.bolt_count.includes(',') ? `${filter.bolt_count}` : ''} ${filter.pcd && !filter.pcd.includes(',') ? `PCD${filter.pcd}` : ''} ${filter.et && !filter.et.includes(',') ? `ET${filter.et}` : ''} ${filter.dia && !filter.dia.includes(',') ? `DIA${filter.dia}` : ''}`}</h2>
        { filter.brands && !filter.brands.includes(',') ?
                <div>
                    {/* <img src={tyreBrandLogo(filter.brands)} alt='tyreBrandLogo'/> */}
                    <Rating 
                        numScore={wheelBrandRating?.rows[0].avgRatingBrand}
                        disabled={true}
                    />
                    <span>рейтинг на основі {wheelBrandRating?.count} відгуків</span>
                </div> 
                : null  
            }
        
        <div className='popularCatalogTyre'>
            <div>Популярні розміри:<PopularSizeTyre/></div>
            <div>Популярні запити:
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
            <span>Сортування:</span>
            <SelectRadio
                activeOptions={sortTyresGoods} 
                radioData={{ 
                    value: "vidDeshevih", 
                    radioName: "Від дешевих до дорогих",
                    name: "sortTyreCatalog",
                }}
                direction={"row"} 
            />
            <SelectRadio 
                activeOptions={sortTyresGoods} 
                radioData={{ 
                    value: "vidDorogih", 
                    radioName: "Від дорогих до дешевих",
                    name: "sortTyreCatalog",
                }}
                direction={"row"} />
            <SelectRadio 
                activeOptions={sortTyresGoods} 
                radioData={{ 
                    value: "poRatingu", 
                    radioName: "рейтингу", 
                    name: "sortTyreCatalog",
                }}
                direction={"row"} />
            <SelectRadio 
                activeOptions={sortTyresGoods} 
                radioData={{ 
                    value: "poNazvi", 
                    radioName: "назві", 
                    name: "sortTyreCatalog",
                }}
                direction={"row"} />
            <SelectRadio 
                activeOptions={sortTyresGoods} 
                radioData={{ 
                    value: "poAkcii",
                    radioName: "акційній ціні",
                    name: "sortTyreCatalog",
                }}
                direction={"row"} 
            />               
        </div>
        {goodsWheel._wheels.length !== 0 ?
            <div className="rowCatalogTyres">
                {goodsWheel._wheels ? goodsWheel._wheels?.map(
                    (goods: any) => (
                <Card
                    key={goods.id}
                    goods={goods}
                    optionsBox={true} 
                    checkOrders={checkOrders} 
                    forOrder={false}
                    typeCard={'wheel'}
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
  )
});

export default CatalogWheels