import React from 'react';

const Main = () => {
    return (
     <div>    
        <div>
                <div
                className="p-5 text-center bg-image"
                style={{ backgroundImage: '../../public/img/reifenaufkleberYokohamarot8er.jpg',
                height: '400px',
                marginTop: '58px'}}>
        <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white">
                    <h1 className="mb-3">Buy TYRES</h1>
                    <h4 className="mb-3">Choose your tyres</h4>
                    <a className="btn btn-outline-light btn-lg" href="/catalog" role="button"
                    >Call to action</a>
                </div>
            </div>
        </div>
    </div>
        </div>
     
        <div
        className="bg-image card shadow-1-strong"
        style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/slides/003.jpg'}}
        >
          <div className="card-body text-white">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
                </p>
                <a href="#!" className="btn btn-outline-light">Button</a>
            </div>
        </div>
        <div
        className="bg-image card shadow-1-strong"
        style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/slides/003.jpg'}}
        >
          <div className="card-body text-white">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
                </p>
                <a href="#!" className="btn btn-outline-light">Button</a>
            </div>
        </div>
    </div>   



    );
};

export default Main;