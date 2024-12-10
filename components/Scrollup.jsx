import React from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";

const Scrollup = () => {
  return (
    <button class="scroll-top scroll-to-target" data-target="html">
      <FaArrowUpFromBracket />
    </button>
  );
};

export default Scrollup;
