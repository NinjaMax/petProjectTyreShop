import React from 'react';
import '../../css/News/NewsMainBox.css';
// import newsImage from '../../assets/img/all_season_tyres_road_kwik_fit_header.jpg';
import newsImage2 from '../../assets/michelintyres.jpg';
import { IArticle } from './types/Article.type';
import { IArticleItem } from './types/ArticleItem.types';

const NewsMainBox = ({articlesArr, isNewsPage}: IArticle ) => {

    return (
        <div className='newsMainBox'>
            <div className='newsTitle'>Новини статті огляди</div>
            <div className="newsMainBoxList">
            {articlesArr ? articlesArr.map((article: IArticleItem) => (
            <div className="newsMainBoxListItem" key={article.id_articles}>
                <div className="columnNewsBox" onClick={() => console.log(article.articles_pictures)}>
                    <img src={newsImage2} alt='imageNews'/>
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
            <p/>
            {!isNewsPage ?
             <div className='btnNewsMainContainer'>
                <a className='btmNewsMainBox'
                    href='/news'
                >Дивитися всі новини
                </a>
            </div>   
            : null
            }
        </div>
    );
};

export default NewsMainBox;