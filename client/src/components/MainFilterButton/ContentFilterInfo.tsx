import React from 'react';
import '../../css/FilterMain/ContentFilterInfo.css';
import imgMarkerA from '../../assets/icons/infoTyreMarking/tyreMarkerA.png';
import imgMarkerB from '../../assets/icons/infoTyreMarking/tyreMarkerB.png';
import imgMarkerC from '../../assets/icons/infoTyreMarking/tyreMarkerC.png';
import imgMarketD from '../../assets/icons/infoTyreMarking/tyreMarkerD.png';
import imgMarketE from '../../assets/icons/infoTyreMarking/tyreMarkerE.png';

interface IContentInfo {
    infoMarking: string | boolean;
    width: number;
    setActive?(arg0: any):void;
}

const ContentFilterInfo = ({infoMarking, width, setActive}: IContentInfo) => {
    return (
        <div className='dropdownContentInfo' 
            style={{"--widthBtn":width} as React.CSSProperties}>
             <span 
                className="closeContentInfoBtn" 
                onClick={() => {setActive!(false)}}>&times;
            </span>    
            <h5>Як дізнатися розмір шини?</h5>
            <h5>Маркування на боковині.</h5>
            {infoMarking === 'A' ?
            <div>
                
                <img src={imgMarkerA} alt='infoFilterImg'/>
                <div className='textMarker'>
                <span>А. ШИРИНА ШИНИ</span>
                <span>Ширина шини в міліметрах, виміряна від одніеї боковини до іншої.</span>   
                </div>
             </div>
            :null}
            {infoMarking === "B" ?
            <div>
                <img src={imgMarkerB} alt='infoFilterImg'/>
                <div className='textMarker'>
                <span>В. СПІВВІДНОШЕННЯ СТОРІН</span>
                <span>
                    Це співвідношення висоти шини до її ширини, виражене у відсотках.
                    Наприклад, якщо значення співвідношення сторін 55, це означає, 
                    що висота шини складає 55% від її ширини.
                </span>
                </div>
            </div>
            :null}

            {infoMarking === "C" ?
            <div>
                <img src={imgMarkerC} alt='infoFilterImg'/>
                <div className='textMarker'>
                <span>С. ДІАМЕТР ДИСКА</span>
                <span>Діаметр (висота) диска в дюймах</span>    
                </div>
            </div>
            :null}
            {infoMarking === "D" ?
            <div>
                <img src={imgMarketD} alt='infoFilterImg'/>
                <div className='textMarker'>
                <span>D. ІНДЕКС НАВАНТАЖЕННЯ</span>
                <span>Індекс навантаження - це максимальна вага (в кг), 
                    при якій зберігається розмір і геометрія плями контакту, 
                    а шина зберігає всі свої характеристики.
                </span> 
            </div>   
            </div>
            :null}
            {infoMarking === "E" ?
            <div>
                <img src={imgMarketE} alt='infoFilterImg'/>
                <div className='textMarker'>
                <span>E.Індекс ШВИДКОСТІ</span>
                <span>Індекс швидкості - це максимальна швидкість (в км/год),
                    яку шина здатна витримати при правильному тиску 
                    і відповідному навантаженні. 
                    Купуючі нові шини, необхідно переконатися, 
                    що їхній клас щвидкості відповідає швидкісним
                    можливостям вашого автомобіля.
                </span>    
                </div>
            </div>
            :null}
        </div>
    );
};

export default ContentFilterInfo;