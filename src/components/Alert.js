import React, { useEffect, useState } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    setSlideIn(true);

    const timeout = setTimeout(() => {
      setSlideIn(false);
      setTimeout(() => {
        removeAlert();
      }, 500);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [list, removeAlert]);

  const bgColor = type === "danger" ? "bg-red-400" : "bg-green-400";

  return (
    <div
      className={`fixed bottom-5 right-0 p-4 rounded-s-md text-white z-10 ${bgColor} transition-all duration-500 transform ${
        slideIn ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "250px" }}
    >
      {msg}
    </div>
  );
};

export default Alert;
