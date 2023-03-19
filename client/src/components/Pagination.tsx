import React from 'react';
import '../css/Pagination.css';

const Pagination = () => {
//<a className='paginationItem' href="/#">&laquo;</a>
//<a className='paginationItem' href="/#">&#706;</a>
//<a className='paginationItem' href="/#">&#707;</a>
//<a className='paginationItem' href="/#">&raquo;</a> 


    return (
        <div className="pagination">
            <a className='paginationItem' href="/#">&#8810;</a>
            <a className='paginationItem' href="/#">&#706;</a>
            <a className='paginationItem' href="/#">1</a>
            <a className="paginationItem active" href="/#">2</a>
            <a className='paginationItem' href="/#">3</a>
            <a className='paginationItem' href="/#">4</a>
            <a className='paginationItem' href="/#">5</a>
            <a className='paginationItem' href="/#">6</a>
            <a className='paginationItem' href="/#">&#707;</a>
            <a className='paginationItem' href="/#">&#8811;</a>
        </div>
    );
};

export default Pagination;