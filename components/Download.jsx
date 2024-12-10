import React from "react";

const Download = () => {
  return (
    <section class="download-area pt-130 pb-130">
      <div class="container">
        <div class="download-inner-wrap">
          <div class="row align-items-end">
            <div class="col-lg-6">
              <div class="download-content">
                <div class="section-title mb-40">
                  <h2 class="title">Control Application From Your Telegram</h2>
                </div>
                <div class="download-list">
                  <ul class="list-wrap">
                    <li>
                    <a href="#" class="download-btn">
                    Luanch App on Telegram
                  </a>
                      
                    </li>
                    
                  </ul>
                </div>
                {/* <div class="download-btn-wrap">
                  <a href="#" class="download-btn">
                    <img src="assets/img/images/download_btn01.png" alt="" />
                  </a>
                  <a href="#" class="download-btn">
                    <img src="assets/img/images/download_btn02.png" alt="" />
                  </a>
                </div> */}
              </div>
            </div>
            <div class="col-lg-6">
              <div class="download-img">
                <img src="assets/img/images/download_img01.png" alt="" />
                <img src="assets/img/images/download_img02.png" alt="" />
              </div>
            </div>
          </div>
          <div class="download-shape-wrap">
            <img src="assets/img/images/download_shape01.png" alt="" />
            <img src="assets/img/images/download_shape02.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
