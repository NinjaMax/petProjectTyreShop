import React, { useContext, useEffect, useState } from 'react'
import '../css/Pages/Favorite.css';
import CardList from '../components/cards/CardList';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { 
    clearFavorites, 
    getFavorites, 
    getTyresById, 
    getWheelsById
} from '../restAPI/restGoodsApi';
import { Context } from '../context/Context';

const Favorite = () => {
    // const location = useLocation();
    // const history = useHistory();
    const {page} = useContext<any | null>(Context);
    const [getFavoriteList, setGetFavoriteList] = useState<any[]>([]);
    const [tyreSearchMod, setTyreSearchMod] = useState<[] | null>(null);
    const [wheelSearchMod, setWheelSearchMod] = useState<[] | null>(null);
    const [oilSearchMod, setOilSearchMod] = useState<[] | null>(null);
    const [batterySearchMod, setBatterySearchMod] = useState<[] | null>(null);
    const [favoriteTyres, setFavoriteTyres] = useState<any[] | null>([]);
    const [favoriteWheels, setFavoriteWheels] = useState<any[] | null>([]);
    const [tabSearchMod, setTabSearchMod] = useState<string>('Шини');
    const [tabSearchModWheel, setTabSearchModWheel] = useState<[]>([]);
    const [tabSearchModOil, setTabSearchModOil] = useState<[]>([]);
    const [tabSearchModBattery, setTabSearchModBattery] = useState<[]>([]);

    useEffect(() => {
        let isMounted = false;
        const getFavoriteCompare = async () => {
            const taskFavorite: any[] = [
                getFavorites,
            ];
          let i:number = 0;
          while(taskFavorite.length > i) {
            if (!isMounted && taskFavorite[i] === getFavorites) {
              let curFavorites: any = await taskFavorite[i]();
              page.setFavoritesCount(curFavorites);

                if(Array.isArray(curFavorites)){
                    curFavorites.forEach(async (element: string) => {      
                    let newTyresFavorite: any = await getTyresById(element);
                    let newWheelsFavorite: any = await getWheelsById(element);
                    if(newTyresFavorite) {
                        setFavoriteTyres(oldFavorite => [...oldFavorite!, newTyresFavorite]);
                    }
                    if(newWheelsFavorite) {
                        setFavoriteWheels(oldFavorite => [...oldFavorite!, newWheelsFavorite])
                    }
                    });
                }
            }
            const task = taskFavorite.shift();
            task();
            await yieldToMain();
          }
        }
        getFavoriteCompare();
        return () => {isMounted = true}
      },[page])

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

    const clearFavoritesGoods = async () => {
        try {
           await clearFavorites(); 
           setFavoriteTyres(null);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="overlayFavoriteActive">
            {    
                favoriteTyres?.length !== 0 || 
                favoriteWheels?.length !== 0 || 
                tabSearchModOil?.length !== 0 || 
                tabSearchModBattery?.length !== 0 ?
                <div className='outputDataFavorite'>
                    <div className='outputDataFavoriteItemsTitle'>
                        <div>Обрані товари:</div>
                    </div>
                    <div className='outputDataFavoriteItemsLines'>
                        {favoriteTyres?.length !== 0 ? 
                        <div className='outputDataFavoriteItems'>
                        <span 
                            title='Шини'
                            className={tabSearchMod === 'Шини' ? 
                            'activatedFavoriteTitle':
                            'titleFavoriteSearch' }
                            onClick={searchTabModChange}
                        >Шини 
                            <span className='countFavoriteSearch'>
                                {favoriteTyres?.length}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {favoriteWheels?.length !== 0 ?
                        <div className='outputDataFavoriteItems'>
                        <span 
                            title='Диски'
                            className={tabSearchMod === 'Диски' ? 
                            'activatedFavoriteTitle' :
                             'titleFavoriteSearch' }
                            onClick={searchTabModChange}
                        >Диски 
                            <span className='countFavoriteSearch'>
                            {favoriteWheels?.length}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModBattery?.length !== 0 ?
                        <div className='outputDataFavoriteItems'>
                        <span 
                            title='Акб'
                            className={tabSearchMod === 'Акб' ?  
                            'activatedFavoriteTitle' : 
                            'titleFavoriteSearch' }
                            onClick={searchTabModChange}
                        >Акб 
                            <span className='countFavoriteSearch'>
                                {20}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModOil?.length !== 0 ?
                        <div className='outputDataFavoriteItems'>
                        <span 
                            title='Масло'
                            className={tabSearchMod === 'Масло' ? 
                            'activatedFavoriteTitle':
                            'titleFavoriteSearch' }
                            onClick={searchTabModChange}
                        >Масло 
                            <span className='countFavoriteSearch'>
                                {20}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        <div className='titleFavoriteClear'
                            onClick={clearFavoritesGoods}
                        >
                            Очистити обрані товари
                        </div>
                    </div>
                    <p/>
                    <div className='outputDataFavoriteItemsBox'>
                        {favoriteTyres && tabSearchMod === 'Шини' ? 
                        favoriteTyres?.map((goods:any) => (                    
                        <div 
                            className='outputDataFavoriteItemsList' 
                            key={goods.id}>
                            <CardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                            />
                        </div>
                        ))
                        : null
                        }
                        {favoriteWheels && tabSearchMod === 'Диски' ? 
                        favoriteWheels?.map((goods: any) => (                    
                        <div className='outputDataFavoriteItemsList'
                            key={goods.id}
                        >
                            <CardList
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
                        <div className='outputDataFavoriteItemsList'
                            key={goods.id}
                        >
                            <CardList
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
                        <div className='outputDataFavoriteItemsList'
                            key={goods.id}
                        >
                            <CardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                            />
                        </div>
                        ))
                        : null
                        } 
                    </div>
                </div>
            : <div className='noFavoritesGoods'>НЕ ДОДАНО ОБРАНИХ ТОВАРІВ.</div>
            }
        </div>
    )
}

export default Favorite;