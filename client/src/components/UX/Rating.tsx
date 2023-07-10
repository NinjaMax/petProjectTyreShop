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
                { chooseStar?.toString().match(/\.(\d+)/)?.[1].length ? 
                    chooseStar?.toFixed(1) : 
                    chooseStar?.toFixed()
                }
            </div>
            <input 
                id={nameRating ? 
                    nameRating + '_star_5': 
                    5 + 'star_5'}
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
                htmlFor={nameRating ? 
                    nameRating + '_star_5': 
                    5 + 'star_5'} 
                title="Оцінка «5»"
            ></label>

            <input 
                id={nameRating ? 
                    nameRating + '_star_4': 
                    4 + 'star_4'}
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
                htmlFor={nameRating ? 
                    nameRating + '_star_4': 
                    4 + 'star_4'} 
                title="Оцінка «4»"
            ></label>

            <input 
                id={nameRating ? 
                    nameRating + '_star_3': 
                    3 + 'star_3'}
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
                    3 > chooseStar! && 2 < chooseStar! ? "fas fa-star-half-alt checked" :
                    3 < chooseStar! ? 
                    "fa fa-star checked" :
                    "fa fa-star"
                }
                htmlFor={nameRating ? 
                    nameRating + '_star_3': 
                    3 + 'star_3'} 
                title="Оцінка «3»"
            ></label>

            <input 
                id={nameRating ?
                    nameRating + '_star_2': 
                    2 + 'star_2'}
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
                htmlFor={nameRating ? 
                    nameRating + '_star_2': 
                    2 + 'star_2'} 
                title="Оцінка «2»"
            ></label>

            <input 
                id={nameRating ? 
                    nameRating + '_star_1': 
                    1 + 'star_1'}
                type="radio" 
                title={nameRating} 
                name="rating" 
                value="1"
                onChange={inputRating}
            />
            <label 
                className={1 <= chooseStar! ? "fa fa-star checked" :"fa fa-star"}
                htmlFor={nameRating ? 
                    nameRating + '_star_1': 
                    1 + 'star_1'} 
                title="Оцінка «1»"
            ></label>
        </div>
    );
});

export default Rating;