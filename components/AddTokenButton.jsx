import React from "react";
import { addTNTCTokenToMetaMask } from "../context/constants"; // Make sure the path is correct

const AddTokenButton = () => {
  const handleAddToken = async () => {
    const result = await addTNTCTokenToMetaMask();
    alert(result); // You can replace this with a more elegant notification system if needed
  };

  return (
    <button className="btn btn-two" onClick={handleAddToken}>
      Add TNTC to Wallet
    </button>
  );
};

export default AddTokenButton;
