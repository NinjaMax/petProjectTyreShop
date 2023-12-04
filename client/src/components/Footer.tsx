import React from 'react';
import '../css/FooterCss/Footer.css';

const Footer = () => {
  return (
  
  <div className="footerContainer">
    <div className='footerBox'>
      <section className="footerSocialSection">
        <p/>
        <div className='footerLogo'>
          <img width={160} height={62}  src='/logoSky180.png' alt='logoShop'/>
        </div>
        <div className="me-5 d-none d-lg-block">
          <p/>
        </div>
        <div className='footerSocialSectionItem'>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
        <div className='footerSocialSectionItem'>
          <a href="/#" className="me-4 text-reset">
          <i className="fab fa-square-x-twitter"></i>
          </a>
        </div>
        <div className='footerSocialSectionItem'>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
        </div>
        <div className='footerSocialSectionItem'>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className='footerSocialSectionItem'>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <div className='footerSocialSectionItem'>
          <a href="/#" className="me-4 text-reset">
          <i className="fab fa-telegram"></i>
          </a>
        </div>
        {/* <div className='footerSocialSectionItem'>
          <h5>
          <a title="Wheel fitment and tire size guide and knowledge base" href="https://www.wheel-size.com">Wheel-Size.com</a>
          </h5>
        </div> */}
      </section>
      <section className="">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h4 className="footerTitleColumn">
            Компанія
          </h4>
          <p>
            <a href="/#" className="text-reset">О компании</a>
          </p>
          <p>
            <a href="/review" className="text-reset">Відгуки</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Шиномонтаж</a>
          </p>
        </div>
      </section>
      <section>
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h4 className="footerTitleColumn">
            Товари
          </h4>
          <p>
            <a href="/tyres" className="text-reset">Шини</a>
          </p>
          <p>
            <a href="/wheels" className="text-reset">Диски</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Акб</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Автохімія масла</a>
          </p>
          <p>
            <a href="/tyres/litni" className="text-reset">Літні шини</a>
          </p>
          <p>
            <a href="/tyres/zimni" className="text-reset">Зимові шини</a>
          </p>
          <p>
            <a href="/tyres/legkovi" className="text-reset">Легкові шини</a>
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
          <h4 className="footerTitleColumn">
            Покупцям
          </h4>
          <p>
            <a href="/delivery-pay" className="text-reset">Доставка і оплата</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Гарантія</a>
          </p>
          <p>
            <a href="/#" className="text-reset">Гарантія SKYSAFE</a>
          </p>
          <p>
            <a href="/contact" className="text-reset">Контакти</a>
          </p>
          <p>
            <a href="/bonus" className="text-reset">Бонусна програма</a>
          </p>
          <p>
            <a href="/news" className="text-reset">Статті</a>
          </p>
        </div>
      </section>
      <section>
        <div className="contactSection">
          <h4 className="footerTitleColumn">
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
    <div className="footerCopyPaste">
        ©2023 Copyright:
      <a className="text-reset fw-bold" href="/#"> skyparts.com.ua</a>
    </div>
  </div>
)};

export default Footer;