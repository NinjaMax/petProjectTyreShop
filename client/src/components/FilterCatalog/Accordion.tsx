import React, {useState} from 'react';
import '../../css/FilterCatatogCss/Accordion.css';
//import ChipOptions from '../MainFilterButton/ChipOptions';

interface IAccordion {
    titleName: string;
    children: JSX.Element | JSX.Element [];
}


const Accordion = ({children, titleName}: IAccordion) => {
    const [activeBtn, setActiveBtn] = useState(false);
//<ChipOptions props={'Легкові'}/> 

    return (
        <div>
            <button className={activeBtn? "accordion activeButton": "accordion" } 
                    onClick={() =>setActiveBtn(!activeBtn)}>
                       
                        {titleName}</button>
                { activeBtn?
                <div className="panelAccordion" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
                : null}
        </div>
    );
};

export default Accordion;