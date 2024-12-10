import React, { useState, useEffect } from "react";

const Follow = ({ name, handleClick }) => {
  return (
    <div class="input-group-new">
      <label class="label-new">{name}</label>
      <input
        autocomplete="off"
        onChange={handleClick}
        name={name}
        id="Email"
        class="input-new"
        type="text"
      />
      <div></div>
    </div>
  );
};

export default Follow;
