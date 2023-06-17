import React, {useState} from 'react';
import '../../../css/FilterMain/FilterMainTyres/FilterMainTyre.css';
import imageThorn from '../../../assets/icons/imagesThorn_1.png';
import FilterMainBtn from '../FilterMainBtn';
import ButtonAction from '../../buttons/ButtonAction';
import CheckboxBtn from '../../select/CheckboxBtn';
import SelectFilterList from '../../select/SelectFilterList';
import SelectFilter from '../../select/SelectFilter';

const FilterMainTyre = () => {
    const [handleItem, setHandleItem] = useState();

    const handleChange = (e: any) => {
        
        setHandleItem(e.currentTarget.value);
    } 

    const filterClose = (e: any) => {
        console.log('filter_close')
    }
   
    return (
        <div className='filterMain'>
            <FilterMainBtn 
                width={130} 
                titleFilter={'Ширина'}>
                <SelectFilterList value={"155"} items={"155"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"175"} items={"175"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"185"} items={"185"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"195"} items={"195"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"205"} items={"205"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"215"}items={"215"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"225"} items={"225"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"235"} items={"235"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"245"} items={"245"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"255"} items={"255"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"265"} items={"265"} checked={handleItem} onChange={handleChange}/>
            </FilterMainBtn>
            <FilterMainBtn 
                width={130} 
                titleFilter={'Профіль'}>
                <SelectFilterList value={"40"} items={"40"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"45"} items={"45"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"50"} items={"50"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"55"} items={"55"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"60"} items={"60"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"65"}items={"65"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"70"} items={"70"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"80"} items={"80"} checked={handleItem} onChange={handleChange}/>
            </FilterMainBtn>
            <FilterMainBtn 
                width={130} 
                titleFilter={'Діаметр'}>
                <SelectFilterList value={"R13"} items={"R13"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"R14"} items={"R14"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"R15"} items={"R15"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"R16"} items={"R16"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"R17"} items={"R17"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"R18"} items={"R18"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"R19"} items={"R19"} checked={handleItem} onChange={handleChange}/>
                <SelectFilterList value={"R20"} items={"R20"} checked={handleItem} onChange={handleChange}/>
            </FilterMainBtn> 
            <FilterMainBtn 
                width={130} 
                titleFilter={'Сезон'}>
                <SelectFilter value={'Zimnie'} children={'Зимові'}/>
                <SelectFilter value={'Litni'} children={'Літні'}/>
                <SelectFilter value={'Vsesezonni'} children={'Всесезонні'}/>
            </FilterMainBtn>
            <FilterMainBtn 
                width={130} 
                titleFilter={'Бренд'}>
                <CheckboxBtn 
                    value={"Continental"} 
                    checked={''} 
                    onChange={handleChange} 
                    titleCheckbox={"Continental"}/>
                <CheckboxBtn 
                    value={"Michelin"}
                    checked={''} 
                    onChange={handleChange}
                    titleCheckbox={"Michelin"}/>
                <CheckboxBtn 
                    value={"Yokohama"} 
                    checked={''} 
                    onChange={handleChange}
                    titleCheckbox={"Yokohama"}/>
                <CheckboxBtn 
                    value={"Bridgestone"}
                    checked={''} 
                    onChange={handleChange} 
                    titleCheckbox={"Bridgestone"}/>
                <CheckboxBtn 
                    value={"Hankook"} 
                    checked={''} 
                    onChange={handleChange}
                    titleCheckbox={"Hankook"}/>
                <CheckboxBtn 
                    value={"Nokian"} 
                    checked={''} 
                    onChange={handleChange}
                    titleCheckbox={"Nokian"}/>
                <CheckboxBtn 
                    value={"Goody-Yaer"}
                    onChange={handleChange}
                    titleCheckbox={"Goody-Yaer"}/>
                <CheckboxBtn 
                    value={"BfGoodrich"} 
                    onChange={handleChange}
                    titleCheckbox={"BfGoodrich"}/>
                <CheckboxBtn 
                    value={"Dunlop"} 
                    onChange={handleChange}
                    titleCheckbox={"Dunlop"}/>
            </FilterMainBtn>
            <div className='btnSelect'>
                <ButtonAction props={'ПІДІБРАТИ'} />
            </div>
            <CheckboxBtn 
                value={"ship"} 
                onChange={handleChange}
                titleCheckbox={"Шип"} 
                imageSrc={imageThorn}/>
        </div>
    );
};

export default FilterMainTyre;