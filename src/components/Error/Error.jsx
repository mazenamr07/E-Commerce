import React from "react";
import errorImg from "../../assets/images/error.svg";

export default function Error() {
  return (
    <div className="flex items-center justify-center">
      <img src={errorImg} className="w-[50%]" alt="error_msg" />
    </div>
  );
}
