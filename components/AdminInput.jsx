import React from "react";

const AdminInput = ({ handleClick, name, placeholder }) => {
  return (
    <div class="input-group-new">
      <label class="label-new">{name}</label>
      <input
        onChange={handleClick}
        placeholder={placeholder}
        class="input-new"
        type="text"
      />
      <div></div>
    </div>
  );
};

export default AdminInput;
