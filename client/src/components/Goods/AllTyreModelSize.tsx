import React from 'react';
import '../../css/Goods/AllTyreModelSize.css';
import { createStringUrl } from '../../services/stringUrl';

type IAllTyreSize = {
    sizeTyresList?: any[] | null;
};

const AllTyreModelSize = ({sizeTyresList}:IAllTyreSize) => {

    const addGoodsId = (e: any) => {
        localStorage.setItem('goodsId', JSON.stringify(e.target.getAttribute('data-iditem')));
    };

    return (
        <div className='allTyreModelSizeBox'>
            <div className='allTyreModelSize'>
            {sizeTyresList?.length !== 0 ?
                sizeTyresList?.map((size: any) =>
                <div key={size.id_params}>
                    <a  
                        data-iditem={size?.tyres[0]?.id}
                        className='allTyreModelSizeAnch' 
                        onClick={addGoodsId}
                        href={createStringUrl(size?.tyres[0]?.full_name)}
                    >
                        {size?.tyres[0]?.full_name} 
                        <span>{size.tyres[0]?.price[0]?.price ?? 0} &#8372;</span>
                    </a>   
                </div> 
                )  
            : null
            }
            </div>
        </div>
    );
};

export default AllTyreModelSize;