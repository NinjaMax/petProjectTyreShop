import React from 'react';
import '../../css/News/NewsMainBox.css';
import { IArticle } from './types/Article.type';
import { IArticleItem } from './types/ArticleItem.types';
import { createStringUrl } from '../../services/stringUrl';
import { NEWS_ROUTE } from '../../utils/consts';
import { useTranslation } from 'react-i18next';

const NewsMainBox = ({articlesArr, isNewsPage}: IArticle ) => {
    const { t, i18n } = useTranslation();

    const openArticle = (e:any) => {
        localStorage.setItem('newsId', e.currentTarget.getAttribute('data-value'));
    };

    return (
        <div className='newsMainBox'>
            {Array.isArray(articlesArr) ?
            <>
            <div className='newsTitle'>{t('newsMainBox.news_box_title')}</div>
            <div className="newsMainBoxList">
            {Array.isArray(articlesArr) && i18n.resolvedLanguage === 'uk' ? 
            articlesArr.filter((article: any) => article.lang === 'uk')
            .map((article: IArticleItem) => (
            <a href={NEWS_ROUTE + '/' + createStringUrl(article.title.slice(0, article.title.length - 1))} 
                key={article.id_articles}
                data-value={article.id_articles} 
                onClick={openArticle}
            >
            <div className="newsMainBoxListItem" key={article.id_articles}>
                <div className="columnNewsBox">
                    <img 
                        width={410}
                        height={225}
                        loading='lazy'
                        decoding='async' 
                        src={'/imageArticle/' + article?.articles_pictures} 
                        alt='imageNews'
                    />
                    <div className='columnNewsBoxContent'>
                        <h2>{article.title}</h2>
                    </div>  
                    <div className='columnNewsBoxDate'>{new Date(article.createdAt).toLocaleDateString()}</div>  
                </div>
            </div>
            </a>
             ))
            : 
            articlesArr?.filter((article: any) => article.lang === 'ru')
            .map((article: IArticleItem) => (
            <a href={NEWS_ROUTE + '/' + createStringUrl(article.title.slice(0, article.title.length - 1))} 
                key={article.id_articles}
                data-value={article.id_articles} 
                onClick={openArticle}
            >
            <div className="newsMainBoxListItem" key={article.id_articles}>
                <div className="columnNewsBox">
                    <img 
                        width={410}
                        height={225}
                        loading='lazy'
                        decoding='async' 
                        src={'/imageArticle/' + article?.articles_pictures} 
                        alt='imageNews'
                    />
                    <div className='columnNewsBoxContent'>
                        <h2>{article.title}</h2>
                    </div>  
                    <div className='columnNewsBoxDate'>{new Date(article.createdAt).toLocaleDateString()}</div>  
                </div>
            </div>
            </a>
             ))
            }
            </div>
            </>
            : <span>Немає новин / Нет новостей</span>
            }
            <p/>
            {!isNewsPage ?
             <div className='btnNewsMainContainer'>
                <a className='btmNewsMainBox'
                    href='/news'
                >{t('newsMainBox.news_box_title_all')}
                </a>
            </div>   
            : null
            }

        </div>
    );
};

export default NewsMainBox;