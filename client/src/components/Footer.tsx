import React from 'react';
import '../css/FooterCss/Footer.css';

const Footer = () => {
  return (
  
  <div className="footerContainer">
    <div className='footerBox'>
      <section
        className="footerSocialSection">
        <div className="me-5 d-none d-lg-block">
          <span>Будьте на звязку з нами в соціальних мережах:</span>
        </div>
        <div>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
        <div>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
        </div>
        <div>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </section>
      <section className="">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3"></i>Компанія
          </h6>
          <p>
            <a href="/#" className="text-reset">О компании</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Відгуки</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Шиномонтаж</a>
          </p>
        </div>
      </section>
      <section>
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="/#" className="text-reset">Шини</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Диски</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Акб</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Автохімія масла</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Літні шини</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Зимові шини</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Легкові шини</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Вантажні шини</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Спецтехніка</a>
          </p>
        </div>
      </section>
      <section>
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="/#" className="text-reset">Доставка і оплата</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Гарантія</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Гарантія SKYSAFE</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Контакти</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Бонусна програма</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Статті</a>
          </p>
        </div>
      </section>
      <section>
        <div className="contactSection">
          <h4 className="text-uppercase fw-bold mb-4">
            Контакти
          </h4>
          <p><i className="fas fa-home me-3"></i> Україна, м Харків 10012</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
             info@example.com
          </p>
          <p><i className="fas fa-phone me-3"></i> + 38 099 999 88 55</p>
          <p><i className="fas fa-print me-3"></i> + 38 050 500 50 50</p>
        </div>
      </section>
    </div>
    <div className="text-center p-4">
      © 2023 Copyright:
      <a className="text-reset fw-bold" href="/#"> skyparts.com.ua</a>
    </div>
  </div>
)};

export default Footer;