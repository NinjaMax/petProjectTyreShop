import React from 'react';
import '../../css/News/NewsMainBox.css';
// import newsImage from '../../assets/img/all_season_tyres_road_kwik_fit_header.jpg';
import newsImage2 from '../../assets/michelintyres.jpg';
import { IArticle } from './types/Article.type';
import { IArticleItem } from './types/ArticleItem.types';
import { createStringUrl } from '../../services/stringUrl';
import { NEWS_ROUTE } from '../../utils/consts';

const NewsMainBox = ({articlesArr, isNewsPage}: IArticle ) => {

    const openArticle = (e:any) => {
        localStorage.setItem('newsId', e.currentTarget.getAttribute('data-value'));
    };

    return (
        <div className='newsMainBox'>
            <div className='newsTitle'>Новини статті огляди</div>
            <div className="newsMainBoxList">
            {articlesArr ? articlesArr.map((article: IArticleItem) => (
            <a href={NEWS_ROUTE + '/' + createStringUrl(article.title.slice(0, article.title.length - 1))} 
                key={article.id_articles}
                data-value={article.id_articles} 
                onClick={openArticle}
            >
            <div className="newsMainBoxListItem" key={article.id_articles}>
                <div className="columnNewsBox">
                    <img src={newsImage2} alt='imageNews'/>
                    <div className='columnNewsBoxContent'>
                        <h3>{article.title}</h3>
                        {article.description.slice(0, 200) + '...'}
                        <p/>
                    </div>  
                    <div className='columnNewsBoxDate'>{new Date(article.createdAt).toLocaleDateString()}</div>  
                </div>
            </div>
            </a>
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