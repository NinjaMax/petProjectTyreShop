import React, {useRef} from 'react';
import '../../css/UXcss/InputDataTel.css';
import { IMaskInput } from 'react-imask';

 const InputDataTel = ({onAccept}) => {

    const refLabel = useRef();

    const inputEvent = (e) => {
        if(e.currentTarget.value.length > 4 && e.currentTarget.value.length <= 10 ) {
            refLabel.current.className = 'inputDataTelLabelActive';
        } else {
            refLabel.current.className = 'inputDataTelLabel';
        }


      console.log(e.currentTarget.value.length);
      console.log(refLabel);
    }
       
    return (

        <div>
            <IMaskInput className='inputDataTel'
                mask='+{38}(000)000-00-00'
                radix="."
                value="_"
                unmask={false}
                lazy={false} 
                onAccept={onAccept}
                onInput={inputEvent}
                placeholder='0'
                autoComplete="tel"
                type="text"
                definitions={{'_': /[1-10]/}}
                guide="true"
                overwrite={true} 
                required
            />
            <label ref={refLabel} className='inputDataTelLabel'>
                    введіть номер телефону 
                    <span className='inputDataTelSpan'> *</span>
            </label>   
        </div>
    );
};

export default InputDataTel;