import React, { useEffect, useState } from 'react';
import '../css/Pages/NewsItemPage.css';
import { getArticlesId, getArticlesImage } from '../restAPI/restGoodsApi';

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
    //const [articleImage, setArticleImage] = useState<string>();
  
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

    // useEffect(() => {
    //     let isMounted = false;
        
    //     const getImage = async () => {
    //         if (!isMounted && article) {
    //             try {
    //                 const getArticleImage = await getArticlesImage(article.articles_pictures); 
    //                 if (getArticleImage) {
    //                     console.log('ARTICLE_IMAGE: ', getArticleImage);
    //                     setArticleImage(getArticleImage);
    //                 }   
    //             } catch (error) {
    //                 console.log('ERROR_GET_ARTICLE_ID: ', error);   
    //             }
    //         }
    //     };
    //     getImage();
    //     localStorage.removeItem('newsId');
    //     return () =>{
    //         isMounted = true;
    //     }
    // },[article])
    
    //https://localhost:4000/public/imageArticle/2024-auto-motor-und-sport-winter-tire-test-r20-main.png

    return (
    <div className='newsItemPageContainer'>
        <div>
            {article?.title}
        </div>
        <div>
            <img 
                src={'https://localhost:4000/' + article?.articles_pictures}
                //src={article?.articles_pictures} 
                width={350}
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