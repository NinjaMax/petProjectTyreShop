import React, { useEffect, useState } from 'react';
import '../css/Pages/NewsItemPage.css';
import { getArticlesId } from '../restAPI/restGoodsApi';
import BreadCrumbs from '../components/BreadCrumbs';
import { useTranslation } from 'react-i18next';

type ArticleItemType = {
    articles_pictures: string;
    createdAt: any;
    description: any;
    id_articles: number;
    link?: string;
    title?: string;
};

const NewsItemPage = () => {
    const [article, setArticle] = useState<ArticleItemType>();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        let isMounted = false;
        const getIdNews = localStorage.getItem('newsId');

        const getNewsItem = async () => {
            if (!isMounted && getIdNews) {
                try {
                    const getArticle = await getArticlesId(+getIdNews); 
                    if (getArticle) {
                        setArticle(getArticle);
                    }   
                } catch (error) {
                    console.log('ERROR_GET_ARTICLE_ID: ', error);   
                }
            }
        };
        getNewsItem();
        localStorage.removeItem('newsId');
        return () =>{
            isMounted = true;
        }
    },[])

    return (
        <div>
            <BreadCrumbs route={[i18n.resolvedLanguage === 'uk' ? '/' : '/ru', i18n.resolvedLanguage === 'uk' ? '/news' : '/ru/news','НОВИНИ']} hrefTitle={[t('goodsPage.bread_crumbs_site'),'НОВИНИ']}/>
    <div className='newsItemPageContainer'>
        <div>
            <h2>{article?.title}</h2>
        </div>
        <div>
            <img 
                //loading='lazy'
                fetchpriority='low'
                width={1290}
                src={process.env.REACT_APP_HOST + '/imageArticle/' + article?.articles_pictures}
                alt='imgArticle'
            />
        </div>
        <div dangerouslySetInnerHTML={{ __html: article?.description}}>
        </div>
        <br/>
        <div>
            {new Date(article?.createdAt).toLocaleDateString()}
        </div>
    </div>
    </div>
  )
}

export default NewsItemPage