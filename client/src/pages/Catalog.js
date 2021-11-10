import React from 'react';

const Catalog = () => {
    return (
    <div>
         
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: '',
          height: '400px'
        }}>
        <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Shop</h1>
            </div>
          </div>
        </div>
      </div>
    
   

    <main>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
           
            <section>
              
              <section id="filters" data-auto-filter="true">
                <h5>Filters</h5>

                
                <section className="mb-4" data-filter="condition">
                  <h6 className="font-weight-bold mb-3">Condition</h6>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="new"
                      id="condition-checkbox"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="condition-checkbox"
                    >
                      New
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="used"
                      id="condition-checkbox2"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="condition-checkbox2"
                    >
                      Used
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="collectible"
                      id="condition-checkbox3"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="condition-checkbox3"
                    >
                      Collectible
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="renewed"
                      id="condition-checkbox4"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="condition-checkbox4"
                    >
                      Renewed
                    </label>
                  </div>
                </section>
             

                
                <section className="mb-4">
                  <h6 className="font-weight-bold mb-3">Avg. Customer Review</h6>

                  <ul className="rating" data-toggle="rating" id="filter-rating">
                    <li>
                      <i className="far fa-star fa-sm text-primary" title="1"></i>
                    </li>
                    <li>
                      <i className="far fa-star fa-sm text-primary" title="2"></i>
                    </li>
                    <li>
                      <i className="far fa-star fa-sm text-primary" title="3"></i>
                    </li>
                    <li>
                      <i className="far fa-star fa-sm text-primary" title="4"></i>
                    </li>
                    <li>
                      <i className="far fa-star fa-sm text-primary" title="5"></i>
                    </li>
                  </ul>
                </section>
             

              
                <section className="mb-4">
                  <h6 className="font-weight-bold mb-3">Price</h6>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="price-radio"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="price-radio"
                    >
                      Under $25
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="price-radio2"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="price-radio2"
                    >
                      $25 to $50
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="price-radio3"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="price-radio3"
                    >
                      $50 to $100
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="price-radio4"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="price-radio4"
                    >
                      $100 to $200
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="price-radio5"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="price-radio5"
                    >
                      $200 i above
                    </label>
                  </div>
                </section>
                

                
                <section className="mb-4" data-filter="size">
                  <h6 className="font-weight-bold mb-3">Size</h6>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="34"
                      id="price-checkbox"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="price-checkbox"
                    >
                      34
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="36"
                      id="price-checkbox2"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="price-checkbox2"
                    >
                      36
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="38"
                      id="price-checkbox3"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="price-checkbox3"
                    >
                      38
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="40"
                      id="price-checkbox4"
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      for="price-checkbox4"
                    >
                      40
                    </label>
                  </div>
                </section>
                

               
                <section className="mb-4" data-filter="color">
                  <h6 className="font-weight-bold mb-3">Color</h6>

                  <div className="form-check form-check-inline m-0 p-0 pr-3">
                    <input
                      className="btn-check"
                      type="radio"
                      name="colorRadio"
                      id="colorRadio1"
                      value="white"
                    />
                    <label className="btn bg-light btn-rounded p-3" for="colorRadio1"></label>
                  </div>

                  <div className="form-check form-check-inline m-0 p-0 pr-3">
                    <input
                      className="btn-check"
                      type="radio"
                      name="colorRadio"
                      id="colorRadio2"
                      value="grey"
                    />
                    <label
                      className="btn btn-rounded p-3"
                      for="colorRadio2"
                      style={{backgroundColor: '#bdbdbd'}}>

                      </label>
                  </div>

                  <div className="form-check form-check-inline m-0 p-0 pr-3">
                    <input
                      className="btn-check"
                      type="radio"
                      name="colorRadio"
                      id="colorRadio3"
                      value="black"
                    />
                    <label className="btn bg-dark text-white btn-rounded p-3" for="colorRadio3"></label>
                  </div>

                  <div className="form-check form-check-inline m-0 p-0 pr-3">
                    <input
                      className="btn-check"
                      type="radio"
                      name="colorRadio"
                      id="colorRadio5"
                      value="blue"
                    />
                    <label className="btn bg-primary btn-rounded p-3" for="colorRadio5"></label>
                  </div>

                  <div className="form-check form-check-inline mt-3 mr-0 p-0 pr-3">
                    <input
                      className="btn-check"
                      type="radio"
                      name="colorRadio"
                      id="colorRadio9"
                      value="red"
                    />
                    <label className="btn bg-danger btn-rounded p-3" for="colorRadio9"></label>
                  </div>

                  <div className="form-check form-check-inline mt-3 mr-0 p-0 pr-3">
                    <input
                      className="btn-check"
                      type="radio"
                      name="colorRadio"
                      id="colorRadio10"
                      value="orange"
                    />
                    <label className="btn bg-warning btn-rounded p-3" for="colorRadio10"></label>
                  </div>
                </section>
                
              </section>
             
            </section>
           
          </div>
          <div className="col-md-8">
            <div className="row justify-content-center">
              <div className="col-md-6 my-auto py-3">
                <select className="select" id="sort-select">
                  <option value="1">Best rating</option>
                  <option value="2">Lowest price first</option>
                  <option value="3">Highest price first</option>
                </select>
                <label className="form-label select-label">Sort</label>
              </div>
            </div>
            <div className="row mb-4" id="content"></div>
            <div className="row">
              <div className="col-md-12 mt-3 text-center">
                <div
                  className="spinner-border text-primary mx-auto my-5"
                  id="spinner"
                  role="status"
                  style={{display: 'none'}}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
    );
};

export default Catalog;