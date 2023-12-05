import React, { useEffect, useState } from 'react';
import '../../css/Goods/ModelSection.css';
import TyresCardList from '../cards/CardList';

type IModalSection ={
    modelGoods?:any[] | null,
    modelName?:string,
    checkOrders?(arg0: any, ...arg:any[]): Promise<void | undefined>;
};

const ModelSection = ({modelGoods, modelName, checkOrders}: IModalSection) => {
   
    const [tabSearchMod, setTabSearchMod] = useState<string| null | undefined>();
    const [tabIndexModel, setTabIndexModel] = useState<string>('0');
   
    useEffect(() => {
        if (modelGoods) {
            //console.log('MODEL_GOODS: ', modelGoods![+tabIndexModel]?.diameter)
            setTabSearchMod(modelGoods![+tabIndexModel].diameter);
        }
    },[modelGoods, tabIndexModel]);

    const searchTabModChange = (e: any) => {
        setTabSearchMod(e.target.title);
        setTabIndexModel(e.currentTarget.getAttribute('data-index'));
    };

    //console.log('MODEL_GOODS: ', modelGoods);

  return (
    <div className="modelSectionActive">
        <div className='modelSectionData'>
            <div className='modelSectionItemsTitle'>
                <div>Варіанти розмірів шин {modelName}:</div>
            </div>
                <div className='modelSectionItemsLines'>
                    {modelGoods?.length !== 0 ? 
                        modelGoods?.sort((a: any, b: any) => a.diameter - b.diameter).map((diameter: any, index: number) => 
                        <div className='modelSectionItems'
                            key={diameter.id_diameter}
                            data-index={index}
                            onClick={searchTabModChange}
                        >
                        <span 
                            title={'R' + diameter.diameter}
                            data-index={index}
                            key={diameter.id_diameter}
                            className={tabSearchMod === diameter.diameter ? 
                            'activatedModelSectionTitle':
                            'titleModelSectionChoose' }
                            
                        >R {diameter.diameter} 
                            <span className='countModelSectionDiam'
                                key={diameter.id}
                            >
                                {diameter?.tyres?.length ?? diameter?.wheels?.length}
                            </span>
                        </span>
                        </div>
                        )
                    : null
                    }
                    <p/>
                    </div>
                    <p/>
                    <div className='modelSectionItemsBox'>
                        {tabSearchMod ? 
                        modelGoods![+tabIndexModel].tyres?.map((goods:any) => (                    
                        <div 
                            className='modelSectionItemsList' 
                            key={goods.id}>
                            <TyresCardList
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
                            />
                        </div>
                        ))
                        : null
                        }
                        {tabSearchMod ? 
                        modelGoods![+tabIndexModel].wheels?.map((goods:any) => (                    
                        <div 
                            className='modelSectionItemsList' 
                            key={goods.id}>
                            <TyresCardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
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