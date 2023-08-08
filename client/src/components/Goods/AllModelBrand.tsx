import React from 'react';
import '../../css/Goods/AllModelBrand.css';

type IModelBrand = {
    modelBrandList?: any[] | null
};

const AllModelBrand = ({modelBrandList}: IModelBrand) => {
    return (
        <div className='allModelBrandsBox'>
            <div className='allModelBrands'>
                {modelBrandList?.length !== 0 ?
                    modelBrandList?.map((item: any) =>
                    <div key={item.id_model}>
                        <a className='allModelBrandsAnch' href="/#">{item.model}</a>
                    </div>
                )
                : null
                }
            </div>
        </div>
    );
};

export default AllModelBrand;