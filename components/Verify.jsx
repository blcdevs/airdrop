import React, { useState, useContext } from "react";
import { saveAs } from "file-saver";
import { BsTwitterX, BsInstagram } from "react-icons/bs";
import { FaUser, FaShareAlt } from "react-icons/fa";  // Add FaShareAlt here
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { MdMarkEmailRead } from "react-icons/md";

//INTERNAL IMPORT
import { Twitter, Follow } from "./index";
import { CONTEXT } from "../context/index";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Verify = () => {
  const handleImage = () => {
    let url = `airdrop.png`;
    saveAs(url, `@tinseltoken`);
  };
  
  const { claimAirdrop, notifyError, address, connect, loader, claimStatus } =
    useContext(CONTEXT);

  const [user, setUser] = useState({
    name: "",
    twitterId: "",
    // instagramUrl: "",
    email: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const CALLING_AIRDROP = async () => {
    const { name, twitterId, email } = user;

    console.log(user);

    if (!name || !twitterId || !email) {
      return notifyError("Provide all details to claim airdrop");
    }
    await claimAirdrop(user);
  };

  // Function to share on social media
  const shareContent = (platform) => {
    const shareText = "🚀 Join the revolution! Introducing @tinseltoken, the future of decentralized finance and social impact. 💡 With every transaction, you're not just investing in a token, you're investing in positive change. 🌍 Let's empower communities, support sustainability, and drive meaningful impact together. Don't miss out on this opportunity to be part of something bigger than yourself. Invest in Tinseltoken today and make a difference while earning rewards! #@tinseltoken #crypto #tinseltoken #dapp 🌟🔗";
    const websiteUrl = "https://www.tinseltoken.com/";

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
                </div>
                <div className="content">
                  <h6 className="title">Twitter </h6>
                  <Twitter
                    user={user}
                    handleClick={(e) => handleFormFieldChange("twitterId", e)}
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="contact-info-item">
                <div className="icon">
                  <i className="fas ">
                    <BsInstagram />
                  </i>
                </div>
                <div className="content">
                  <h6 className="title">Instagram</h6>

                  <Instagram
                    user={user}
                    handleClick={(e) =>
                      handleFormFieldChange("instagramUrl", e)
                    }
                  />
                </div>
              </div>
            </div> */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="contact-info-item">
                <div className="icon">
                  <i className="fas ">
                    <FaUser />
                  </i>
                </div>
                <div className="content">
                  <h6 className="title">Email</h6>
                  <Follow
                    name={"Name"}
                    handleClick={(e) => handleFormFieldChange("name", e)}
                  />
                  <Follow
                    name={"Email"}
                    handleClick={(e) => handleFormFieldChange("email", e)}
                  />

                  {address != "" && claimStatus == true ? (
                    <button className="btn margin-btn-new">
                      {loader ? "loading..." : "Already Claim Airdrop"}
                    </button>
                  ) : address != "" && claimStatus == false ? (
                    <button
                      onClick={() => CALLING_AIRDROP()}
                      className="btn margin-btn-new"
                    >
                      {loader ? "loading..." : "Clain  Airdrop"}
                    </button>
                  ) : (
                    <ConnectButton 
                      label="Connect Wallet"
                      chainStatus="icon"
                      showBalance={true}
                      accountStatus={{
                        smallScreen: 'avatar',
                        largeScreen: 'full'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
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
                          "🚀 Join the revolution! Introducing @tinseltoken, the future of decentralized finance and social impact. 💡 With every transaction, you're not just investing in a token, you're investing in positive change. 🌍 Let's empower communities, support sustainability, and drive meaningful impact together. Don't miss out on this opportunity to be part of something bigger than yourself. Invest in Tinseltokentoday and make a difference while earning rewards! #@tinseltoken #crypto #tinseltoken #dapp 🌟🔗"
                        )
                      }
                    />
                    <textarea
                      name="message"
                      disabled
                      placeholder="🚀 Join the revolution! Introducing @tinseltoken, the future of decentralized finance and social impact. 💡 With every transaction, you're not just investing in a token, you're investing in positive change. 🌍 Let's empower communities, support sustainability, and drive meaningful impact together. Don't miss out on this opportunity to be part of something bigger than yourself. Invest in Tinseltoken today and make a difference while earning rewards! #@tinseltoken #crypto #tinseltoken #dapp 🌟🔗"
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