import React from 'react';
import '../../css/FilterCatatogCss/Accordion.css';
import ChipOptions from '../mainFilterButton/ChipOptions';

interface IAccordion {
    titleName: string;
    children: JSX.Element | JSX.Element [];
    deleteChip?(arg0: any): void;
    chipItem?: string | string[] | null;
    filterState?: boolean;
    filterAction?(arg0: any): void;
}

const Accordion = ({
    children,
    titleName,
    chipItem,
    filterAction,
    filterState,
    deleteChip
    }: IAccordion) => {

    return (
        <div>
            <button className={filterState ? "accordion activeButton" : "accordion" } 
                onClick={filterAction}
                >       
                {titleName}
                { chipItem ?
                <ChipOptions 
                    chipName={titleName}
                    clearFilter={deleteChip}
                    props={chipItem} 
                /> 
                : null 
                }
            </button>
                { filterState ?
                <div className={"panelAccordion"}  onClick={e => e.stopPropagation()}>
                    {children}
                </div>
                : null}
        </div>
    );
};

export default Accordion;