import React from "react";

const Feature = () => {
  const features = [
    {
      title: "Community-Centric Distribution",
      description:
        "Our airdrop strategy ensures that 70% of TNTC tokens are distributed to the community, fostering adoption and loyalty.",
      image: "features_img01.png",
    },
    {
      title: "Decentralized Governance",
      description:
        "Empowering the community to vote on key project decisions, ensuring fairness and transparency.",
      image: "features_img02.png",
    },
    {
      title: "Utility in DeFi and Gaming",
      description:
        "Use TNTC for staking, earning rewards, participating in governance, and transacting in gaming and NFT marketplaces.",
      image: "features_img03.png",
    },
    {
      title: "Security and Scalability",
      description:
        "Built on a secure and scalable blockchain platform with audited smart contracts for reliability.",
      image: "features_img04.png",
    },
  ];

  return (
    <section id="feature" className="features-area pt-140 pb-110">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-title text-center mb-70">
              <h2 className="title">
                Key Features of Tinseltoken (TNTC)
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {features.map((feature, index) => (
            <div key={index + 1} className="col-lg-6">
              <div className="features-item">
                <div className="features-content">
                  <h2 className="title">
                    <a href="#!">{feature.title}</a>
                  </h2>
                  <p>{feature.description}</p>
                </div>
                <div className="features-img">
                  <img src={`assets/img/images/${feature.image}`} alt={feature.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
