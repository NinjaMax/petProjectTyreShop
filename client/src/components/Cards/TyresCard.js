import React from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from '../Cards/FlagsIcon';
import PropsCardIcons from '../Cards/PropsCardIcons';
import Rating from '../Rating';
import tyres from '../../assets/autotyrespilotspotps2.png';

const TyresCard = () => {
    return (
        <div>
            <div className="tyresCard">
                <img id='imgTyres' src={tyres} alt="John" />
                <a href="/#">CONTINENTAL CONTICROSSPREMIUMCONTACT 6 UHPD 5P 195/65 R15</a>
                <div className='ratingTyres'><Rating/></div>
                <div className="tyresCardCode">код товара: 0123565447</div>
                <div><PropsCardIcons/></div>
                <div className="tyresCardCountry"><FlagsIcon/></div>
                <div className="tyresCardPrice">2005 UAH</div>
                <div><button>Contact</button></div>
                <p/>
                <div className='optionsTyreBox'>   
                    <div className="tooltipCardTyresWidth">
                        <span>Ширина:195
                        <span className="tooltipTextCardTyresWidth">Ширина профиля шины</span>
                        </span>
                    </div>
                    <div className="tooltipCardTyresWidth">
                        <span>Высота: 65
                        <span className="tooltipTextCardTyresWidth">Высота профиля шины</span>
                        </span>
                    </div>
                    <div className="tooltipCardTyresWidth">
                        <span>Диаметр: R15
                        <span className="tooltipTextCardTyresWidth">Посадочный диаметр шины</span>
                        </span>
                    </div>
                    <div className="tooltipCardTyresWidth">
                        <span>Бренд: Continental
                        <span className="tooltipTextCardTyresWidth">Производитель шины</span>
                        </span>
                    </div>
                    <div className="tooltipCardTyresWidth">
                        <span>Сезон: Летние
                        <span className="tooltipTextCardTyresWidth">Сезон применения шины</span>
                        </span>
                    </div>
                    <div className="tooltipCardTyresWidth">
                        <span>Год производства: 2022
                        <span className="tooltipTextCardTyresWidth">Год производства шины</span>
                        </span>
                    </div>
                    <div className="tooltipCardTyresWidth">
                        <span>Страна производства: Германия
                        <span className="tooltipTextCardTyresWidth">Страна производства шины</span>
                        </span>
                    </div>
                </div>
                    <p/>
            </div>
        </div>
    );
};

export default TyresCard;