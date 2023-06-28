import React, { useEffect, useState } from 'react';
import '../css/Pages/Search.css';
import Pagination from '../components/Pagination';
import LoadMoreGoods from '../components/ux/LoadMoreGoods';
import { useLocation } from 'react-router-dom';
import { getTyresAll } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';



const Search = () => {
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

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  
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
        //setTyreSearch(tyreFilterGoods);
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
  console.log(query.get('q'));

  return (
    <div className='searchContainer'>
        <h2>Пошук</h2>
        <div className="btnSearchTabContainer">
            <button className="btnCatalogSearch active" > Show all</button>
            <button className="btnCatalogSearch" > Nature</button>
            <button className="btnCatalogSearch" > Cars</button>
            <button className="btnCatalogSearch" > People</button>
            <button className="btnCatalogSearch" > Cars</button>
            <button className="btnCatalogSearch" > People</button>
            <span>Допомогти у підборі? </span>
            <span>Як підібрати?</span>  
        </div>
        {/* <div className="rowCatalogSearch">
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
      <LoadMoreGoods loadMore={loadMoreGoods}/> */}
      <Pagination/>
    </div>
  )
}

export default Search;

