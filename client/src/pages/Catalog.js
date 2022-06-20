
import React from 'react';

const Catalog = () => {
    return (
      <div>
        <h2>PORTFOLIO</h2>
        <div id="myBtnContainer">
          <button className="btn active" onclick="filterSelection('all')"> Show all</button>
          <button className="btn" onclick="filterSelection('nature')"> Nature</button>
          <button className="btn" onclick="filterSelection('cars')"> Cars</button>
          <button className="btn" onclick="filterSelection('people')"> People</button>
        </div>

        <div className="row">
          <div className="column nature">
            <div className="content">
              <img src="/w3images/mountains.jpg" alt="Mountains" style={{width:'100%'}}/>
              <h4>Mountains</h4>
              <p>Lorem ipsum dolor..</p>
            </div>
          </div>
          <div className="column nature">
            <div className="content">
              <img src="/w3images/lights.jpg" alt="Lights" style={{width:'100%'}}/>
              <h4>Lights</h4>
              <p>Lorem ipsum dolor..</p>
            </div>
          </div>
          <div className="column nature">
            <div className="content">
              <img src="/w3images/nature.jpg" alt="Nature" style={{width:'100%'}}/>
              <h4>Forest</h4>
              <p>Lorem ipsum dolor..</p>
            </div>
          </div>

          <div className="column cars">
            <div className="content">
              <img src="/w3images/cars1.jpg" alt="Car" style={{width:'100%'}}/>
              <h4>Retro</h4>
              <p>Lorem ipsum dolor..</p>
            </div>
          </div>
          <div className="column cars">
            <div className="content">
              <img src="/w3images/cars2.jpg" alt="Car" style={{width:'100%'}}/>
              <h4>Fast</h4>
              <p>Lorem ipsum dolor..</p>
            </div>
          </div>
          <div className="column cars">
            <div className="content">
              <img src="/w3images/cars3.jpg" alt="Car" style={{width:'100%'}}/>
              <h4>Classic</h4>
              <p>Lorem ipsum dolor..</p>
            </div>
          </div>

          <div className="column people">
            <div className="content">
              <img src="/w3images/people1.jpg" alt="People" style={{width:'100%'}}/>
              <h4>Girl</h4>
              <p>Lorem ipsum dolor..</p>
            </div>
          </div>
          <div className="column people">
            <div className="content">
              <img src="/w3images/people2.jpg" alt="People" style={{width:'100%'}}/>
              <h4>Man</h4>
              <p>Lorem ipsum dolor..</p>
            </div>
          </div>
          <div className="column people">
            <div className="content">
              <img src="/w3images/people3.jpg" alt="People" style={{width:'100%'}}/>
              <h4>Woman</h4>
              <p>Lorem ipsum dolor..</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Catalog;