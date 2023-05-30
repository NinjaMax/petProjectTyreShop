import React, { Fragment } from 'react';
import '../css/BreadCrumbs.css';

interface IBreadCrumbs {
    route: string[];
    hrefTitle: string[];
}

const BreadCrumbs = ({route, hrefTitle}: IBreadCrumbs) => {
    const newRoute = route.slice(0, route.length -1);
    return (
        <div>
            <ul className="breadcrumb">
                {newRoute ? newRoute.map(
                    (item: string, index: number) => (
                <Fragment key={item + index}>
                  <li className='listBreadCrumbs' >
                    <a href={item} className='anchBreadCrumbs'>{hrefTitle[index]}</a>
                 </li>
                </Fragment> 
               
                ))
                 : null 
                }
                <span> / {hrefTitle[hrefTitle.length - 1]}</span>
            </ul>
        </div>
    );
};

export default BreadCrumbs;