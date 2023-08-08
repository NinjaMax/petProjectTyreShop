import React from 'react';
import '../../css/Goods/AllTyreModelSize.css';

type IAllTyreSize = {
    sizeTyresList?: any[] | null;
};

const AllTyreModelSize = ({sizeTyresList}:IAllTyreSize) => {
    return (
        <div className='allTyreModelSizeBox'>
            <div className='allTyreModelSize'>
            {sizeTyresList?.length !== 0 ?
                sizeTyresList?.map((size: any) =>
                <div key={size.id_params}>
                    <a className='allTyreModelSizeAnch' href="/#">{size?.tyres[0]?.full_name} <span>{size.tyres[0]?.price[0]?.price ?? 0}</span></a>   
                </div> 
                )  
            : null
            }
            </div>
        </div>
    );
};

export default AllTyreModelSize;