import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminCashboxContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalCashbox from '../adminModalForm/AdminModalCashbox';
import { ICashboxItem } from './types/CashboxItem.type';
import { CashboxCreate } from '../adminModalForm/types/CashboxCreate.type';
import SpinnerCarRot from '../../spinners/SpinnerCarRot';

interface ICashbox {
    cashboxData?: [] | null;  
}

const AdminCashBoxContent = ({cashboxData}: ICashbox) => {
    //const [activeCustomer, setActiveCustomer] = useState(false);
    const [cashboxGetData, setCashboxGetData] = useState<any | null>(null);
    const [filteredCashbox, setFilteredCashbox] = useState< any[] | null | undefined>(cashboxData);
    const [cashbox, setCashbox] = useState(false);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);
    

    useEffect(() => {
        if(value.length !== 0) {
            const filteredCashBoxData = cashboxData?.filter((cashboxItem: any) => {
                return cashboxItem.id_cashbox.toLowerCase().toString().includes(+value.toLowerCase()) ||
                cashboxItem.cashbox.toLowerCase().includes(value.toLowerCase())  
            })
            setFilteredCashbox(filteredCashBoxData);
        } else {
            setFilteredCashbox(cashboxData);
        }
    },[cashboxData, value])

    const showCashboxData = async (e: any) => {
        let cashboxInfo: any = cashboxData?.find(
            (item:{id_cashbox: number}) => 
                item.id_cashbox === +e.currentTarget.value
            );
        if(cashboxInfo) {
            e.currentTarget.name === 'editCashbox' ? cashboxInfo.disableBtns = true : cashboxInfo.disableBtns = false;
            if (e.currentTarget.name === 'editCashbox') {
                setCashboxGetData(cashboxInfo);
                setCashbox(!cashbox);
            }
        } else{
            setCashboxGetData(null);
        }
    };

    const createCashbox = () => {
        setCashbox(!cashbox);
    };

    const itemClickHandler = (e: any) => {
        const entity = e.target.textContent.split(':')
        setValue(entity[1]);
        //setValue(e.target.value);
        setIsSearch(!isSearch);
    };

    const inputHandler = () => {
        setIsSearch(true);
    };

    const inputCancelHandler = () => {
        if(isSearch){
           setIsSearch(false); 
        }
    };

    return (
        <div onClick={inputCancelHandler}>
        <div className="admCashBoxContent">
            <span>Каси:</span>
            <div className='admUsersHeader'>
                <button className='admCashBoxAddBtn'
                    onClick={createCashbox}>Додати касу
                </button>
            </div>
            <input 
                className='inputAdminCashBox' 
                type="text" 
                id="myInputCashbox" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={inputHandler}
                placeholder="Введіть значення для пошуку..."
            />
            <ul className='inputCashBoxContent'>
                        {value && isSearch ?
                            filteredCashbox?.map(
                                (item: ICashboxItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputCashBoxContentItem'
                                onClick={(e) => itemClickHandler(e)}
                            >
                            {`${item.id_cashbox}:${item.cashbox}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                    </ul>

            <ButtonSearch clickSearchBtn={() => console.log('seaachBTN')}/>
        </div>
        <div className='admCashBoxTable'>
        {filteredCashbox ? 
        <table className='admListCashBoxTable'>
            <thead>
                <tr className='headerCashBoxTable'>
                    <th>Код</th>
                    <th>Каса</th>
                    <th>Організація</th>
                    <th>Баланс</th>
                    <th>Вид Касси</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {filteredCashbox ? filteredCashbox.map(
                (items: ICashboxItem) => (
                    <tr key={'or' + items.id_cashbox}
                        //onClick={e => showComment(e)}
                        //onDoubleClick={e => showOrderData(e)}
                        data-value={items.id_cashbox}>
                        <td>{items.id_cashbox}</td>
                        <td>{items.cashbox}</td>
                        <td>{items.organisation}</td>
                        <td>{items.cashboxType}</td>
                        <td>{items.funds}</td>
                        <td>
                        <button className='editAdmGoods'
                            value={items.id_cashbox}
                            onClick={showCashboxData}
                            name='editCashbox'
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>
                        </td>
                        </tr>
                    ))
                    : null
                    }            
            </tbody>
        </table>
        : <SpinnerCarRot/>
        }
        </div> 
        {cashbox ?
            <ModalAdmin active={cashbox} setActive={setCashbox}>
                <AdminModalCashbox
                    active={cashbox}
                    setActive={setCashbox}
                    dataCashbox={cashboxGetData}
                />
            </ModalAdmin> : null
        }
    </div>
    );
};

export default AdminCashBoxContent;