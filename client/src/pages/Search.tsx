import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../css/Pages/Search.css';
import Pagination from '../components/Pagination';
import LoadMoreGoods from '../components/ux/LoadMoreGoods';
import { useHistory, useLocation } from 'react-router-dom';
import { getTyresAll } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import TyresCard from '../components/cards/TyresCard';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';

const Search = observer(() => {
    const {page, goodsTyre} = useContext<any | null>(Context);
    const [inputTextSearch, setInputTextSearch] = useState<string>('');
    const [inputSearch, setInputSearch] = useState<string | null>('');
    const [tyreSearch, setTyreSearch] = useState<[] | null>(null);
    const [wheelSearch, setWheelSearch] = useState<[] | null>(null);
    const [oilSearch, setOilSearch] = useState<[] | null>(null);
    const [batterySearch, setBatterySearch] = useState<[] | null>(null);
    const [tabSearch, setTabSearch] = useState<string>('');
    const [tabSearchTyre, setTabSearchTyre] = useState<any[]>([]);
    const [tabSearchWheel, setTabSearchWheel] = useState<any[]>([]);
    const [tabSearchOil, setTabSearchOil] = useState<any[]>([]);
    const [tabSearchBattery, setTabSearchBattery] = useState<any[]>([]);
    const history = useHistory();

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();

    useEffect(() =>{
        let isMounted = false;
        if(query.get('q') && !isMounted) {
            setInputSearch(query.get('q'));
            query.delete('q');
            history.replace({
                search: query.toString(),
              })
        }
        return () => {
            isMounted = true;
        };
    },[history, query]);
  
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
        if(inputSearch?.length !== 0) {
            const newTyresSearch: any = tyreSearch?.filter((itemGoods:any) =>
            (itemGoods.id.toLowerCase().includes(inputSearch?.toLowerCase()) ||    
            itemGoods.full_name.toLowerCase().includes(inputSearch?.toLowerCase()) ||
            itemGoods.size_digits.size_only_digits.toLowerCase().includes(inputSearch?.toLowerCase())
            ));
            if (page.loadMore > 0) {
                goodsTyre.setTotalCount(newTyresSearch?.length);
                setTabSearchTyre( prevState =>
                    [...prevState, 
                        ...newTyresSearch?.splice(page.offset, page.limit)]
                ); 
            } else {
                goodsTyre.setTotalCount(newTyresSearch?.length);
                setTabSearchTyre(
                    newTyresSearch?.splice(
                        page.offset, page.limit)
                );
            }
        }  
    },[
        goodsTyre, 
        inputSearch,
        page.limit, 
        page.offset, 
        tyreSearch, 
        page.loadMore
    ]);

    const loadMoreGoods = (e: any) => {
        e.stopPropagation();
        page.setLoadMore(page.loadMore + 1);
        page.setOffset(page.offset + 9);
    };

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

    const inputSetsearch =() => {
        setTabSearchTyre([]);
        setTabSearch('');
        setInputSearch(inputTextSearch);
        setInputTextSearch('');
    }

    return (
    <div className='searchContainer'>
        <h2>Пошук товарів</h2>
        <input 
            className='inputSearchContatiner'
            defaultValue={query.get('q') ?? ''}
            onChange={
                (e: any) => setInputTextSearch(e.target.value)
            }
            type="text" 
            placeholder="Пошук..." 
            name="search"/>
        <button 
            className='searchBtnContainer'
            onClick={inputSetsearch}
        >
            Шукати
        </button>
        
        <p/>
        <span className='countAllGoods'>
            Знайдено товарів:
        </span>
            <div className="btnSearchTabContainer">
                {tabSearchTyre?.length !== 0 ? 
                <span  
                    title='Шини'
                    className={tabSearch === 'Шини' ? 
                    'activeBtn' :
                    'btnCatalogSearch'
                    }
                    onClick={searchTabChange}
                > 
                    Шини
                    <span className='countSearchPage'>
                        {goodsTyre.totalCount} 
                    </span>
                </span>
                : null}
                {tabSearchWheel?.length !== 0 ? 
                <span 
                    title='Диски'
                    className={tabSearch === 'Диски' ? 
                    'activeBtn' :
                    'btnCatalogSearch' 
                    }
                    onClick={searchTabChange}
                > 
                    Диски
                    <span className='countSearchPage'>
                        {tabSearchWheel?.length} 
                    </span>
                </span>
                : null}
                {tabSearchBattery.length !== 0 ? 
                <span 
                    title='АКБ'
                    className={tabSearch === 'АКБ' ? 
                    'activeBtn' :
                    'btnCatalogSearch'
                    }
                    onClick={searchTabChange} 
                > 
                    АКБ
                    <span className='countSearchPage'>
                        {tabSearchBattery?.length} 
                    </span>
                </span>
                :null}
                {tabSearchOil?.length !== 0 ? 
                <span 
                    title='Масло'
                    className={tabSearch === 'Масло' ? 
                    'activeBtn' :
                    'btnCatalogSearch'
                    }
                    onClick={searchTabChange}  
                > 
                    Масло
                    <span className='countSearchPage'>
                        {tabSearchOil?.length} 
                    </span>
                </span>
                : null}
                <span>Допомогти у підборі? </span>
                <span>Як підібрати?</span>  
            </div>
            <p/>
            <div className='outputDataSearchBox'>
                {tabSearchTyre && tabSearch === 'Шини' ? 
                tabSearchTyre.map(
                    (goods: any) => (                    
                <div className='outputDataSearchList' key={goods.id}>
                    <TyresCard
                        key={goods.id}
                        goods={goods}
                        forOrder={false} 
                    />
                </div>
                ))
                : null
                }
                {tabSearchWheel && tabSearch === 'Диски' ? 
                tabSearchWheel.map(
                    (goods: any) => (                    
                <div className='outputDataSearchList' key={goods.id}>
                    <TyresCard
                        key={goods.id}
                        goods={goods}
                        forOrder={false} 
                    />
                </div>
                ))
                : null
                }
                {tabSearchBattery && tabSearch === 'Акб' ? 
                tabSearchBattery.map(
                    (goods: any) => (                    
                <div className='outputDataSearchList' key={goods.id}>
                    <TyresCard
                        key={goods.id}
                        goods={goods}
                        forOrder={false} 
                    />
                </div>
                ))
                : null
                }
                {tabSearchOil && tabSearch === 'Масло' ? 
                tabSearchOil.map(
                    (goods: any) => (                    
                <div className='outputDataSearchList' key={goods.id}>
                    <TyresCard
                        key={goods.id}
                        goods={goods}
                        forOrder={false} 
                    />
                </div>
                ))
                : null
                } 
            </div>
            { 
                tabSearch === 'Шини'||
                tabSearch === 'Диски'||
                tabSearch === 'Акб' || 
                tabSearch === 'Масло' ?
             <div className='searchPagination'>
                <LoadMoreGoods loadMore={loadMoreGoods}/> 
                <Pagination/>    
            </div> 
            : null
            }
            {tabSearchTyre?.length !== 0 ||
            tabSearchWheel?.length !== 0 ||
            tabSearchOil?.length !== 0 || 
            tabSearchBattery?.length !== 0
            ? null :
            <span>
                Товари не знайдено. 
                {inputSearch ? 
                `Ви шукали товари: ${inputSearch}` : null
                }
            </span>
            }
    </div>
  )
})

export default Search;

