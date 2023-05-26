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

const CatalogTyres = () => {
    const [active, setActive] = useState(false);
    // const {goodsTyre} = useContext(Context);

    // useEffect(() =>{
    //     let isMounted = false;
    //     const loadMaintask = async() => {
    //         getTyresOffset()
    //     }
    //     loadMaintask();
    //     return () => {
    //         isMounted = true;
    //     };
    // },[]);
 
    const checkOrders = () => {
        setActive(!active);
    }

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
                <SelectRadio radioData={{ value: "deshevihDodorogih", radioName: "Від дешевих до дорогих" }}
                direction={"row"} />
                <SelectRadio radioData={{ value: "dorogihDeshevih", radioName: "Від дорогих до дешевих" }}
                direction={"row"} />
                <SelectRadio radioData={{ value: "poRatingu", radioName: "По рейтингу" }}
                direction={"row"} />               
            </div>
            <div className="rowCatalogTyres">
                <TyresCard optionsBox={true} checkOrders={checkOrders} forOrder={false}/>
            </div>
            {active?
                <Modal active={active} setActive={setActive}>
                    <CheckOrder/> 
                </Modal>   
            :null}
            <Pagination/>
        </div>
    );
};

export default CatalogTyres;