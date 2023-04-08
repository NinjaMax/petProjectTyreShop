import React, {useRef} from 'react';
import '../../css/UXcss/InputDataTel.css';
import { IMaskInput } from 'react-imask';

interface IinputDataTel {
    current?: any;
    onAccept?: (arg: any, arg1: any) => void;
    refLabel?: {current:{className: string;}};
    
    // mask: {
    //     masked: any; arg: any
    //     };
}

//type IOnAccept =  {refLabel?: {current:{className: string;}};}

const InputDataTel = ({onAccept}: IinputDataTel) => {

    const refLabel: IinputDataTel = useRef();

    const inputEvent: any = (e: any) => {
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
            <IMaskInput data-classname='inputDataTel'
                mask='+{38}(000)000-00-00'
                radix="."
                value="_"
                unmask={false}
                lazy={false} 
                onAccept={onAccept}
                data-oninput={inputEvent.toString()}
                data-placeholder='0'
                data-autocomplete="tel"
                data-type="text"
                definitions={{'_': /[1-10]/}}
                data-guide="true"
                overwrite={true} 
                data-required
            />
            <label data-ref={refLabel} className='inputDataTelLabel'>
                    введіть номер телефону 
                    <span className='inputDataTelSpan'> *</span>
            </label>   
        </div>
    );
};

export default InputDataTel;