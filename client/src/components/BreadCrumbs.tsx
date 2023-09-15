import React, { Fragment } from 'react';
import '../css/BreadCrumbs.css';

interface IBreadCrumbs {
    route: string[];
    hrefTitle: string[];
}

const BreadCrumbs = ({route, hrefTitle}: IBreadCrumbs) => {
    const newRoute = route.slice(0, route.length - 1);

    console.log(newRoute);
    console.log(hrefTitle);
    return (
        <div>
            <ul className="breadcrumb">
                {newRoute ? 
                //newRoute.map(
                //    (item: string, index: number) => (
                //<Fragment key={item + index}>
                  <li className='listBreadCrumbs' >
                    <a href={newRoute[0]} className='anchBreadCrumbs'>{hrefTitle[0]}</a>
                    <span> {'>'} </span>
                    <a href={newRoute[1]} className='anchBreadCrumbs'>{hrefTitle[1]}</a>
                    <span> {'>'} </span>
                    {newRoute[2] ?
                        <Fragment>
                        <a href={newRoute.slice(1, newRoute.length - 1).join('/')} className='anchBreadCrumbs'>{hrefTitle[2]}</a>
                        <span> {newRoute[3] ? '>' : ''} </span>
                        </Fragment>
                        : null
                    }
                    {newRoute[3] ?
                        <Fragment>
                        
                        <a href={hrefTitle[2] ? newRoute.slice(1, newRoute.length).join('/') : newRoute.slice(1, newRoute.length - 1).join('/')} className='anchBreadCrumbs'>{hrefTitle[3]}</a> 
                        <span> {newRoute[3] ? '>' : ''} </span>
                        </Fragment>  
                       : null
                    }
                 </li>
                //</Fragment> 
               
                //))
                 : null 
                }
                <span>  {hrefTitle[hrefTitle.length - 1]}</span>
            </ul>
        </div>
    );
};

export default BreadCrumbs;