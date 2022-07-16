import React from 'react';
import '../../css/News/NewsMainBox.css';

const NewsMainBox = () => {
    return (
        <div className='newsMainBox'>
            <div className="newsMainBoxList">
                <div className="columnNewsBox" onClick={"openTab('b1');"}>Box 1</div>
                <div className="columnNewsBox" onClick={"openTab('b2');"}>Box 2</div>
                <div className="columnNewsBox" onClick={"openTab('b3');"}>Box 3</div>
            </div>

            <div id="b1" className="containerTabNewsBox">
                <span onClick={"this.parentElem"} className="closebtnNewsBox">x</span>
                <h2>Box 1</h2>
                <p>Lorem ipsum..</p>
            </div>

            <div id="b2" className="containerTabNewsBox">
                <span onClick={"this.parentElem"} className="closebtnNewsBox">x</span>
                <h2>Box 2</h2>
                <p>Lorem ipsum..</p>
            </div>

            <div id="b3" className="containerTabNewsBox">
                <span onClick={"this.parentElem"} className="closebtnNewsBox">x</span>
                <h2>Box 3</h2>
                <p>Lorem ipsum..</p>
            </div>
        </div>
    );
};

export default NewsMainBox;