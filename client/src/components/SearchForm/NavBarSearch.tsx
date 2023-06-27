import React, { useContext, useEffect, useState } from 'react';
import '../../css/NavBarSearch.css';
import TyresCardList from '../cards/TyresCardList';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';
import { getTyresAll} from '../../restAPI/restGoodsApi';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { SEARCH_ROUTE } from '../../utils/consts';

interface INavBarSearch {
    searchBtn: boolean; 
    clickSearchBtn(): void;
}

const NavBarSearch = observer((
        {searchBtn, clickSearchBtn}: INavBarSearch
    ) => {
    const location = useLocation();
    const history = useHistory();
    const [inputSearch, setInputSearch] = useState('');
    const [tyreSearch, setTyreSearch] = useState<[] | null>(null);
    const [wheelSearch, setWheelSearch] = useState<[] | null>(null);
    const [oilSearch, setOilSearch] = useState<[] | null>(null);
    const [batterySearch, setBatterySearch] = useState<[] | null>(null);
    const [tabSearch, setTabSearch] = useState<string>('');
    const [tabSearchTyre, setTabSearchTyre] = useState<[] | null>(null);
    const [tabSearchWheel, setTabSearchWheel] = useState<[] | null>(null);
    const [tabSearchOil, setTabSearchOil] = useState<[] | null>(null);
    const [tabSearchBattery, setTabSearchBattery] = useState<[] | null>(null);
    
    useEffect(() => {
        let isMounted = false;
        const loadMaintask = async() => {
          const taskLoad: any[] = [
            getTyresAll,
          ];
        
        let i:number = 0;
        while(taskLoad.length > i) {
        if(!isMounted && taskLoad[i] === getTyresAll) {
            let tyreFilterGoods: any = await taskLoad[i]();
            setTyreSearch(tyreFilterGoods);
        }
        const task = taskLoad.shift();
        task();
        await yieldToMain(); 
        }
        }
        loadMaintask();
        return () => {
            isMounted = true;
        };
    },[]);
    
    useEffect(() => {
        if(inputSearch.length !== 0) {
            const newTyresSearch: any = tyreSearch?.filter((itemGoods:any) =>
            (itemGoods.id.toLowerCase().includes(inputSearch.toLowerCase()) ||    
            itemGoods.full_name.toLowerCase().includes(inputSearch.toLowerCase()) ||
            itemGoods.size_digits.size_only_digits.toLowerCase().includes(inputSearch.toLowerCase())
            ));
            if (newTyresSearch) {
                setTabSearchTyre(newTyresSearch);
            }  
        } else {
            setTabSearchTyre(null);
            setTabSearchWheel(null);
            setTabSearchOil(null);
            setTabSearchBattery(null);
        }
    },[inputSearch, tyreSearch]);

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

    const handleClick = () => {
        history.push('/search?q=' + inputSearch);
        clickSearchBtn();
    }
    console.log(location.pathname)
    return (
        <div id="myOverlay" className={searchBtn ? "overlayActive" : "overlay"}>
            <span className="closebtn" onClick={clickSearchBtn} title="Закрити пошук">&#10006;</span>
                <div className="overlayForm">
                    <form action="">
                    <input 
                        // onChange={searchGoods}
                        onChange={
                            (e: any) => setInputSearch(e.target.value)}
                        type="text" 
                        placeholder="Пошук..." 
                        name="search"/>
                    </form>    
                </div>
                { tabSearchTyre || tabSearchWheel || tabSearchOil || tabSearchBattery ?
                <div className='outputData'>
                    <div className='outputDataItemsTitle'>
                        <div>Результати пошуку:</div>
                    </div>
                    <div className='outputDataItemsLines'>
                        {tabSearchTyre?.length !== 0 ? 
                        <div className='outputDataItems'>
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
                        </div>
                        : null
                        }
                        {tabSearchWheel ?
                        <div className='outputDataItems'>
                        <span 
                            title='Диски'
                            className={tabSearch === 'Диски' ? 
                            'activatedTitle' :
                             'titleSearch' }
                            onClick={searchTabChange}
                        >Диски 
                            <span className='countSearch'>
                            {10020}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchBattery ?
                        <div className='outputDataItems'>
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
                        </div>
                        : null
                        }
                        {tabSearchOil ?
                        <div className='outputDataItems'>
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
                        : null
                        }
                    </div>
                    <p/>
                    <div className='outputDataItemsBox'>
                        {tabSearchTyre && tabSearch === 'Шини' ? 
                        tabSearchTyre.splice(0, 9).map((goods: any) => (                    
                        <div className='outputDataItemsList' key={goods.id}>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                            />
                        </div>
                        ))
                        : null
                        }
                        {tabSearchWheel && tabSearch === 'Диски' ? 
                        tabSearchWheel.map((goods: any) => (                    
                        <div className='outputDataItemsList'>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                            />
                        </div>
                        ))
                        : null
                        }
                        {tabSearchBattery && tabSearch === 'Акб' ? 
                        tabSearchBattery.map((goods: any) => (                    
                        <div className='outputDataItemsList'>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                            />
                        </div>
                        ))
                        : null
                        }
                        {tabSearchOil && tabSearch === 'Масло' ? 
                        tabSearchOil.map((goods: any) => (                    
                        <div className='outputDataItemsList'>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                            />
                        </div>
                        ))
                        : null
                        } 
                    </div>
                    <NavLink 
                        className='overlayLinkAll' 
                        to={`/search?q=${inputSearch}`} 
                        onClick={handleClick}
                        > 
                        Показати всі результати
                    </NavLink> 
                    {/* <Link
                        className='overlayLinkAll' 
                        to={location.pathname + `/search?q=${inputSearch}`}
                        onClick={handleClick}
                    >
                    Показати всі результати
                    </Link>  */}
                </div>
            : null
            }
        </div>
    );
});

export default NavBarSearch;