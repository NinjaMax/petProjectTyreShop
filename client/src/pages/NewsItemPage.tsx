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
                        console.log('ARTICLE: ', getArticle)
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
            {article?.title}
        </div>
        <div>
            <img 
                src={article?.articles_pictures} 
                width={250}
                height={250}
                alt='imgArticle'
            />
        </div>
        <div dangerouslySetInnerHTML={{ __html: article?.description}}>
            
        </div>
        <div>
            {new Date(article?.createdAt).toLocaleDateString()}
        </div>
    </div>
  )
}

export default NewsItemPage