import React, { useEffect, useState } from 'react';
import '../css/Pages/News.css';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import NewsMainBox from '../components/news/NewsMainBox';
import { getAllArticles } from '../restAPI/restGoodsApi';
import BreadCrumbs from '../components/BreadCrumbs';
import { useTranslation } from 'react-i18next';

const News = () => {
  const[articlesAll, setArticlesAll] = useState<any[] | null>();
  const { t, i18n } = useTranslation();

  useEffect(() =>{
    let isMounted = false;
    const loadArticlesAll = async() => {
      const taskLoadArticles: any[] = [
        getAllArticles
      ];
      let i:number = 0;
      while(taskLoadArticles.length > i) {
        if(!isMounted && taskLoadArticles[i] === getAllArticles) {
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
        <BreadCrumbs route={[i18n.resolvedLanguage === 'uk' ? '/' : '/ru', 'НОВИНИ']} hrefTitle={[t('goodsPage.bread_crumbs_site'),'НОВИНИ']}/>
        <div className='newsContainer'>
        {Array.isArray(articlesAll) ? 
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