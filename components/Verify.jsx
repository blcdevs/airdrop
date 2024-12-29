import React, { useState, useEffect, useContext } from "react";
import { saveAs } from "file-saver";
import { BsTwitterX, BsInstagram } from "react-icons/bs";
import { FaUser, FaShareAlt } from "react-icons/fa";  // Add FaShareAlt here
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { MdMarkEmailRead } from "react-icons/md";
import { ReferralStats } from './index'; // If importing from components/index.js

//INTERNAL IMPORT
import { Twitter, Follow } from "./index";
import { CONTEXT } from "../context/index";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSendTransaction } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';

const Verify = () => {
  const handleImage = () => {
    let url = `airdrop.png`;
    saveAs(url, `@tinseltoken`);
  };

  const { sendTransaction } = useSendTransaction();

  const { claimAirdrop, notifyError, address, loader, claimStatus } = useContext(CONTEXT);
  const [localLoader, setLocalLoader] = useState(false);

  const [user, setUser] = useState({
    twitterId: "",
    email: "",
  });

  useEffect(() => {
    if (!loader) {
      setLocalLoader(false);
    }
  }, [loader]);
  

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const CALLING_AIRDROP = async () => {
    try {
      setLocalLoader(true);
  
      // Validate all required fields
     
      if (!user.twitterId.trim()) {
        notifyError("Please enter your Twitter ID");
        return;
      }
      if (!user.email.trim()) {
        notifyError("Please enter your email");
        return;
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        notifyError("Please enter a valid email address");
        return;
      }
  
      console.log("Starting airdrop claim...");
      console.log("User data:", user);
      
      await claimAirdrop(user);
      
    } catch (error) {
      console.error("Airdrop claim error in component:", error);
      notifyError(error.message || "Failed to claim airdrop");
    } finally {
      setLocalLoader(false);
    }
  };

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
    <section className="contact-area pt-140 pb-140">
      <div className="container">
        <div className="contact-info-wrap">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="contact-info-item">
                <div className="icon">
                  <i className="fas ">
                    <BsTwitterX />
                  </i>

                  <i className="fas ">
                 
                  </i>
                  
                </div>

                <div className="content">
                <h6 className="title">
                  <FaShareAlt
                          className="new-cursour ml-3 new-cursour" // Added margin-left for spacing
                          onClick={() => shareContent('twitter')}
                        />
                     </h6>
                  <h6 className="title">Click the Share Button </h6>
                  <Twitter
                    user={user}
                    handleClick={(e) => handleFormFieldChange("twitterId", e)}
                  />

                    <Follow
                    name={"Email"}
                    handleClick={(e) => handleFormFieldChange("email", e)}
                  />

                        {address != "" && claimStatus == true ? (
                        <button className="btn margin-btn-new" disabled>
                          {localLoader || loader ? "Loading..." : "Already Claimed Airdrop"}
                        </button>
                      ) : (
                        <ConnectButton.Custom>
                          {({
                            account,
                            chain,
                            openConnectModal,
                            openChainModal,
                            openAccountModal,
                            mounted,
                          }) => {
                            const ready = mounted;
                            if (!ready) return null;

                            if (!account) {
                              return (
                                <button 
                                  className="btn margin-btn-new" 
                                  onClick={openConnectModal}
                                >
                                  Connect Wallet
                                </button>
                              );
                            }

                            // Check if wrong network
                            if (chain?.id !== bscTestnet.id) {
                              return (
                                <button 
                                  className="btn margin-btn-new" 
                                  onClick={openChainModal}
                                >
                                  Switch to BSC
                                </button>
                              );
                            }

                            if (account && !claimStatus) {
                              return (
                                <button 
                                  className="btn margin-btn-new" 
                                  onClick={() => CALLING_AIRDROP()}
                                >
                                  {localLoader || loader ? "Processing..." : "Claim Airdrop"}
                                </button>
                              );
                            }
                          }}
                        </ConnectButton.Custom>
                      )}

                        
          {address && (
            <div className="disconnect-button-wrapper">
              <ConnectButton 
                label="DISCONNECT"
                chainStatus="icon"
                showBalance={true}  
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full'
                }}  
              />
            </div>
          )}

                </div>
              </div>
            </div>

            <ReferralStats/>
           
          </div>
        </div>
        <div className="contact-form-wrap">
          <div className="row g-0">
            <div className="col-57 order-0 order-lg-2">
              <div className="contact-form">
                <h4 className="title">Post Details</h4>
                <div id="contact-form">
                  <div className="row">
                    {/* Twitter Section */}
                    <div className="col-md-6 ">
                    <div className="d-flex align-items-center share-copy-buttons">
                        <HiOutlineClipboardDocument
                          className="new-cursour mr-3" // Added margin-right for spacing
                          onClick={(e) =>
                            navigator.clipboard.writeText("Twitter @Tinseltoken")
                          }
                        />
                        <FaShareAlt
                          className="new-cursour ml-3 new-cursour" // Added margin-left for spacing
                          onClick={() => shareContent('twitter')}
                        />
                      </div>

                      <div
                        className="form-grp"
                        onClick={(e) =>
                          navigator.clipboard.writeText("Twitter @Tinseltoken")
                        }
                      >
                        <input
                          type="text"
                          disabled
                          placeholder="Twitter @Tinseltoken"
                        />
                      </div>
                    </div>

                    {/* Instagram Section */}
                    {/* <div className="col-md-6">
                      <div className="d-flex align-items-center share-copy-buttons">
                        <HiOutlineClipboardDocument
                          className="new-cursour mr-2 "
                          onClick={(e) =>
                            navigator.clipboard.writeText(
                              "Instagram: @tinseltoken"
                            )
                          }
                        />
                        <FaShareAlt
                          className="new-cursour ml-2 new-cursour"
                          onClick={() => shareContent('instagram')}
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          disabled
                          placeholder="Instgram: @tinseltoken"
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className="form-grp">
                    <HiOutlineClipboardDocument
                      className="new-cursour"
                      onClick={(e) =>
                        navigator.clipboard.writeText(
                          "🚀 Join the @tinseltoken revolution! Transform DeFi while driving social impact. 🌍 Empower communities, support sustainability, and earn rewards. Be part of something bigger. Invest today! 💡 #Tinseltoken #Crypto #DApp"
                        )
                      }
                    />
                    <textarea
                      name="message"
                      disabled
                      placeholder="🚀 Join the @tinseltoken revolution! Transform DeFi while driving social impact. 🌍 Empower communities, support sustainability, and earn rewards. Be part of something bigger. Invest today! 💡 #Tinseltoken #Crypto #DApp"
                    ></textarea>
                  </div>
                  <button onClick={() => handleImage()} className="btn">
                    Download Image
                  </button>
                </div>
                <p className="ajax-response mb-0"></p>
              </div>
            </div>
            <div className="col-43">
              <div className="contact-map">
                <img src="airdrop.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verify;