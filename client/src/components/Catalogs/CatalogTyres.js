import {React, useState} from 'react';
import '../../css/Catalogs/CatalogTyres.css';
import TyresCard from '../Cards/TyresCard';
import PopularSizeTyre from '../PopularGoods/PopularSizeTyre';
import PopularDiametrTyre from '../PopularGoods/PopularDiametrTyre';
import SelectRadio from '../Select/SelectRadio';
import Pagination from '../Pagination';
import CheckOrder from '../Modal/CheckOrder';
import Modal from '../Modal/Modal';


const CatalogTyres = () => {
    const [active, setActive] = useState(false);

   const radioData =[{value: "deshevihDodorogih", radioName: "Від дешевих до дорогих"},
                {value: "dorogihDeshevih", radioName: "Від дорогих до дешевих"},
                {value: "poRatingu", radioName: "По рейтингу"}];                       

    const checkOrders = () => {
        setActive(!active);
    }

    return (
        <div>
            <h2>Шини</h2>
            <div className="btnContainerCatalogTyres">
                <button className="btnCatalor active" onClick={"1"}> Show all</button>
                <button className="btnCatalor" onClick={"2"}> Nature</button>
                <button className="btnCatalor" onClick={"3"}> Cars</button>
                <button className="btnCatalor" onClick={"4"}> People</button>
                <button className="btnCatalor" onClick={"3"}> Cars</button>
                <button className="btnCatalor" onClick={"4"}> People</button>
                <span>Допомогти у підборі? </span>
                <span>Як підібрати?</span>
            </div>
            <div className='popularCatalogTyre'>
                <div>Популярні розміри:<PopularSizeTyre/></div>
                <div>Популярні діаметри:<PopularDiametrTyre/></div>
            </div> 
            <div>
                <SelectRadio radioData={radioData} 
                    titleRadio={"Сортування:"}
                    direction={"row"}/>       
            </div>
            <div className="rowCatalogTyres">
                <TyresCard optionsBox={true} checkOrders={checkOrders}/>
                <TyresCard optionsBox={true} checkOrders={checkOrders}/>
                <TyresCard optionsBox={true} checkOrders={checkOrders}/>
                <TyresCard optionsBox={true} checkOrders={checkOrders}/>
                <TyresCard optionsBox={true} checkOrders={checkOrders}/>
                <TyresCard optionsBox={true} checkOrders={checkOrders}/>
                <TyresCard optionsBox={true} checkOrders={checkOrders}/>
                <TyresCard optionsBox={true} checkOrders={checkOrders}/>
                <TyresCard optionsBox={true} checkOrders={checkOrders}/>
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