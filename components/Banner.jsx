import React from "react";
import { FaUser, FaShareAlt } from "react-icons/fa";  // Add FaShareAlt here
import AddTokenButton from "../components/AddTokenButton"; 
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Banner = ({ title, type, action, path }) => {

    // Function to share on social media
    const shareContent = (platform) => {
      const shareText = "🚀 Join the @tinseltoken revolution! Transform DeFi while driving social impact. 🌍 Empower communities, support sustainability, and earn rewards. Be part of something bigger. Invest today! 💡 #Tinseltoken #Crypto #DApp";
      const websiteUrl = "https://thetinseltoken.com/";
  
      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(websiteUrl)}`, '_blank');
          break;
        case 'instagram':
          // Instagram doesn't allow direct sharing via web, so we'll open their website
          window.open(`https://www.instagram.com/`, '_blank');
          break;
        default:
          break;
      }
    };


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
  Claiming your TNTC tokens is simple! Connect your wallet, &nbsp;
   <span className="block my-2">
      <span>Share </span>
    <FaShareAlt
      className="new-cursour inline-block ml-2 text-[#0cfd95] hover:text-[#00ff87] transition-colors duration-300 transform hover:scale-110 cursor-pointer"
      onClick={() => shareContent('twitter')}
      size={24}
    />
    <span className="block text-xs text-gray-400 mt-1"> Click to share and spread the word! </span>
  </span>
   Copy your post ID, and fill out name and email form. Complete these 3 easy steps to participate in our massive 140 million token airdrop and be part of the Tinseltoken revolution!
</p>
                <div className="airdrop-stats flex justify-between mt-3">
                 
                  <div className="stat text-center">
                  <AddTokenButton />
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