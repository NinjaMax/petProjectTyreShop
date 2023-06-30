import React from 'react';
import '../../css/Reviews/ReviewCreateTyre.css';
import RatingOptions from '../ux/RatingOptions';
import ButtonAction from '../buttons/ButtonAction';

const ReviewTyreCreate = () => {
  return (
    <div className='reviewTyreCreate'>
        <h4>Залишити відгук</h4>
        <span>Мої оцінки товару</span>
        <p/>
        <div className='reviewRatingList'>
            <div className='reviewRatingListItems'>
                <RatingOptions nameRating={'Бренд'} numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions nameRating={'Керованість на сухій дорозі'} numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions nameRating={'Керованість на мокрій дорозі'} numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions nameRating={'Керованість на снігу'} numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions nameRating={'Керованість на льду'} numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions nameRating={'Проходимість'} numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions nameRating={'Зносостійкість'} numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions nameRating={'Ціна/Якість'} numScore={4.5}/>
            </div>
        </div>
        <p/>
        <div className='reviewInputRating'>
            <input type="text" placeholder='Написати відгук'/>
            <input type="text" placeholder='Недоліки'/>
            <input type="text" placeholder='Переваги'/>
            <div>
                <input type="text" placeholder='Марка авто'/> 
                <input type="text" placeholder='Водійський стаж'/>
            </div>
            <input type="text" placeholder="Ваше ім'я"/>
            <input type="text" placeholder='Елеткронная пошта' />
        </div>
        <p/>
        <ButtonAction props={'Зберегти відгук'}/>
    </div>
  )
}

export default ReviewTyreCreate