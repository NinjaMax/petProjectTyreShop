import {React, useRef} from 'react';
import '../../css/UXcss/InputDataTel.css';
import { IMaskInput } from 'react-imask';

const InputDataTel = () => {
    //const [valueInput, setValueInput] = useState();
    const ref = useRef(null);
    const inputRef = useRef(null);

    //useEffect (() =>{
    //    setValueInput(acceptInput())
    //    },[])
    //
    const acceptInput = (value) => {
        //setValueInput(value)
        console.log(value);
        return value;
    };

    console.log(acceptInput);
    //console.log(valueInput);
     

    
        //console.log(inputTel);
        //console.log(valueInput);
        
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
                onAccept={acceptInput}
                placeholder='0'
                required
            />
            
           <label className={acceptInput.length > 1 ? 'inputDataTelLabelActive' :'inputDataTelLabel'}>
                введіть номер телефону
                <span className='inputDataTelSpan'> *</span>
            </label>
           
               
        </div>
    );
};

export default InputDataTel;