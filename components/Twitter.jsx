import React, { useState } from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

const Twitter = ({ handleClick, user }) => {
  return (
    <>
      {user.twitterId ? (
        <TwitterTweetEmbed tweetId={user?.twitterId} />
      ) : (
        <div class="input-group-new">
          <label class="label-new">Post ID</label>
          <input onChange={handleClick} class="input-new" type="text" />
          <div></div>
        </div>
      )}

      {/* <div className="custom-width ">
        <img src="token.png" alt="" />
        <h4>Kindly do the following steps:</h4>
        <TwitterShareButton
          url={"https://twitter.com/TheBCoders/status/1753257564899545178/"}
          options={{ text: "Limited airdrop", via: "TheBCoders", height: 400 }}
        />
        <TwitterFollowButton screenName={"TheBCoders"} />
        <TwitterHashtagButton tag={"TheBCoders"} />
      </div> */}
    </>
  );
};

export default Twitter;
