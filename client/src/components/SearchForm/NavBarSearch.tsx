import React, { useContext, useState } from 'react';
import '../../css/NavBarSearch.css';
import TyresCardList from '../cards/TyresCardList';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';

interface INavBarSearch {
    searchBtn: boolean; 
    clickSearchBtn(): void;
}

const NavBarSearch = observer((
        {searchBtn, clickSearchBtn}: INavBarSearch
    ) => {
        const {filter, goodsTyre} = useContext<any | null>(Context);
        const [tabSearch, setTabSearch] = useState<string>('');
        const [tabSearchTyre, setTabSearchTyre] = useState<[] | null>(null);


    const searchGoods = (e: any) => {
        const tyresSearch = goodsTyre._tyres_filter.filter((itemGoods:any) => 
            itemGoods.full_name.toLowerCase().includes(e.target.value) || 
            itemGoods.id.toLowerCase().includes(e.target.value) ||
            itemGoods.size_digits.size_only_digits.toLowerCase().includes(e.target.value)
        );
        if (tyresSearch) {
            tyresSearch.splice(0, 10);
            setTabSearchTyre(tyresSearch);
        }
        console.log(e.target.value);
    }

    const searchTabChange = (e: any) => {
        if (e.target.title === 'Шини') {
            setTabSearch('Шини');
        }
        if (e.target.title === 'Диски') {
            setTabSearch('Диски');
        }
        if (e.target.title === 'Акб') {
            setTabSearch('Акб');
        }
        if (e.target.title === 'Масло') {
            setTabSearch('Масло');
        }
    }
        
    return (
        <div id="myOverlay" className={searchBtn ? "overlayActive" : "overlay"}>
            <span className="closebtn" onClick={clickSearchBtn} title="Закрити пошук">&#10006;</span>
                <div className="overlayForm">
                    <form action="">
                    <input 
                        onChange={searchGoods}
                        type="text" 
                        placeholder="Пошук..." 
                        name="search"/>
                        {/* <button type="submit"><i className="fa fa-search"></i></button> */}
                    </form>    
                </div>
                <div className='outputData'>  
                    <div className='outputDataItems'>
                        <div>Результати пошуку:</div>
                        {tabSearchTyre?.length !== 0 ? 
                        <span 
                            title='Шини'
                            className={tabSearch === 'Шини' ? 
                            'activatedTitle':
                            'titleSearch' }
                            onClick={searchTabChange}
                        >Шини 
                            <span className='countSearch'>
                                {tabSearchTyre?.length} 
                            </span>
                        </span>
                        : null
                        }
                        <span 
                            title='Диски'
                            className={tabSearch === 'Диски' ? 
                            'activatedTitle' :
                             'titleSearch' }
                            onClick={searchTabChange}
                        >Диски 
                            <span className='countSearch'>
                            {20}
                            </span>
                        </span>
                        <span 
                            title='Акб'
                            className={tabSearch === 'Акб' ?  
                            'activatedTitle' : 
                            'titleSearch' }
                            onClick={searchTabChange}
                        >Акб 
                            <span className='countSearch'>
                                {20}
                            </span>
                        </span>
                        <span 
                            title='Масло'
                            className={tabSearch === 'Масло' ? 
                            'activatedTitle':
                            'titleSearch' }
                            onClick={searchTabChange}
                        >Масло 
                            <span className='countSearch'>
                                {20}
                            </span>
                        </span>
                    </div>
                    <p/>
                    {tabSearchTyre && tabSearch === 'Шини' ? 
                        tabSearchTyre.map((goods: any) => (                    
                    <div className='outputDataItemsBox'>
                        <div className='outputDataItemsList'>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                            />
                        </div>
                    </div> ))
                    : null
                    }
                    <div className='outputDataItemsList'>
                       
                    </div>      
                    <div className='outputDataItemsList'>
                        
                    </div>    
                    <div className='outputDataItemsList'>
                        
                    </div>     
                    <div className='outputDataItemsList'>
                        
                    </div>       
                    <div className='outputDataItemsList'>
                        
                    </div>
                    <div className='outputDataItemsList'>
                        
                    </div> 
                    <NavLink className='overlayLinkAll' to={''} > Показати всі результати</NavLink>  
                </div>
        </div>
    );
});

export default NavBarSearch;