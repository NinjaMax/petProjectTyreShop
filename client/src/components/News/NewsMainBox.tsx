import React from 'react';
import '../../css/News/NewsMainBox.css';
// import newsImage from '../../assets/img/all_season_tyres_road_kwik_fit_header.jpg';
// import newsImage2 from '../../assets/michelintyres.jpg';

type IArticle = {
    articlesArr?: any[] | null;
};

type IArticleItem = {
    id_articles: number,
    description: string,
    title: string,
    link: string,
    articles_pictures: string
    createdAt: string
};

const NewsMainBox = ({articlesArr}: IArticle ) => {

    return (
        <div className='newsMainBox'>
            <div className='newsTitle'>Новини статті огляди</div>
            <div className="newsMainBoxList">
            {articlesArr ? articlesArr.map((article: IArticleItem) => (
            <div className="newsMainBoxListItem" key={article.id_articles}>
                <div className="columnNewsBox" onClick={() => console.log(article.articles_pictures)}>
                    <img src={'../../../../server/articles_img/all_season_tyres_road_kwik_fit_header.jpg'} alt='imageNews'/>
                    <div className='columnNewsBoxContent'>
                        <h4>{article.title}</h4>
                        <p>{article.description}</p>
                        <div>{new Date(article.createdAt).toLocaleDateString()}</div>
                    </div>    
                </div>
            </div>
             ))
            : null
            }
            </div>
            <div className='btnNewsMainBox'>
                <button className='btmNewsMainBox'>Дивитися всі новини</button>
            </div>
                
            {/* // <div id="b1" className="containerTabNewsBox">
            //     <span onClick={() => console.log('Стаття 4')} className="closebtnNewsBox">x</span>
            //     <img src={newsImage} alt='imageNews'/>
            //     <h2>Box 1</h2>
            //     <p>Lorem ipsum..</p>
            // </div>

            // <div id="b2" className="containerTabNewsBox">
            //     <span onClick={() => console.log('Стаття 1')} className="closebtnNewsBox">x</span>
            //     <h2>Box 2</h2>
            //     <p>Lorem ipsum..</p>
            // </div>

            // <div id="b3" className="containerTabNewsBox">
            //     <span onClick={() => console.log('Стаття 1')} className="closebtnNewsBox">x</span>
            //     <h2>Box 3</h2>
            //     <p>Lorem ipsum..</p>
            // </div> */}
        </div>
    );
};

export default NewsMainBox;