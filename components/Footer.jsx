import React from "react";
import { BsFillSendFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div
        class="footer-area footer-bg"
        data-background="assets/img/bg/footer_bg.png"
      >
        <div class="container">
          {/* <div class="footer-top">
            <div class="row">
              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div class="footer-widget">
                  <h4 class="fw-title">Usefull Links</h4>
                  <div class="footer-link">
                    <ul class="list-wrap">
                      {[
                        "Contact us",
                        "How it Works",
                        "Create",
                        "Explore",
                        "Terms & Services",
                      ].map((menu, index) => (
                        <li key={menu}>
                          <a href="#">{menu}e</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-2 col-md-4 col-sm-6">
                <div class="footer-widget">
                  <h4 class="fw-title">SOLUTIONS</h4>
                  <div class="footer-link">
                    <ul class="list-wrap">
                      {[
                        "Token Suite",
                        "Ecosystem",
                        "Investment",
                        "Portal",
                        "Tokenization",
                      ].map((menu, index) => (
                        <li key={menu}>
                          <a href="#">{menu}e</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                <div class="footer-widget">
                  <h4 class="fw-title">Usefull Links</h4>
                  <div class="footer-link">
                    <ul class="list-wrap">
                      {[
                        "Help Center",
                        "Partners",
                        "Suggestions",
                        "Blog",
                        "Newsletters",
                      ].map((menu, index) => (
                        <li key={menu}>
                          <a href="#">{menu}e</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-sm-8">
                <div class="footer-widget">
                  <h4 class="fw-title">Subscribe Newsletter</h4>
                  <div class="footer-newsletter">
                    <p>
                      Exerci tation ullamcorper suscipit lobortis nisl aliquip
                      ex ea commodo
                    </p>
                    <form action="#">
                      <input type="text" placeholder="Info@gmail.com" />
                      <button type="submit">
                        <i class="fas ">
                          <BsFillSendFill />
                        </i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div class="footer-bottom">
            <div class="row">
              <div class="col-lg-12">
                <div class="copyright-text">
                  <p>Copyright © 2024 TNTC. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-shape-wrap">
          <img
            src="assets/img/images/footer_shape01.png"
            alt=""
            class="alltuchtopdown"
          />
          <img
            src="assets/img/images/footer_shape02.png"
            alt=""
            class="leftToRight"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
