import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminGoodsContent.css';

const AdminGoodsContent = () => {
    return (
        <div>
            <div id="myDIV" className="headerGoods">
                <h2>My To Do List</h2>
                <input className='inputAdminGoods' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
                <span onclick="newElement()" className="btnSearch">Пошук</span>
            </div>
            <ul id="myUL">
                <li>Hit the gym</li>
                <li className="checked">Pay bills</li>
                <li>Meet George</li>
                <li>Buy eggs</li>
                <li>Read a book</li>
                <li>Organize office</li>    
            </ul>
            <table>
                <tr>
                    <td>Код</td> <td>Назва товару</td> <td>Категорія</td> <span className='closeAdmGoods'>&#x2716</span>
                </tr>
                <tr>
                    <td>264302</td> <td>BFGoodrich Activan 185/75 R16C 104/102R</td> <td>Шини</td> <span className='closeAdmGoods'>&#x2716</span>
                </tr>
                <tr>
                    <td>264299</td> <td>BFGoodrich Activan 195/65 R16C 104/102R</td> <td>Шини</td> <span className='closeAdmGoods'>&#x2716</span>
                </tr>
                <tr>
                    <td>263127</td> <td>BFGoodrich Activan 205/70 R15C 106/104R</td> <td>Шини</td> <span>&#x2716</span>
                </tr>
            </table>
            
        </div>
    );
};

export default AdminGoodsContent;