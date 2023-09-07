import React, { useEffect, useState } from 'react';
import '../css/Pages/News.css';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { IArticleItem } from '../components/news/types/ArticleItem.types';
import NewsMainBox from '../components/news/NewsMainBox';
import { getAllArticles } from '../restAPI/restGoodsApi';
import BreadCrumbs from '../components/BreadCrumbs';


const News = () => {
    const[articlesAll, setArticlesAll] = useState<any[] | null>();

    useEffect(() =>{
        let isMounted = false;
        const loadArticlesAll = async() => {
          const taskLoadArticles: any[] = [
            getAllArticles
          ];
          let i:number = 0;
          while(taskLoadArticles.length > i) {
            if(!isMounted && taskLoadArticles[i] === getAllArticles
              ) {
              let getAllArticles: any = await taskLoadArticles[i]();
              if (getAllArticles) {
                setArticlesAll(getAllArticles);
              }
            }
            const task = taskLoadArticles.shift();
            task();
            await yieldToMain(); 
        }
        }
        loadArticlesAll();
        return () => {
            isMounted = true;
        };
      },[]);


  return (
    <div className='newsBox'>
        <BreadCrumbs route={['НОВИНИ']} hrefTitle={['НОВИНИ']}/>
        <div className='newsContainer'>
        {articlesAll ? 
            <NewsMainBox 
                isNewsPage={true}
                articlesArr={articlesAll} 
            />
        : null
        }
        </div>
    </div>
  )
}

export default News