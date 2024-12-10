import React from "react";

const Banner = ({ title, type, action, path }) => {
  return (
    <section
      class="breadcrumb-area breadcrumb-bg"
      data-background="assets/img/bg/breadcrumb_bg.png"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-content">
              <h2 class="title">{title}</h2>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href={path || "/"}>{type}</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    {action}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="breadcrumb-shape-wrap">
        <img
          src="assets/img/images/breadcrumb_shape01.png"
          alt=""
          class="alltuchtopdown"
        />
        <img
          src="assets/img/images/breadcrumb_shape02.png"
          alt=""
          class="rotateme"
        />
      </div>
    </section>
  );
};

export default Banner;
