import {React, useRef} from 'react';
import '../../css/UXcss/InputDataTel.css';
import { IMaskInput } from 'react-imask';

const InputDataTel = () => {
    const ref = useRef(null);
    const inputRef = useRef(null);

    return (

        <div>
            <IMaskInput className='inputDataTel'
                mask='+{38}(000)000-00-00'
                radix="."
                value="___"
                unmask={false}
                lazy={false}
                ref={ref}
                inputRef={inputRef} 
                onAccept={
                  (value) => console.log(value)
                }
                placeholder='0'
                required
            />
            <label className='inputDataTelLabel'>
                введіть номер телефону
                <span className='inputDataTelSpan'> *</span>
            </label>
               
        </div>
    );
};

export default InputDataTel;