import React, { useEffect, useState } from 'react';
import '../../css/Goods/ModelSection.css';
import TyresCardList from '../cards/TyresCardList';

type IModalSection ={
    modelGoods?:any[] | null,
    modelName?:string
};

const ModelSection = ({modelGoods, modelName}: IModalSection) => {
   
    const [tabSearchMod, setTabSearchMod] = useState<string| null | undefined>();
    const [tabIndexModel, setTabIndexModel] = useState<string>('0');
   
    useEffect(() => {
        if (modelGoods) {
            //console.log('MODEL_GOODS: ', modelGoods![+tabIndexModel].diameter)
            setTabSearchMod(modelGoods![+tabIndexModel].diameter);
        }
    },[modelGoods, tabIndexModel]);

    const searchTabModChange = (e: any) => {
        setTabSearchMod(e.target.title);
        setTabIndexModel(e.currentTarget.getAttribute('data-index'));
    }

    //console.log('MODEL_GOODS: ', modelGoods);

  return (
    <div className="modelSectionActive">
        <div className='modelSectionData'>
            <div className='modelSectionItemsTitle'>
                <div>Варіанти розмірів шин {modelName}:</div>
            </div>
                <div className='modelSectionItemsLines'>
                    {modelGoods?.length !== 0 ? 
                        modelGoods?.map((diameter: any, index: number) => 
                        <div className='modelSectionItems'
                            key={diameter.id_diameter}
                            data-index={index}
                            onClick={searchTabModChange}
                        >
                        <span 
                            title={diameter.diameter}
                            //data-index={index}
                            key={diameter.id_diameter}
                            className={tabSearchMod === diameter.diameter ? 
                            'activatedModelSectionTitle':
                            'titleModelSectionChoose' }
                            
                        >{diameter.diameter} 
                            <span className='countModelSectionDiam'
                                key={diameter.id}
                            >
                                {diameter?.tyres?.length}
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
                        {tabSearchMod ? 
                        modelGoods![+tabIndexModel].tyres?.map((goods:any) => (                    
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
                    </div>
                </div>
        </div>
    )
}

export default ModelSection