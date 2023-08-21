import React, { useContext, useEffect, useState } from 'react';
import '../../css/NavBarSearch.css';
import TyresCardList from '../cards/CardList';
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
    const [inputSearchMod, setInputSearchMod] = useState('');
    const [tyreSearchMod, setTyreSearchMod] = useState<[] | null>(null);
    const [wheelSearchMod, setWheelSearchMod] = useState<[] | null>(null);
    const [oilSearchMod, setOilSearchMod] = useState<[] | null>(null);
    const [batterySearchMod, setBatterySearchMod] = useState<[] | null>(null);
    const [tabSearchMod, setTabSearchMod] = useState<string>('');
    const [tabSearchModTyre, setTabSearchModTyre] = useState<[]>([]);
    const [tabSearchModWheel, setTabSearchModWheel] = useState<[]>([]);
    const [tabSearchModOil, setTabSearchModOil] = useState<[]>([]);
    const [tabSearchModBattery, setTabSearchModBattery] = useState<[]>([]);
    
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
            setTyreSearchMod(tyreFilterGoods);
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
        if(inputSearchMod.length !== 0) {
            const newTyresSearch: any = tyreSearchMod?.filter((itemGoods:any) =>
            (itemGoods.id.toLowerCase().includes(inputSearchMod.toLowerCase()) ||    
            itemGoods.full_name.toLowerCase().includes(inputSearchMod.toLowerCase()) ||
            itemGoods.size_digits.size_only_digits.toLowerCase().includes(inputSearchMod.toLowerCase())
            ));
            if (newTyresSearch) {
                setTabSearchModTyre(newTyresSearch);
            }  
        } 
        // else {
        //     setTabSearchModTyre(null);
        //     setTabSearchModWheel(null);
        //     setTabSearchModOil(null);
        //     setTabSearchModBattery(null);
        // }
    },[inputSearchMod, tyreSearchMod]);

    const searchTabModChange = (e: any) => {
        if (e.target.title === 'Шини') {
            setTabSearchMod('Шини');
        }
        if (e.target.title === 'Диски') {
            setTabSearchMod('Диски');
        }
        if (e.target.title === 'Акб') {
            setTabSearchMod('Акб');
        }
        if (e.target.title === 'Масло') {
            setTabSearchMod('Масло');
        }
    }

    const handleModClick = () => {
        history.push('/search?q=' + inputSearchMod);
        clickSearchBtn();
    }
    
    return (
        <div id="myOverlay" className={searchBtn ? "overlayActive" : "overlay"}>
            <span className="closebtn" onClick={clickSearchBtn} title="Закрити пошук">&#10006;</span>
                <div className="overlayForm">
                    <form action="">
                    <input 
                        onChange={
                            (e: any) => setInputSearchMod(e.target.value)}
                        type="text" 
                        placeholder="Пошук..." 
                        name="search"/>
                    </form>    
                </div>
                { 
                    tabSearchModTyre?.length !== 0 || 
                    tabSearchModWheel?.length !== 0 || 
                    tabSearchModOil?.length !== 0 || 
                    tabSearchModBattery?.length !== 0 ?
                <div className='outputData'>
                    <div className='outputDataItemsTitle'>
                        <div>Результати пошуку:</div>
                    </div>
                    <div className='outputDataItemsLines'>
                        {tabSearchModTyre?.length !== 0 ? 
                        <div className='outputDataItems'>
                        <span 
                            title='Шини'
                            className={tabSearchMod === 'Шини' ? 
                            'activatedTitle':
                            'titleSearch' }
                            onClick={searchTabModChange}
                        >Шини 
                            <span className='countSearch'>
                                {tabSearchModTyre?.length}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModWheel?.length !== 0 ?
                        <div className='outputDataItems'>
                        <span 
                            title='Диски'
                            className={tabSearchMod === 'Диски' ? 
                            'activatedTitle' :
                             'titleSearch' }
                            onClick={searchTabModChange}
                        >Диски 
                            <span className='countSearch'>
                            {10020}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModBattery?.length !== 0 ?
                        <div className='outputDataItems'>
                        <span 
                            title='Акб'
                            className={tabSearchMod === 'Акб' ?  
                            'activatedTitle' : 
                            'titleSearch' }
                            onClick={searchTabModChange}
                        >Акб 
                            <span className='countSearch'>
                                {20}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModOil?.length !== 0 ?
                        <div className='outputDataItems'>
                        <span 
                            title='Масло'
                            className={tabSearchMod === 'Масло' ? 
                            'activatedTitle':
                            'titleSearch' }
                            onClick={searchTabModChange}
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
                        {tabSearchModTyre && tabSearchMod === 'Шини' ? 
                        tabSearchModTyre.splice(0, 9).map((goods: any) => (                    
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
                        {tabSearchModWheel && tabSearchMod === 'Диски' ? 
                        tabSearchModWheel.map((goods: any) => (                    
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
                        {tabSearchModBattery && tabSearchMod === 'Акб' ? 
                        tabSearchModBattery.map((goods: any) => (                    
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
                        {tabSearchModOil && tabSearchMod === 'Масло' ? 
                        tabSearchModOil.map((goods: any) => (                    
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
                        to={`/search?q=${inputSearchMod}`} 
                        onClick={handleModClick}
                        > 
                        Показати всі результати
                    </NavLink> 
                </div>
            : null
            }
        </div>
    );
});

export default NavBarSearch;