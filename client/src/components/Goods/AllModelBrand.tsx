import React from 'react';
import '../../css/Goods/AllModelBrand.css';
import { createStringUrl } from '../../services/stringUrl';

type IModelBrand = {
    brand: string;
    modelBrandList?: any[] | null;
};

type ItemModel = {
    id_description: boolean;
    id_model: number;
    model: string;
    wheels?: any[];
    tyres?: {id: string,}[
    ];
};

const AllModelBrand = ({brand, modelBrandList}: IModelBrand) => {

    const addItemModel = (e: any) => {
        localStorage.setItem('goodsId', JSON.stringify(e.target.getAttribute('data-iditem')));
    };

    return (
        <div className='allModelBrandsBox'>
            <div className='allModelBrands'>
                {modelBrandList?.length !== 0 ?
                    modelBrandList?.map((item: ItemModel) =>
                    <div key={item?.id_model}>
                        {item.tyres ?
                        <a 
                            data-iditem={item?.tyres[0].id}
                            onClick={addItemModel}
                            className='allModelBrandsAnch' 
                            href={createStringUrl(brand) + '-' + createStringUrl(item?.model)}>
                            {item?.model}
                        </a>
                        : null
                        }
                        {item.wheels  ?
                        <a 
                            data-iditem={item.wheels[0].id}
                            onClick={addItemModel}
                            className='allModelBrandsAnch' 
                            href={createStringUrl(brand) + '-' + createStringUrl(item?.model)}>
                            {item?.model}
                        </a>
                        : null
                        }
                    </div>
                )
                : null
                }
            </div>
        </div>
    );
};

export default AllModelBrand;