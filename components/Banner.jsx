import React from "react";

const Banner = ({ title, type, action, path }) => {
  return (
    <section 
      className="breadcrumb-area breadcrumb-bg" 
      data-background="assets/img/bg/breadcrumb_bg.png"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-content">
              <h2 className="title">{title}</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href={path || "/"}>{type}</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {action}
                  </li>
                </ol>
              </nav>
              
              {/* New Airdrop Summary Section */}
              <div className="airdrop-summary mt-4 bg-[#20212e] p-4 rounded-lg">
                <p className="text-white text-sm">
                Claiming your TNTC tokens is simple! Connect your MetaMask wallet, share the post about Tinseltoken below to X, copy your post ID, 
                and fill out name and email form. Complete these 3 easy steps to participate in our massive 140 million token airdrop and be part 
                of the Tinseltoken revolution!
                </p>
                <div className="airdrop-stats flex justify-between mt-3">
                  <div className="stat text-center">
                    <span className="block text-[#00ff87] font-bold text-lg">140M</span>
                    <span className="block text-white text-xs">Total Tokens</span>
                  </div>
                  <div className="stat text-center">
                    <span className="block text-[#0cfd95] font-bold text-lg">70%</span>
                    <span className="block text-white text-xs">Airdrop Share</span>
                  </div>
                  <div className="stat text-center">
                    <span className="block text-[#17fba2] font-bold text-lg">Dec 2024</span>
                    <span className="block text-white text-xs">Distribution</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="breadcrumb-shape-wrap">
        <img
          src="assets/img/images/breadcrumb_shape01.png"
          alt=""
          className="alltuchtopdown"
        />
        <img
          src="assets/img/images/breadcrumb_shape02.png"
          alt=""
          className="rotateme"
        />
      </div>
    </section>
  );
};

export default Banner;