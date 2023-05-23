import React, { useEffect, useReducer, useState } from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminTyreContent.css';
import { TyreContent } from './types/TyreContent.type';
import { ITyreContent } from './interfaces/TyreContent.interface';
import { ActionGoodsType } from './enums/ActionGoods';
import { reducer } from './reducer/sortGoodsReducer';
import { createInitialState } from './reducer/initialStateGoods';

const AdminTyreContent = (
    {props, showRowData, addTyreToOrder, sortTyres}: ITyreContent) => {
    const [state, dispatch] = useReducer(reducer, createInitialState(props))


    const sortGoodsBrand = (e: any) => {
        dispatch({ 
            type: ActionGoodsType.SORT_BY_BRAND,
            sortBrand: e.target.textContent,
        });
    }
    const sortGoodsSeason = (e: any) => {
        dispatch({ 
            type: ActionGoodsType.SORT_BY_SEASON,
            sortSeason: e.target.textContent,
        });
    }
    const sortGoodsYear = (e: any) => {
        dispatch({ 
            type: ActionGoodsType.SORT_BY_YEAR,
            sortYear: e.target.textContent,
        });
    }
    const sortGoodsCountry = (e: any) => {
        dispatch({ 
            type: ActionGoodsType.SORT_BY_COUNTRY,
            sortCountry: e.target.textContent,
        });
    }
    const sortGoodsCategory = (e: any) => {
        dispatch({ 
            type: ActionGoodsType.SORT_BY_CATEGORY,
            sortCategory: e.target.textContent,
        });
    };
    const sortGoodsCode = (e: any) => {
        dispatch({ 
            type: ActionGoodsType.SORT_BY_CODE,
            sortCode: e.target.textContent,
        });
    }
    
    console.log('TyreContentProps', props);
    console.log('TyreContentState', state);

    return (
        <div>
            <div className='admTyreTable'>
                <table className='admListTyreTable'>
                <thead>
                    <tr className='headerTyreTable'>
                        <th onClick={sortGoodsCode}>Код 
                           <i className="fas fa-sort"></i>
                        </th>
                        <th>Назва товару
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortGoodsBrand}>Бренд
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortGoodsSeason}>Сезон
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortGoodsYear}>Рік Виробн.
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortGoodsCountry}>Країна поход.
                            <i className="fas fa-sort"></i>
                        </th>
                        <th onClick={sortGoodsCategory}>Категорія
                            <i className="fas fa-sort"></i>
                        </th>
                        <th>Опції</th> 
                    </tr>
                </thead>    
                <tbody> 
                    {state ? state.map((item: TyreContent) => (
                    <tr key={'t' + item.id} 
                        onClick={showRowData} 
                        data-value={item.id}>
                        <td >{item.id}</td>
                        <td >{item.full_name}</td>
                        <td >{item.tyre_brand?.brand ?? ''}</td>
                        <td >{item.season?.season_ua ?? ''}</td>
                        <td >{item.year?.manufacture_year ?? ''}</td>
                        <td >{item.country?.country_manufacturer_ua ?? ''}</td>
                        <td >{item.category?.category ?? ''}</td>
                        <td  onClick={(e: any)=> e.preventDefault()}>
                            <button className='basketAdmTyre' value={item.id}
                                onClick={addTyreToOrder}>
                                <i className="fa fa-shopping-cart"></i>
                            </button>
                            <button className='editAdmTyre'>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className='closeAdmTyre'>
                                <i className="fa fa-remove"></i>
                            </button>                  
                        </td>
                    </tr> 
                    ))
                    : <tr><td>"Нема товарів"</td></tr>
                    }         
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default AdminTyreContent;