import React from 'react';

const Back = () => {
    return (
        <div>
            <!-- Background image -->
      <div
              class="p-5 text-center bg-image"
              style="
              background-image: url('https://mdbootstrap.com/img/new/slides/041.jpg');
              height: 400px;
              margin-top: 58px;
            "
      >
        <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-white">
              <h1 class="mb-3">Heading</h1>
              <h4 class="mb-3">Subheading</h4>
              <a class="btn btn-outline-light btn-lg" href="#!" role="button"
              >Call to action</a
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Background image -->
        </div>
    );
};

export default Back;