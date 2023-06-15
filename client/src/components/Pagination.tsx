import React, { useContext, useState } from 'react';
import '../css/Pagination.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';
import { useHistory, useLocation } from 'react-router-dom';

const Pagination = observer(() => {
    const {page, goodsTyre} = useContext<any | null>(Context);
    const location = useLocation();
    //const history = useHistory<any>();
    const [lastIndexPage, setLastIndexPage] = useState<number>(5);
    const [firstIndexPage, setFirstIndexPage] = useState<number>(0);
    
    const handlePage =(pageItem: any, index: number)=> {
        page.setLoadMore(0); 
        page.setOffset(index * 9);
        page.setPageItem(pageItem);
    }

    const pageCount = Math.ceil(goodsTyre.totalCount / page.limit);
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
    
    console.log('PAGES: ', pages);
    console.log('TYRE_COUNT: ', goodsTyre.totalCount);
    console.log('PAGE_LIMIT: ', page.limit);
    console.log('OFFSET: ', page.offset);
    console.log('PAGE_PAGEITEM: ', page.pageItem);

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
                (pageItem, index) =>
                <span key={pageItem}
                    className={
                        page.pageItem === pageItem ? 
                        'paginationItem active' : 'paginationItem'
                    }
                    onClick={() => handlePage(pageItem, index)}
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