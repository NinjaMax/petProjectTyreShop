import React from 'react'
import '../css/Pages/NotFound.css';

const NotFound = () => {
  return (
    <div className='notFoundBox'>
        <img src={'./iconsError/404_error_2.png'} height={150} width={150} alt="not found"/>
        <h4>СТОРІНКА НЕ ЗНАЙДЕНА</h4>
        <p/>
        <a href='/'>Перейти на головну сторінку</a>
        <p/>
    </div>
  )
}

export default NotFound
