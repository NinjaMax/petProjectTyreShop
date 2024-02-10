import React, { useEffect, useState } from 'react';
import '../css/Pages/NewsItemPage.css';
import { getArticlesId } from '../restAPI/restGoodsApi';

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
    <div className='newsItemPageContainer'>
        <div>
            <h2>{article?.title}</h2>
        </div>
        <div>
            <img 
                loading='lazy'
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
  )
}

export default NewsItemPage