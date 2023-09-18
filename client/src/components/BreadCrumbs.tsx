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
                  <li className='listBreadCrumbs' >
                    <a href={newRoute[0]} className='anchBreadCrumbs'>{hrefTitle[0]}</a>
                    <span> {'>'} </span>
                    <a href={newRoute[1]} className='anchBreadCrumbs'>{hrefTitle[1]}</a>
                    <span> {'>'} </span>
                    {newRoute[2] ?
                        <Fragment>
                        <a className='anchBreadCrumbs' href={hrefTitle[2] ? newRoute[1] +'/' + newRoute[2] : newRoute.slice(1, newRoute.length - 1).join('/')} >{hrefTitle[2]}</a>
                        <span> {hrefTitle[2] ? '>' : ''} </span>
                        </Fragment>
                        : null
                    }
                    {newRoute[3] ?
                        <Fragment>
                        <a className='anchBreadCrumbs' href={hrefTitle[3].length > 0 ? newRoute[1] + '/' + newRoute[3] : newRoute.slice(1, newRoute.length - 1).join('/')} >{hrefTitle[3]}</a> 
                        <span> {hrefTitle[3] ? '>' : ''} </span>
                        </Fragment>  
                       : null
                    }
                    {newRoute[4] ?
                        <Fragment>
                        <a className='anchBreadCrumbs' href={hrefTitle[4] ? newRoute[4] : newRoute.slice(1, newRoute.length - 1).join('/')} >{hrefTitle[4]}</a> 
                        <span> {hrefTitle[4] ? '>' : ''} </span>
                        </Fragment>  
                       : null
                    }
                    {newRoute[5] ?
                        <Fragment>
                        <a className='anchBreadCrumbs' href={newRoute[5]} >{hrefTitle[5]}</a> 
                        <span> {hrefTitle[5] ? '>' : ''} </span>
                        </Fragment>  
                       : null
                    }
                 </li>
                 : null 
                }
                <span className='breadcrumbSpan'>  {hrefTitle[hrefTitle.length - 1]}</span>
            </ul>
        </div>
    );
};

export default BreadCrumbs;