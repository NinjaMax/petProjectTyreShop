import React from 'react';
import '../../css/News/NewsMainBox.css';
import newsImage from '../../assets/img/all_season_tyres_road_kwik_fit_header.jpg';
import newsImage2 from '../../assets/michelintyres.jpg';


const NewsMainBox = () => {
    return (
        <div className='newsMainBox'>
            <div className='newsTitle'>Новини статті огляди</div>
            <div className="newsMainBoxList">
                <div className="columnNewsBox" onClick={() => console.log('Стаття 1')}>
                    <img src={newsImage} alt='imageNews'/>
                    <div className='columnNewsBoxContent'>
                        <h4>Чи потрібні всесезонні шини?</h4>
                        <p>Lorem ipsum.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available..</p>
                        <div>18.08.2022</div>
                    </div>    
                </div>
                <div className="columnNewsBox" onClick={() => console.log('Стаття 2')}>
                    <img src={newsImage2} alt='imageNews'/>
                    <div className='columnNewsBoxContent'>
                        <h4>Як тестують та розвробляють шини для автоспорту</h4>
                        <p>Lorem ipsum.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available..</p>
                        <div>18.08.2022</div>
                    </div>    
                </div>
                <div className="columnNewsBox" onClick={() => console.log('Стаття 3')}>Box 3</div>
            </div>
            <div className='btnNewsMainBox'>
                <button className='btmNewsMainBox'>Дивитися всі новини</button>
            </div>
                
            <div id="b1" className="containerTabNewsBox">
                <span onClick={() => console.log('Стаття 4')} className="closebtnNewsBox">x</span>
                <img src={newsImage} alt='imageNews'/>
                <h2>Box 1</h2>
                <p>Lorem ipsum..</p>
            </div>

            <div id="b2" className="containerTabNewsBox">
                <span onClick={() => console.log('Стаття 1')} className="closebtnNewsBox">x</span>
                <h2>Box 2</h2>
                <p>Lorem ipsum..</p>
            </div>

            <div id="b3" className="containerTabNewsBox">
                <span onClick={() => console.log('Стаття 1')} className="closebtnNewsBox">x</span>
                <h2>Box 3</h2>
                <p>Lorem ipsum..</p>
            </div>
        </div>
    );
};

export default NewsMainBox;