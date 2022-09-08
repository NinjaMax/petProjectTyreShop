import React from 'react';
import '../css/BreadCrumbs.css';

const BreadCrumbs = ({ref, hrefTitle}) => {
    return (
        <div>
            <ul className="breadcrumb">
                <li className='listBreadCrumbs'>
                    <a  href="/" className='anchBreadCrumbs'>Home</a>
                </li>
                <li className='listBreadCrumbs'>
                    <a href="/tyres" className='anchBreadCrumbs'>Tyres</a>
                </li>
            </ul>
        </div>
    );
};

export default BreadCrumbs;