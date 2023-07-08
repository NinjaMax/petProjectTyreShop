import React, {useContext, useEffect, useState } from 'react';
import '../../css/UXcss/Rating.css';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import { IRating } from '../reviews/interfaces/Rating.interface';

const Rating = observer((
    {numScore, nameRating, forType, disabled}:IRating) => {
    const {goodsTyre} = useContext<any | null>(Context);
    const [chooseStar, setChooseStar] = useState<number | undefined>(numScore);

    useEffect(() => {
        if(numScore) {
            setChooseStar(numScore);
        }
    },[numScore])

    const inputRating = (e: any) => {
        if(e.target.title.length !== 0 && !disabled) {
            if(e.target.title in goodsTyre.ratingList) {
                goodsTyre.setNewRating(e.target.title, e.target.value);
            } 
        }
    };

    return (
        <div className='ratingStar'>
            <div className='ratingNumber'> 
                {chooseStar}
            </div>
            <input 
                id={nameRating ?? 0 +'5'}
                type="radio"  
                name="rating"
                value="5"
                title={nameRating}
                onChange={inputRating} 
                />
            <label 
                className={
                    5 <= chooseStar! ? 
                    "fa fa-star checked": 
                    5 > chooseStar! && 4 < chooseStar! ? "fas fa-star-half-alt checked" :
                    5 < chooseStar! ? 
                    "fa fa-star checked" :
                    "fa fa-star"}
                htmlFor={nameRating ?? 0 +'5'} 
                title="Оцінка «5»"
            ></label>

            <input 
                id={nameRating ?? 0 + '4'}
                type="radio" 
                name="rating" 
                value="4"
                title={nameRating}
                onChange={inputRating}
            />
            <label 
                className={
                4 <= chooseStar! ? 
                "fa fa-star checked" :
                4 > chooseStar! && 3 < chooseStar! ? "fas fa-star-half-alt checked" :
                4 < chooseStar! ? 
                "fa fa-star checked" :
                "fa fa-star"}
                htmlFor={nameRating ?? 0 + '4'} 
                title="Оцінка «4»"
            ></label>

            <input 
                id={nameRating ?? 0 + '3'}
                type="radio" 
                title={nameRating}
                name="rating" 
                value="3"
                onChange={inputRating}
            />
            <label 
                className={
                    3 === chooseStar! ? 
                    "fa fa-star checked" :
                    3 > chooseStar! && 2 < chooseStar! ? "fa fa-star-half-alt checked" :
                    3 < chooseStar! ? 
                    "fa fa-star checked" :
                    "fa fa-star"
                }
                htmlFor={nameRating ?? 0 + '3'} 
                title="Оцінка «3»"
            ></label>

            <input 
                id={nameRating ?? 0 + '2'}
                type="radio" 
                title={nameRating} 
                name="rating" 
                value="2"
                onChange={inputRating}
            />
            <label 
                className={
                2 === chooseStar! ? 
                "fa fa-star checked" :
                2 > chooseStar! && 1 < chooseStar! ? "fas fa-star-half-alt checked" :
                2 < chooseStar! ? 
                "fa fa-star checked" :
                "fa fa-star"
            }
                htmlFor={nameRating ?? 0 + '2'} 
                title="Оцінка «2»"
            ></label>

            <input 
                id={nameRating ?? 0 + '1'}
                type="radio" 
                title={nameRating} 
                name="rating" 
                value="1"
                onChange={inputRating}
            />
            <label 
                className={1 <= chooseStar! ? "fa fa-star checked" :"fa fa-star"}
                htmlFor={nameRating ?? 0 + '1'} 
                title="Оцінка «1»"
            ></label>
        </div>
    );
});

export default Rating;