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

const CatalogTyres = observer(() => {
    const [active, setActive] = useState(false);
    const [goodsCat, setGoodsCat] = useState([]);
    const {goodsTyre, page, filter} = useContext<any | null>(Context);

    // useEffect(() =>{
    //     let isMounted = false;
    //     const tyreGoods = goodsTyre._tyres_filter.slice();
       
    //     const loadMaintask = async() => {
    //     if (!isMounted && tyreGoods) {    
    //         page.loadMore > 0 ? goodsTyre?.setTyres(
    //         [...goodsTyre._tyres, ...tyreGoods] 
    //         ) : goodsTyre?.setTyres(tyreGoods);
    //     }
    //     }
    //     loadMaintask();
    //     return () => {
    //         isMounted = true;
    //     };
    // },[]);
 
    const checkOrders = () => {
        setActive(!active);
    }

    const loadMoreGoods = (e: any) => {
        e.stopPropagation();
        page.setLoadMore(page.loadMore + 1);
        page.setOffset(page.offset + 9);
    };

    const sortTyresGoods = (e: any) => {
        //console.log(e.target.value);
        if (e.target.value === 'vidDeshevih') {
            filter.setCheap(true);
            filter.setExpensive(false);
            filter.setRating(false);
            filter.setTitleName(false);
            filter.setOldPrice(false);
            console.log(e.target.value);
        }
        if (e.target.value === 'vidDorogih') {
            filter.setExpensive(true);
            filter.setCheap(false);
            filter.setRating(false);
            filter.setTitleName(false);
            filter.setOldPrice(false);
            console.log(e.target.value);
        }
        if (e.target.value === 'poRatingu') {
            filter.setRating(true);
            filter.setCheap(false);
            filter.setExpensive(false);
            filter.setTitleName(false);
            filter.setOldPrice(false);
            console.log(e.target.value);
        }
        if (e.target.value === 'poNazvi') {
            filter.setTitleName(true);
            filter.setCheap(false);
            filter.setExpensive(false);
            filter.setRating(false);
            filter.setOldPrice(false);
            console.log(e.target.value);
        }
        if (e.target.value === 'poAkcii') {
            filter.setOldPrice(true);
            filter.setCheap(false);
            filter.setExpensive(false);
            filter.setRating(false);
            filter.setTitleName(false);
            console.log(e.target.value);
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
            </div>
            {active?
                <Modal active={active} setActive={setActive}>
                    <CheckOrder/> 
                </Modal>   
            :null}
            <LoadMoreGoods loadMore={loadMoreGoods}/>
            <Pagination/>
        </div>
    );
});

export default CatalogTyres;