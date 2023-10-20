import React from 'react';
import '../../css/News/NewsMainBox.css';
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
                    <img width={1290} src={process.env.REACT_APP_HOST + '/imageArticle/' + article?.articles_pictures} alt='imageNews'/>
                    <div className='columnNewsBoxContent'>
                        <h2>{article.title}</h2>
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