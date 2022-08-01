import React from 'react';
import TyresCard from '../Cards/TyresCard';
import PopularSizeTyre from '../PopularGoods/PopularSizeTyre';
import PopularDiametrTyre from '../PopularGoods/PopularDiametrTyre';
import SortLine from '../Sort/SortLine';
import '../../css/Catalogs/CatalogTyres.css';

const CatalogTyres = () => {
    return (
        <div>
            <h2>PORTFOLIO</h2>
            <div className="btnContainerCatalogTyres">
                <button className="btn active" onClick={"1"}> Show all</button>
                <button className="btn" onClick={"2"}> Nature</button>
                <button className="btn" onClick={"3"}> Cars</button>
                <button className="btn" onClick={"4"}> People</button>
                <button className="btn" onClick={"3"}> Cars</button>
                <button className="btn" onClick={"4"}> People</button>
                <span>Допомогти у підборі? </span>
                <span>Як підібрати?</span>
            </div>
            <div className='popularCatalogTyre'>
                <div>Популярні розміри:<PopularSizeTyre/></div>
                <div>Популярні діаметри:<PopularDiametrTyre/></div>
            </div> 
            <div>
                <SortLine/>
            </div>
            <div className="rowCatalogTyres">
                <TyresCard/>
                <TyresCard/>
                <TyresCard/>
                <TyresCard/>
                <TyresCard/>
                <TyresCard/>
                <TyresCard/>
                <TyresCard/>
                <TyresCard/>
            </div>
        </div>
    );
};

export default CatalogTyres;