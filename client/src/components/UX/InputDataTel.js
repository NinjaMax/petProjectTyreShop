import {React, memo, useRef} from 'react';
import '../../css/UXcss/InputDataTel.css';
import { IMaskInput } from 'react-imask';

 const InputDataTel = memo(({...props}) => {
   
    const ref = useRef(null);
    const inputRef = useRef(null);
    
        
    return (

        <div>

            <IMaskInput className='inputDataTel'
                mask='+{38}(000)000-00-00'
                radix="."
                value="_"
                unmask={false}
                lazy={false}
                ref={ref}
                inputRef={inputRef} 
                //onAccept={acceptInput}
                {...props}
                placeholder='0'
                required
            />
                  
        </div>
    );
}, (prevProps, nextProps) => {
    console.log(prevProps, nextProps)
});

export default InputDataTel;