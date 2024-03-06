import React, {useRef} from 'react';
import '../../css/UXcss/InputDataTel.css';
import { IMaskInput } from 'react-imask';
import { useMediaQuery } from 'react-responsive';

interface IinputDataTel {
    current?: any;
    onAccept?: (arg: any, arg1: any) => void;
    refLabel?: {current:{className: string;}};
    dataTel?: any;
}

const InputDataTel = ({onAccept, dataTel}: IinputDataTel) => {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const refLabel = useRef<any>();

    return (
        <div>
            <IMaskInput 
                className='inputDataTel'
                name='telInput'
                mask='+{38}(000)000-00-00'
                radix="."
                value={String(dataTel) ?? "_" }
                unmask={false}
                lazy={false}
                onAccept={onAccept} 
                onChange={onAccept}
                data-placeholder='0'
                data-autocomplete="tel"
                data-type="text"
                definitions={{'_': /[1-10]/}}
                data-guide="true"
                overwrite={true} 
                data-required
            />
            {!isMobile ?
            <label 
                data-ref={refLabel} 
                className={String(dataTel).length !== 0 && String(dataTel).length > 2 ? 'inputDataTelLabelActive' : 'inputDataTelLabel'}>
                    введіть номер телефону 
                    <span className='inputDataTelSpan'> *</span>
            </label> : null
            }  
        </div>
    );
};

export default InputDataTel;