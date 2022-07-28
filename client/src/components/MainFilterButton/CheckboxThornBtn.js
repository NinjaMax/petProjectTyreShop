import React from 'react';
import '../../css/FilterMain/CheckboxThornBtn.css';
import imageThorn from '../../assets/icons/imagesThorn_1.png';

const CheckboxThornBtn = () => {
    return (
        <div>
            <label className="container">
                <img className='imgThorn' 
                src={imageThorn}
                alt='imgThorn'/> Шип
                <input type="checkbox" checked="checked"/>
                <span className="checkmark"></span>
            </label>
        </div>
    );
};

export default CheckboxThornBtn;