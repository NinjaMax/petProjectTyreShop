import React, { useContext, useState } from 'react';
import '../../css/Catalogs/CatalogTyres.css';
import SelectRadio from '../select/SelectRadio';
import Modal from '../modal/Modal';
import CheckOrder from '../modal/CheckOrder';
import LoadMoreGoods from '../ux/LoadMoreGoods';
import Pagination from '../Pagination';
import { ICheckOrderItem } from './types/CheckOrder.type';
import { addGoodsToBasket, createBasket, getBasketById } from '../../restAPI/restGoodsApi';
import { Context } from '../../context/Context';
import Card from '../cards/Card';
import PopularSizeTyre from '../popularGoods/PopularSizeTyre';
import PopularDiametrTyre from '../popularGoods/PopularDiametrTyre';
import { observer } from 'mobx-react-lite';

const CatalogWheels = observer(() => {
  const [active, setActive] = useState(false);
  const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
  const [goodsCat, setGoodsCat] = useState([]);
  const {goodsTyre, goodsWheel, page, filter, customer} = useContext<any | null>(Context);
  
  const checkOrders = async (
    item : ICheckOrderItem, 
    ratingModel: {avgRatingModel: number }
    ) => {
    try {
        setActive(!active);
        if (!active) {
            const basket: any = await createBasket(
                customer.customer?.id,
            );
            //console.log('CREATE_BASKET_ID_BASKET: ', basket.data.id_basket);
            if(basket?.status === 201) {
                const checkItem = checkOrderItem?.find(value => +value.id === +item.id);
                const addTobasket: any = await addGoodsToBasket(
                +item.id,
                item.id_cat,
                checkItem?.quantity ? checkItem?.quantity + 4 : 4,
                item.price[0].price,
                item.stock[0].id_supplier,
                item.stock[0].id_storage,
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
  
  //console.log("GOODS_WHEELS: ", goodsWheel._wheels)
  return (
    <div>
        <h2>{`Диски ${filter.type && !filter.type.includes(',')  ? `${filter.type }` : ''} ${filter.brands && !filter.brands.includes(',') ? `${filter.brands}` : ''} ${filter.width ? `W${filter.width}` : ''} ${filter.diameter ? `R${filter.diameter}` : ''} ${filter.bolt_count && !filter.bolt_count.includes(',') ? `${filter.bolt_count}` : ''} ${filter.pcd && !filter.pcd.includes(',') ? `PCD${filter.pcd}` : ''} ${filter.et && !filter.et.includes(',') ? `ET${filter.et}` : ''} ${filter.dia && !filter.dia.includes(',') ? `DIA${filter.dia}` : ''}`}</h2>
            <div className='popularCatalogTyre'>
                <div>Популярні розміри:<PopularSizeTyre/></div>
                <div>Популярні запити:<PopularDiametrTyre/></div>
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
                    direction={"row"} />
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
                    direction={"row"} />               
            </div>
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
            <LoadMoreGoods loadMore={loadMoreGoods}/>
            <Pagination/>
    </div>
  )
});

export default CatalogWheels