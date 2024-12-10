import React, { useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";

const Instagram = ({ handleClick, user }) => {
  return (
    <>
      {user.instagramUrl ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InstagramEmbed url={user.instagramUrl} width={325} height={424} />
        </div>
      ) : (
        <div class="input-group-new">
          <label class="label-new">Post Url</label>
          <input onChange={handleClick} class="input-new" type="text" />
          <div></div>
        </div>
      )}
    </>
  );
};

export default Instagram;
