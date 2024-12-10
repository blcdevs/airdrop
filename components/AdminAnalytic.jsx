import React, { useState, useContext } from "react";

import { CONTEXT } from "../context/index";
import { shortenAddress } from "../Utils/index";

const AdminAnalytic = () => {
  const {
    contractBalEther,
    connectedTokenAddr,
    airdropBalance,
    airdropFee,
    allUers,
  } = useContext(CONTEXT);

  const features = [
    {
      title: `Token Address: ${shortenAddress(connectedTokenAddr)}`,
      image: "features_two_img01.png",
    },
    {
      title: `Airdrop Balance: ${airdropBalance || 0}`,
      image: "features_two_img02.png",
    },
    {
      title: `Total Users: ${allUers.length}`,
      image: "features_two_img03.png",
    },
  ];
  return (
    <section class="features-area-two ">
      <div class="container">
        <div class="row justify-content-center admin-card-new">
          {features.map((feature, index) => (
            <div key={index + 5} class="col-lg-4 col-md-6">
              <div class="features-item-two">
                <div class="features-img-two">
                  <img src={`assets/img/images/${feature.image}`} alt="" />
                </div>
                <div class="features-content-two">
                  <h2 class="title">{feature.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminAnalytic;
