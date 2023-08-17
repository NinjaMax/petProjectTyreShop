import React from 'react';
import '../css/Pages/Contact.css';

const Contact = () => {
    return (
        <div className='contactPageContainer'>
          <h3>Контакти</h3>
          <div className='contactPageBox'>
            <div className='contactPageAddress'>
              <span> Україна, м Харків 10012 </span> 
              <span>info@example.com</span>

            </div>
            <div className='contactPagePhone'>
              <span className='contactPageTitle'>
                Зв'язатися з нами:
              </span>
              <span>Kyivstar
              +38 (067) 648-11-88</span>
              <span>Vodafone
              +38 (050) 723-38-88</span>
              <span>Life
              +38 (093) 170-01-08</span>
              <span>Київ
              +38 (044) 392-85-75</span>
              <span>Харків
              +38 (057) 727-66-76</span>
            </div>
            <div className='contactPageSocial'>
              <span className='contactPageTitle'>
                Месенджери:
              </span>
              <span>Viber
              @shinydiskichat</span>
              <span>Telegram
              @ShinyDiskibot</span>
            </div>
            <div className='contactPageSchedule'>
              <span className='contactPageTitle'>
                Графік роботи інтернет-магазину:
              </span>
              <span>пн – пт: з 8:00 до 21:00</span>
              <span>сб: з 9:00 до 19:00</span>
              <span>нд: з 9:00 до 18:00</span>
            </div>
          </div>
        </div>
    );
};

export default Contact;