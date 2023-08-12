import React, { useState } from 'react';
import '../../css/Goods/ModelSection.css';
import TyresCardList from '../cards/TyresCardList';

type IModalSection ={
    modelGoods?:any[] | null,
};

const ModelSection = ({modelGoods}: IModalSection) => {
   
    const [tabSearchMod, setTabSearchMod] = useState<string | null | undefined>(modelGoods![0].diameter);
    const [tabIndexModel, setTabIndexModel] = useState<number>(0);
   
    const searchTabModChange = (e: any) => {
        setTabSearchMod(e.target.title);
        setTabIndexModel(+e.currentTarget.getAttribute('data-index'));
    }

  return (
    <div className="modelSectionActive">
        <div className='modelSectionData'>
            <div className='modelSectionItemsTitle'>
                <div>Варіанти розмірів шин :</div>
            </div>
                <div className='modelSectionItemsLines'>
                    {modelGoods?.length !== 0 ? 
                        modelGoods?.map((diameter: any, index: number) => 
                        <div className='modelSectionItems'
                            key={diameter.id}
                            data-index={index}
                            onClick={searchTabModChange}
                        >
                        <span 
                            title={diameter.diameter}
                            //data-index={index}
                            key={diameter.id}
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
                        {tabSearchMod === modelGoods![tabIndexModel].diameter ? 
                        modelGoods![tabIndexModel].tyres?.map((goods:any) => (                    
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