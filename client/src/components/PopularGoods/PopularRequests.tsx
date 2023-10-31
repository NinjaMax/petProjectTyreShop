import React from 'react';
import '../../css/PopularGoodsCss/PopularDiametrTyre.css';

type PopularGoodsTyre = { 
    map?: any;
    entityLink: [{
        link: string;
        title: string;
    }, ...{}[]];
};

const PopularRequests = ({entityLink}: PopularGoodsTyre) => {
   
    return (
        <div className='popularDiametrTyre'> 
        {
            entityLink ? entityLink?.map((item: any) =>
            <a key={'id: ' + item.title} href={item.link}>
               {item.title}
            </a>   
            ) : null
        }
        </div>   
    );
};

export default PopularRequests;
