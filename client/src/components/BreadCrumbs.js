import React from 'react';
import '../css/BreadCrumbs.css';

const BreadCrumbs = () => {
    return (
        <div>
            <ul className="breadcrumb">
                <li><a href="/#">Home</a></li>
                <li><a href="/#">Tyres</a></li>
                <li>Continental</li>
            </ul>
        </div>
    );
};

export default BreadCrumbs;