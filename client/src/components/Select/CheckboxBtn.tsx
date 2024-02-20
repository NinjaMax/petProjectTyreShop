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
                        : 'imgCheckBox'
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
                    loading='lazy'
                    decoding='async'
                    width={30}
                    height={30}
                    sizes='(max-width: 2560px) 30px,
                    (max-width: 1440px) 30px,
                    (max-width: 1024px) 30px,
                    (max-width: 768px) 30px,
                    (max-width: 580px) 30px,
                    (max-width: 425px) 30px,
                    (max-width: 400px) 30px,
                    (max-width: 375px) 30px,
                    (max-width: 320px) 30px'
                    alt='imgCheckbox'/> 
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