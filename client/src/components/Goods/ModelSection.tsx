import React, { useState } from 'react';
import '../../css/Goods/ModelSection.css';
import TyresCardList from '../cards/TyresCardList';

type IModalSection ={
    modelGoods?:any[] | null,
};


const ModelSection = ({modelGoods}: IModalSection) => {
    //const {page} = useContext<any | null>(Context);
    const [getFavoriteList, setGetFavoriteList] = useState<any[]>([]);
    const [tyreSearchMod, setTyreSearchMod] = useState<[] | null>(null);
    const [wheelSearchMod, setWheelSearchMod] = useState<[] | null>(null);
    const [oilSearchMod, setOilSearchMod] = useState<[] | null>(null);
    const [batterySearchMod, setBatterySearchMod] = useState<[] | null>(null);
    const [sectionDiameter, setSectionDiameter] = useState<any[] | null>([]);
    const [tabSearchMod, setTabSearchMod] = useState<string>('Шини');
    const [tabSearchModWheel, setTabSearchModWheel] = useState<[]>([]);
    const [tabSearchModOil, setTabSearchModOil] = useState<[]>([]);
    const [tabSearchModBattery, setTabSearchModBattery] = useState<[]>([]);

    // useEffect(() => {
    //     let isMounted = false;
    //     const getFavoriteCompare = async () => {
    //         const taskFavorite: any[] = [
    //             getFavorites,
    //         ];
    //       let i:number = 0;
    //       while(taskFavorite.length > i) {
    //         if (!isMounted && taskFavorite[i] === getFavorites) {
    //           let curFavorites: any = await taskFavorite[i]();
    //           page.setFavoritesCount(curFavorites);

    //             if(Array.isArray(curFavorites)){
    //                 curFavorites.forEach(async (element: string) => {      
    //                 let newTyresFavorite: any = await getTyresById(element);
                   
    //                 setFavoriteTyres(oldFavorite => [...oldFavorite!, newTyresFavorite]);
                    
    //                 });
    //             }
    //         }
    //         const task = taskFavorite.shift();
    //         task();
    //         await yieldToMain();
    //       }
    //     }
    //     getFavoriteCompare();
    //     return () => {isMounted = true}
    //   },[page])

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

    // const clearFavoritesGoods = async () => {
    //     try {
    //        await clearFavorites(); 
    //        setFavoriteTyres(null);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    console.log('MODELSECTION_GOODS: ', modelGoods);

  return (
    <div className="modelSectionActive">

                <div className='modelSectionData'>
                    <div className='modelSectionItemsTitle'>
                        <div>Обрані товари:</div>
                    </div>
                    <div className='modelSectionItemsLines'>
                        {sectionDiameter?.length !== 0 ? 
                        sectionDiameter?.map((diameter: any) => 
                        <div className='modelSectionItems'>
                        <span 
                            title='Шини'
                            className={tabSearchMod === diameter ? 
                            'activatedModelSectionTitle':
                            'titleModelSectionChoose' }
                            onClick={searchTabModChange}
                        >{diameter} 
                            <span className='countModelSectionDiam'>
                                {sectionDiameter?.length}
                            </span>
                        </span>
                        </div>
                        )
                        : null
                        }
                        <div className='titleModelSectionSelect'
                            onClick={() => console.log('Clear')}
                        >
                            Очистити обрані товари
                        </div>
                    </div>
                    <p/>
                    <div className='modelSectionItemsBox'>
                        {sectionDiameter && tabSearchMod === 'Шини' ? 
                        sectionDiameter?.map((goods:any) => (                    
                        <div 
                            className='modelSectionItemsList' 
                            key={goods.id}>
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
                        <div className='modelSectionItemsList'
                            key={goods.id}
                        >
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
                        <div className='modelSectionItemsList'
                            key={goods.id}
                        >
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
                        <div className='modelSectionItemsList'
                            key={goods.id}
                        >
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
                </div>
        </div>
  )
}

export default ModelSection