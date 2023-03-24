import React from 'react';
import '../css/BreadCrumbs.css';

interface IBreadCrumbs {
    route: string[];
    hrefTitle: string[];
}

const BreadCrumbs = ({route, hrefTitle}: IBreadCrumbs) => {
    return (
        <div>
            <ul className="breadcrumb">
                <li className='listBreadCrumbs'>
                    <a href={route[0]} className='anchBreadCrumbs'>{hrefTitle[0]}</a>
                </li>
                <li className='listBreadCrumbs'>
                    <a href={route[1]} className='anchBreadCrumbs'>{hrefTitle[1]}</a>
                </li>
            </ul>
        </div>
    );
};

export default BreadCrumbs;