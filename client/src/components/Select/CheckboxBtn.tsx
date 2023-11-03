import React from 'react';
import '../../css/SelectCss/CheckboxBtn.css';

interface ICheckBoxBtn {
    value: string;
    titleCheckbox: string;
    imageSrc?: string;
    onChange: (e: any) => void; 
    checked?: any;
    titleName?: string;
}

const CheckboxBtn = ({
    value, 
    titleCheckbox, 
    checked, 
    imageSrc,
    titleName,
    onChange
    }: ICheckBoxBtn) => {

    return (
        <div>
            <label className="containerCheckbox">
                {imageSrc ? 
                    <img className={
                        titleName === 'Виліт ET' ? 'imgWheelEt': 
                        titleName === 'Діаметр ступиці DIA' ? 'imgWheelDia':
                        titleName === 'Міжболтова відстань' ? 'imgWheelPCD'
                        : 'imgThorn'
                    }
                    title={
                        titleName === 'Виліт ET' ?
                        "ET - виліт диска (Чим менше виліт, тим більше диск виступатиме зовні автомобіля. І навпаки, чим більше значення вильоту, тим глибше буде втоплений диск усередину автомобіля.)" :
                        titleName === 'Діаметр ступиці DIA' ?
                        "DIA – діаметр центрального отвору диска (вимірюється в міліметрах). Він повинен відповідати діаметру центруючого виступу на маточині автомобіля. DIA може бути більшою за величину. У цьому випадку для встановлення колеса використовуються перехідні кільця центрування." :
                        titleName === 'Міжболтова відстань' ?
                        "Міжболтова відстань – позначають значення PCD колеса (Pitch Circle Diameter). Міліметри — діаметр, по якому розташовані отвори кріплень." :
                        ""
                    } 
                    src={imageSrc}
                    alt='imgThorn'/> 
                    : null
                } 
                    {titleCheckbox}
                <input className='inputCheckboxBtn'
                    type="checkbox" 
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    name={titleName}/>
                <span className="checkmark"></span>
            </label>
        </div>
    );
};

export default CheckboxBtn;