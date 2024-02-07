import React, { useEffect, useState } from 'react';
import '../../css/CardsCss/FlagIcon.css';
import { chooseFlag } from '../../services/flagCardService';

type Iflag = {
    country?: string | undefined;
    year?: {
        manufacture_year: string;
    };
    title: string;
}

const FlagsIcon = ({country, year, title}:Iflag) => {
    const [showFlag, setShowFlag] = useState<string | undefined>();
    
    useEffect(() => {
        let isSetFlag = false;
        const setFlag = async () => {
            const flag = 
            chooseFlag(country);
            if (!isSetFlag && flag) {
                setShowFlag(flag);
            }   
        }
        setFlag();
        return () => {
            isSetFlag = true;
        }
    },[country])

    return (
        <div className='flagIconBox'>
            <div className='flagIcon'>
                {showFlag ?
                <img 
                    className='imgFlag' 
                    src={showFlag}
                    alt="flags"
                    loading='lazy'
                />     
                :
                <img 
                    className='noImgFlag' 
                    src='/iconFlags/empty_flag_48.webp'
                    alt="flags"
                    loading='lazy'
                />   
                }
                { showFlag ?
                <span className="tooltipTextFlagIcons">
                    {title} {country}
                </span>
                : null
                }
            </div> 
            {country} {year?.manufacture_year}
        </div>
        
    );
};

export default FlagsIcon;