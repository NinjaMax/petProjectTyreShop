import React, {useContext, useEffect, useState} from 'react';
import '../../css/Catalogs/CatalogTyres.css';
import TyresCard from '../cards/TyresCard';
import PopularSizeTyre from '../popularGoods/PopularSizeTyre';
import PopularDiametrTyre from '../popularGoods/PopularDiametrTyre';
import SelectRadio from '../select/SelectRadio';
import Pagination from '../Pagination';
import CheckOrder from '../modal/CheckOrder';
import Modal from '../modal/Modal';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import LoadMoreGoods from '../ux/LoadMoreGoods';
import { ICheckOrderItem } from './types/CheckOrder.type';
import { addGoodsToBasket, createBasket } from '../../restAPI/restGoodsApi';

const CatalogTyres = observer(() => {
    const [active, setActive] = useState(false);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem [] | null>([]);
    const [goodsCat, setGoodsCat] = useState([]);
    const {goodsTyre, page, filter, customer} = useContext<any | null>(Context);

    useEffect(() => {
        if (!active) {
            setCheckOrderItem(null);
        }
    },[active]);

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
                console.log('CREATE_BASKET: ', basket.data); 
                console.log('CREATE_BASKET_ID_BASKET: ', basket.data.id_basket);
                if(basket?.status === 201) {
                  const addTobasket: any = await addGoodsToBasket(
                    +item.id,
                    item.id_cat,
                    4,
                    item.price[0].price,
                    item.stock[0].id_supplier,
                    item.stock[0].id_storage,
                    item.category.category,
                    basket.data.id_basket,
                    item.full_name,
                    item.season.season_ua,
                    ratingModel?.avgRatingModel,
                    item.reviews.length,
                    item.diameter.diameter,
                    ); 
                    if (addTobasket?.status === 201) {
                        setCheckOrderItem(
                            [...basket?.data.basket_storage]
                        );
                    console.log('BASKET_ORDERS_ARR: ', basket?.data.basket_storage);
                    console.log('ADD_TO_BASKET: ', addTobasket?.data); 
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
    console.log('CHECK_ORDERS: ', checkOrderItem);
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
            <h2>Шини</h2>
            <div className="btnContainerCatalogTyres">
                <button className="btnCatalog active" > Show all</button>
                <button className="btnCatalog" > Nature</button>
                <button className="btnCatalog" > Cars</button>
                <button className="btnCatalog" > People</button>
                <button className="btnCatalog" > Cars</button>
                <button className="btnCatalog" > People</button>
                <span>Допомогти у підборі? </span>
                <span>Як підібрати?</span>
            </div>
            <div className='popularCatalogTyre'>
                <div>Популярні розміри:<PopularSizeTyre/></div>
                <div>Популярні діаметри:<PopularDiametrTyre/></div>
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
                {goodsTyre._tyres ? goodsTyre._tyres?.map(
                    (goods: any) => (
                 <TyresCard
                    key={goods.id}
                    goods={goods}
                    optionsBox={true} 
                    checkOrders={checkOrders} 
                    forOrder={false}/>
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
    );
});

export default CatalogTyres;