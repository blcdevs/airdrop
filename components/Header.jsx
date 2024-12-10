import React, { useState, useContext } from "react";
import Link from "next/link";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import {
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialFacebook,
  TiSocialGithub,
} from "react-icons/ti";

//INTERNAL IMPORT
import { CONTEXT } from "../context/index";

const Header = () => {
  const { connect, address, loader } = useContext(CONTEXT);
  const menus = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Contribution",
      path: "#contribution",
    },
    {
      name: "Feature",
      path: "#feature",
    },
    {
      name: "ICO Chart",
      path: "#chart",
    },
    // {
    //   name: "FAQ",
    //   path: "#faq",
    // },
    // {
    //   name: "Contact",
    //   path: "#contact",
    // },
  ];
  return (
    <header id="header">
      <div id="sticky-header" class="menu-area transparent-header">
        <div class="container custom-container">
          <div class="row">
            <div class="col-12">
              <div class="menu-wrap">
                <nav class="menu-nav">
                  <div class="logo">
                    <Link href="/">
                      <img src="assets/img/logo/logo.png" width="90" height="90" alt="Logo" />
                    </Link>
                  </div>
                  <div class="navbar-wrap  d-none d-lg-flex">
                    <ul class="navigation">
                      {menus.map((menu, index) => (
                        <li
                          class={menu.name == "Home" ? "active" : ""}
                          key={index}
                        >
                          <a href={`${menu.path}`} class="section-link">
                            {menu.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div class="header-action">
                    <ul class="list-wrap">
                      {address ? (
                        <li class="header-login">
                          <Link href="/airdrop">
                            {loader ? "loading..." : " Airdrop"}
                            <i class="fas ">
                              <MdOutlineGeneratingTokens />
                            </i>
                          </Link>
                        </li>
                      ) : (
                        <li class="header-login">
                          <a onClick={() => connect()}>
                            Connect
                            <i class="fas ">
                              <MdOutlineGeneratingTokens />
                            </i>
                          </a>
                        </li>
                      )}

                      <li class="offcanvas-menu">
                        <a class="menu-tigger">
                          <RiMenu3Line />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="mobile-nav-toggler">
                    <i class="fas ">
                      <RiMenu3Line />
                    </i>
                  </div>
                </nav>
              </div>

              <div class="mobile-menu">
                <nav class="menu-box">
                  <div class="close-btn">
                    <i class="fas ">
                      <IoMdClose />
                    </i>
                  </div>
                  <div class="nav-logo">
                    <a href="index.html">
                      <img src="assets/img/logo/logo.png" width="90" height="90" alt="Logo" />
                    </a>
                  </div>
                  <div class="menu-outer">
                    <ul class="navigation">
                      {menus.map((menu, index) => (
                        <li
                          class={menu.name == "Home" ? "active" : ""}
                          key={menu.name}
                        >
                          <a href={`${menu.path}`} class="section-link">
                            {menu.name}
                          </a>
                        </li>
                      ))}

                      {address ? (
                        <li class="header-login">
                          <Link href="/airdrop">Airdrop</Link>
                        </li>
                      ) : (
                        <li class="header-login">
                          <a onClick={() => connect()}>Connect</a>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div class="social-links">
                    <ul class="clearfix list-wrap">
                      <li>
                        <a href="#">
                          <i class="fab ">
                            <TiSocialFacebook />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab">
                            <TiSocialTwitter />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab ">
                            <TiSocialLinkedin />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab ">
                            <TiSocialYoutube />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab ">
                            <TiSocialGithub />
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div class="menu-backdrop"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="extra-info">
        <div class="close-icon menu-close">
          <button>
            <i class="fas ">
              <IoMdClose />
            </i>
          </button>
        </div>
        <div class="logo-side mb-30">
          <a href="index.html">
            <img src="assets/img/logo/logo.png" width="90" height="90" alt="Logo" />
          </a>
        </div>
        <div class="side-info mb-30">
          <div class="contact-list mb-30">
            <h4>Office Address</h4>
            <p>
              123/A, Miranda City Likaoli <br />
              Prikano, Dope
            </p>
          </div>
          <div class="contact-list mb-30">
            <h4>Phone Number</h4>
            <p>+0989 7876 9865 9</p>
            <p>+(090) 8765 86543 85</p>
          </div>
          <div class="contact-list mb-30">
            <h4>Email Address</h4>
            <p>info@example.com</p>
            <p>example.mail@hum.com</p>
          </div>
        </div>
        <div class="social-icon-right mt-30">
          <a href="#">
            <i class="fab ">
              <TiSocialFacebook />
            </i>
          </a>
          <a href="#">
            <i class="fab ">
              <TiSocialTwitter />
            </i>
          </a>
          <a href="#">
            <i class="fab ">
              <TiSocialGithub />
            </i>
          </a>
          <a href="#">
            <i class="fab ">
              <TiSocialYoutube />
            </i>
          </a>
        </div>
      </div>
      <div class="offcanvas-overly"></div>
    </header>
  );
};

export default Header;
