import React from 'react';
import '../../../css/AdminComponentCss/AdminFormCss/AdminModalGoods.css';

const AdminModalGoods = () => {
    return (
        <div>
        <input type="text" className="admInpModalGoods" 
            onKeyUp={() =>console.log('search Goods')} 
            placeholder="Search for names.."/>
        <table className="admModalGoodsTable">
            <thead>
                <tr className="admModalHeaderGoods">
                    <th>id</th>
                    <th>Назва</th>
                    <th>Категорія</th>
                    <td>Ціна</td>
                    <td>Залишки</td>
                </tr>   
            </thead>
            <tbody>
                <tr>
                    <td>264302</td>
                    <td>BFGoodrich Activan 185/75 R16C 104/102R</td>
                    <td>Шини</td>
                    <td>2055</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>264302</td>
                    <td>BFGoodrich Activan 185/75 R16C 104/102R</td>
                    <td>Шини</td>
                    <td>2055</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>264302</td>
                    <td>BFGoodrich Activan 185/75 R16C 104/102R</td>
                    <td>Шини</td>
                    <td>2055</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>264302</td>
                    <td>BFGoodrich Activan 185/75 R16C 104/102R</td>
                    <td>Шини</td>
                    <td>2055</td>
                    <td>4</td>
                </tr>
            </tbody>     
        </table>
    </div>
    );
};

export default AdminModalGoods;