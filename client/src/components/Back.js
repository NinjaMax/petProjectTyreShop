import React from 'react';

const Back = () => {
    return (
    <div>
      <div
        className="p-5 text-center bg-image"
        style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/slides/041.jpg)',
        height: '400px',
        marginTop: '58px'}}>
        <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
            <h1 className="mb-3">Buy TYRES</h1>
            <h4 className="mb-3">Choose your tyres</h4>
            <a className="btn btn-outline-light btn-lg" 
               href="/#" role="button">
               Call to action</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
};

export default Back;