import React, { useState } from "react";
import { LinkedInEmbed } from "react-social-media-embed";

const linkedin = ({ handleClick, user }) => {
  return (
    <>
      {user.linkedInUrl ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LinkedInEmbed url={user.linkedInUrl} width={325} height={424} />
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

export default linkedin;
