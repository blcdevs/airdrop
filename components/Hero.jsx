import React from "react";

const Hero = () => {
  return (
    <section
      className="banner-area banner-bg"
      data-background="assets/img/banner/banner_bg.png"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="banner-content text-center">
              <h2 className="title">
                Tinseltoken (TNTC): <br />
                <span>Revolutionizing Blockchain Accessibility</span>
              </h2>
              <p>
                Join the blockchain revolution with Tinseltoken, a community-driven 
                digital asset designed to democratize cryptocurrency. Experience 
                our live ICO and be part of a transformative ecosystem that 
                allocates 70% of tokens to community airdrops, empowering users 
                through DeFi, gaming, and governance innovations.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-scroll-down">
        <a href="#contribution" className="section-link">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div className="banner-shape-wrap">
        <img
          src="assets/img/banner/banner_shape01.png"
          alt=""
          className="leftToRight"
        />
        <img
          src="assets/img/banner/banner_shape02.png"
          alt=""
          className="alltuchtopdown"
        />
      </div>
    </section>
  );
};

export default Hero;