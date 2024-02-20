import React, { useContext, useState } from 'react';
import '../css/Pagination.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';
import { useLocation } from 'react-router-dom';

const Pagination = observer(() => {
    const {page, goodsTyre, goodsWheel} = useContext<any | null>(Context);
    const location = useLocation();
    const [lastIndexPage, setLastIndexPage] = useState<number>(5);
    const [firstIndexPage, setFirstIndexPage] = useState<number>(0);
    
    const handlePage =(pageItem: any)=> {
        page.setLoadMore(0); 
        page.setPageItem(pageItem);
        page.setOffset((pageItem - 1) * 9);
    }   

    const pageCount = Math.ceil(goodsTyre.totalCount !== 0 ? goodsTyre.totalCount / page.limit: goodsWheel.totalCount !== 0 ? goodsWheel.totalCount / page.limit:  0 / page.limit);
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    const firstPage = (e:any) => {
        e.stopPropagation();
        setFirstIndexPage(0);
        setLastIndexPage(5);
    };
    const lastPage = (e:any) => {
        e.stopPropagation();
        setFirstIndexPage(pages.length - 6);
        setLastIndexPage(pages.length - 1);
    };
    const nextPage = (e: any) => {
        e.stopPropagation();
        setFirstIndexPage(prevFirst => prevFirst + 1);
        setLastIndexPage(prevLast => prevLast + 1);
    };
    const previousPage = (e :any) => {
        e.stopPropagation();
        setFirstIndexPage(prevFirst => prevFirst - 1);
        setLastIndexPage(prevLast => prevLast - 1);
    };
    
    return (
        <div className="pagination"
            onClick={(e: any) => e.stopPropagation()} 
            >
            <span className='paginationItem' 
                onClick={firstPage}
            >&#8810;</span>
            <span className='paginationItem' 
                onClick={previousPage}
            >&#706;</span>
            {pages.slice(firstIndexPage, lastIndexPage).map(
                (pageItem) =>
                <span key={pageItem}
                    className={
                        page.pageItem === pageItem ? 
                        'paginationItem active' : 'paginationItem'
                    }
                    onClick={() => handlePage(pageItem)}
                >
                <a onClick={(e: any) => e.preventDefault()}
                    href={location.pathname + `?page=${pageItem}`}
                >
                    {pageItem}
                </a>
                </span>
            )}
            <span className='paginationItem' 
                onClick={nextPage}
            >&#707;</span>
            <span className='paginationItem'
                onClick={lastPage} 
            >&#8811;</span>
        </div>
    );
});

export default Pagination;