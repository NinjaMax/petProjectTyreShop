import React from 'react';
import '../../css/Goods/AllModelBrand.css';
import { createStringUrl } from '../../services/stringUrl';

type IModelBrand = {
    brand: string
    modelBrandList?: any[] | null
};

const AllModelBrand = ({brand, modelBrandList}: IModelBrand) => {

    const addItemModel = (e: any) => {
        const toStringUrl = createStringUrl(brand) + '-' + createStringUrl(e.target.textContent);
        localStorage.setItem('goodsId', JSON.stringify(toStringUrl));
        // history.push(
        //     MAIN_ROUTE + `${toStringUrl}`
        // );
    };

    return (
        <div className='allModelBrandsBox'>
            <div className='allModelBrands'>
                {modelBrandList?.length !== 0 ?
                    modelBrandList?.map((item: any) =>
                    <div key={item.id_model}>
                        <a 
                            onClick={addItemModel}
                            className='allModelBrandsAnch' 
                            href={createStringUrl(brand) + '-' + createStringUrl(item.model)}>
                            {item.model}
                        </a>
                    </div>
                )
                : null
                }
            </div>
        </div>
    );
};

export default AllModelBrand;