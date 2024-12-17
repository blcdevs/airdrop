import React, { useState, useEffect, useContext } from "react";
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
import { ConnectButton } from '@rainbow-me/rainbowkit';

//INTERNAL IMPORT
import { CONTEXT } from "../context/index";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { connect, address, loader } = useContext(CONTEXT);

    // Close mobile menu when address changes
    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [address]);
  
    // Close mobile menu when loader changes to false
    useEffect(() => {
      if (!loader) {
        setIsMobileMenuOpen(false);
      }
    }, [loader]);
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
    // Update the mobile menu button click handler
    const handleMobileMenuClick = () => {
      if (loader) return; // Prevent menu toggle while loading
      toggleMobileMenu();
    };

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
                        <li className="header-login">
                          <Link href="/airdrop">
                            {loader ? "loading..." : " Go To Airdrop Page"}
                            <i className="fas">
                              <MdOutlineGeneratingTokens />
                            </i>
                          </Link>
                        </li>
                      ) : (
                        <li className="header-login">
                          <ConnectButton 
                            label="Connect Wallet"
                            chainStatus="icon"
                            showBalance={true}  // This will show the wallet balance
                            accountStatus={{
                              smallScreen: 'avatar',
                              largeScreen: 'full'
                  }}  // Configures how the accou
                          />
                        </li>
                      )}

                      {/* <li class="offcanvas-menu">
                        <a class="menu-tigger">
                          <RiMenu3Line />
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  
                  <div class="mobile-nav-toggler" onClick={handleMobileMenuClick}>
                    <i class="fas ">
                      <RiMenu3Line />
                    </i>
                  </div>
                </nav>
              </div>

              <div class={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <nav class="menu-box">
                  <div class="close-btn" onClick={handleMobileMenuClick}>
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
                        <li className="header-login">
                          <Link href="/airdrop">
                            {loader ? "loading..." : " Go To Airdrop Page"}
                            <i className="fas">
                              {/* <MdOutlineGeneratingTokens /> */}
                            </i>
                          </Link>
                        </li>
                      ) : (
                        <li className="header-login">
                          <ConnectButton 
                            label="Connect Wallet"
                            chainStatus="icon"
                            showBalance={true}  // This will show the wallet balance
                            accountStatus={{
                              smallScreen: 'avatar',
                              largeScreen: 'full'
                  }}  // Configures how the accou
                          />
                        </li>
                      )}
                    </ul>
                  </div>
                 
                </nav>
              </div>
              {isMobileMenuOpen && (
        <div className="menu-backdrop" onClick={handleMobileMenuClick}></div>
      )}
            </div>
          </div>
        </div>
      </div>

       <div class="offcanvas-overly"></div>
    </header>
  );
};

export default Header;
