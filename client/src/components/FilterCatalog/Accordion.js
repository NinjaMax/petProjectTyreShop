import {React, useState} from 'react';
import '../../css/FilterCatatogCss/Accordion.css';
//import ChipOptions from '../MainFilterButton/ChipOptions';
import SelectFilter from '../Select/SelectFilter';

const Accordion = () => {
    const [activeBtn, setActiveBtn] = useState(false);
//<ChipOptions props={'Легкові'}/> 

    return (
        <div>
            <button className={activeBtn? "accordion activeButton": "accordion" } 
                    onClick={() =>setActiveBtn(!activeBtn)}>
                       
                        Тип авто</button>
                { activeBtn?
                <div className="panelAccordion" onClick={e => e.stopPropagation()}>
                    <SelectFilter value={'Legkovi'} children={'Легкові'}/>
                    <SelectFilter value={'Pozashliahovik'} children={'Позашляховик'}/>
                    <SelectFilter value={'Mikroavtobus'} children={'Мікроавтобус'}/>
                    <SelectFilter value={'Gruzovi'} children={'Грузові'}/>
                    <SelectFilter value={'Moto'} children={'Мото'}/>
                    <SelectFilter value={'c/x'} children={'с/х'}/>
                    <SelectFilter value={'Spectehnika'} children={'Спецтехніка'}/>
                </div>
                : null}
        </div>
    );
};

export default Accordion;