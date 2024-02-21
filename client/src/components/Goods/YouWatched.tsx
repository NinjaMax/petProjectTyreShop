import React, { useEffect, useState } from 'react';
import '../../css/Goods/YouWatched.css';
import TyresCard from '../cards/Card';
import { getTyresByIdParam, getWheelsByIdParam } from '../../restAPI/restGoodsApi';
import { useTranslation } from 'react-i18next';

type WatchedType = {
    checkOrders?(arg0: any, ...arg:any[]): Promise<void | undefined>;
}

const YouWatched = ({checkOrders}:WatchedType) => {
    const [watchedList, setWatchedList] = useState<any[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        let isMounted = false;
        const getGoodsId: string = 
        JSON.parse(localStorage.getItem('you_watched')!);
        const getWatchedGoods = async () => {
            if (!isMounted &&  getGoodsId) {
                const watchedGoodsArray = getGoodsId.split(',');
                watchedGoodsArray.forEach(async(goodId):Promise<any>  => {
                    let getTyreItem =  await getTyresByIdParam(goodId);
                    let getWheelItem = await getWheelsByIdParam(goodId);
                    if (getTyreItem) {
                        getTyreItem.typeCard = 'tyre';
                      setWatchedList(oldGoods => [...oldGoods!, getTyreItem]);  
                    }
                    if (getWheelItem) {
                        getWheelItem.typeCard = 'wheel';
                        setWatchedList(oldGoods => [...oldGoods!, getWheelItem]);
                    }
                });
            }
        };
        getWatchedGoods();
        return () => {
            isMounted = true;
          };
    },[]);

    return (
        <div>
            <h3>{t('youWatched.watched')}</h3>
            <div className='youWatchedBox'>
            {watchedList ? 
            watchedList.map((item) => 
            <div className='youWatchedItem' key={item.id}>    
                <TyresCard 
                    goods={item} 
                    optionsBox={undefined} 
                    checkOrders={checkOrders} 
                    typeCard={item.typeCard}
                />
            </div> 
            )
            : null
            }
            </div>
        </div>
    );
};

export default YouWatched;