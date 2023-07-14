import React, {useContext, useState} from 'react';
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
import { addGoodsToBasket } from '../../restAPI/restGoodsApi';

const CatalogTyres = observer(() => {
    const [active, setActive] = useState(false);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem | null>(null);
    const [goodsCat, setGoodsCat] = useState([]);
    const {goodsTyre, page, filter, customer} = useContext<any | null>(Context);

    const checkOrders = async (item : ICheckOrderItem, ) => {
        try {
            setActive(!active);
            if (!active) {
                
                const addTobasket: any = await addGoodsToBasket(
                    item.id,
                    item.category.id_cat,
                    customer.customer.id,
                    item.full_name,
                    4,
                    item.price[0].price
                ); 
                if (addTobasket?.status === 201) {
                    setCheckOrderItem(item);
                    console.log('ADD_TO_BASKET: ', addTobasket); 
                }
                
            } else {
                setCheckOrderItem(null);
            }
            //localStorage.setItem('goodsId', JSON.stringify([item.id, '000001', '0002','00003']));
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
                    radioData={{ value: "vidDeshevih", radioName: "Від дешевих до дорогих" }}
                    direction={"row"} />
                <SelectRadio 
                    activeOptions={sortTyresGoods} 
                    radioData={{ value: "vidDorogih", radioName: "Від дорогих до дешевих" }}
                    direction={"row"} />
                <SelectRadio 
                    activeOptions={sortTyresGoods} 
                    radioData={{ value: "poRatingu", radioName: "рейтингу" }}
                    direction={"row"} />
                <SelectRadio 
                    activeOptions={sortTyresGoods} 
                    radioData={{ value: "poNazvi", radioName: "назві" }}
                    direction={"row"} />
                <SelectRadio 
                    activeOptions={sortTyresGoods} 
                    radioData={{ value: "poAkcii", radioName: "акційній ціні" }}
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