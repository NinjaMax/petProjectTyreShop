import '../css/FooterCss/Footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
  
  <div className="footerContainer">
    <div className='footerBox'>
      <section className="footerSocialSection">
        <p/>
        <div className='footerLogo'>
          <img 
            src='/img_main/logoSky180.webp' 
            loading='lazy'
            decoding='async'
            width={160} 
            height={62}  
            sizes='(max-width: 2560px) 180px,
            (max-width: 1440px) 180px,
            (max-width: 1024px) 180px,
            (max-width: 768px) 180px,
            (max-width: 425px) 180px,
            (max-width: 375px) 180px,
            (max-width: 320px) 180px, 100vw'
            alt='logoShopFooter'
          />
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
            {t('footer.company')}
          </h4>
          <p>
            <a href="/#" className="text-reset">{t('footer.about_company')}</a>
          </p>
          <p>
            <a href="/review" className="text-reset">{t('footer.reviews')}</a>
          </p>
          <p>
            <a href="/#" className="text-reset">{t('footer.tyre_service')}</a>
          </p>
        </div>
      </section>
      <section>
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h4 className="footerTitleColumn">
            {t('footer.goods')}
          </h4>
          <p>
            <a href="/tyres" className="text-reset">{t('footer.tyres')}</a>
          </p>
          <p>
            <a href="/wheels" className="text-reset">{t('footer.wheels')}</a>
          </p>
          <p>
            <a href="/#" className="text-reset">{t('footer.battery')}</a>
          </p>
          <p>
            <a href="/#" className="text-reset">{t('footer.chemy')}</a>
          </p>
          <p>
            <a href="/tyres/litni" className="text-reset">{t('footer.tyres_summer')}</a>
          </p>
          <p>
            <a href="/tyres/zimni" className="text-reset">{t('footer.tyres_winter')}</a>
          </p>
          <p>
            <a href="/tyres/legkovi" className="text-reset">{t('footer.tyres_passnger')}</a>
          </p>
          <p>
            <a href="/#" className="text-reset">{t('footer.tyres_cargo')}</a>
          </p>
          <p>
            <a href="/#" className="text-reset">{t('footer.tyres_spec')}</a>
          </p>
        </div>
      </section>
      <section>
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h4 className="footerTitleColumn">
            {t('footer.customers')}
          </h4>
          <p>
            <a href="/delivery-pay" className="text-reset">{t('footer.delivery_pay')}</a>
          </p>
          <p>
            <a href="/#" className="text-reset">{t('footer.garanty')}</a>
          </p>
          <p>
            <a href="/#" className="text-reset">{t('footer.garanty_skysafe')}</a>
          </p>
          <p>
            <a href="/contact" className="text-reset">{t('footer.contacs_link')}</a>
          </p>
          <p>
            <a href="/bonus" className="text-reset">{t('footer.bonuse')}</a>
          </p>
          <p>
            <a href="/news" className="text-reset">{t('footer.articles')}</a>
          </p>
        </div>
      </section>
      <section>
        <div className="contactSection">
          <h4 className="footerTitleColumn">
            {t('footer.contacts')}
          </h4>
          <p><i className="fas fa-home me-3"></i>{t('footer.contact_address')}</p>
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
        ©2024 Copyright:
      <a className="text-reset fw-bold" href="/#"> skyparts.com.ua</a>
    </div>
  </div>
)};

export default Footer;