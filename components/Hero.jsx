import React from "react";
import Link from "next/link";

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
                digital asset designed to democratize cryptocurrency.                  
              </p>

              <p>
              Tinseltoken (TNTC) is offering a massive airdrop of 140 million tokens (70% of total supply). Distribute in December 2024, this airdrop aims to democratize blockchain access and foster global community engagement. Claim your free TNTC tokens through our simple 3-step process!

              </p>
            </div>

            <div class="contribution-btn">
              <Link href="/airdrop" class="btn">
                Get Airdrop Token
              </Link>
              <Link href="/airdrop" class="btn btn-two">
                Read White Paper
              </Link>
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