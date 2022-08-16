import React from 'react';
import '../css/BreadCrumbs.css';

const BreadCrumbs = ({ref, hrefTitle}) => {
    return (
        <div>
            <ul className="breadcrumb">
                <li><a href="/">Home</a></li>
                <li><a href="/tyres">Tyres</a></li>
            </ul>
        </div>
    );
};

export default BreadCrumbs;