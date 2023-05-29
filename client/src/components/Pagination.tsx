import React, { useContext } from 'react';
import '../css/Pagination.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';

const Pagination = observer(() => {
    const {page} = useContext<any | null>(Context);
//<span className='paginationItem' >&laquo;</span>
//<span className='paginationItem' >&#706;</span>
//<span className='paginationItem' >&#707;</span>
//<span className='paginationItem' >&raquo;</span> 
    const handlePage =(e: any) => {
        page.setOffset(+e.currentTarget.getAttribute('data-value'));
        console.log('OFFSET_CLICK: ', +e.currentTarget.getAttribute('data-value'));
    }

    console.log('OFFSET: ', page.offset);

    return (
        <div className="pagination">
            <span className='paginationItem' >&#8810;</span>
            <span className='paginationItem' >&#706;</span>
            <span 
                className='paginationItem active'
                onClick={handlePage}
                data-value='0'
            >1</span>
            <span className='paginationItem '
                data-value='9'
                onClick={handlePage}
            >2</span>
            <span className='paginationItem' 
                data-value='18'
                onClick={handlePage}
            >3</span>
            <span className='paginationItem'
                data-value='27'
                onClick={handlePage} 
            >4</span>
            <span className='paginationItem' 
                data-value='36'
                onClick={handlePage}
            >5</span>
            <span className='paginationItem'
                data-value='45'
                onClick={handlePage} 
            >6</span>
            <span className='paginationItem' >&#707;</span>
            <span className='paginationItem' >&#8811;</span>
        </div>
    );
});

export default Pagination;