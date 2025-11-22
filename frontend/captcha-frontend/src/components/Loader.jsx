import React from "react";

function Loader() {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "4px solid #d0d0d0",
        borderTopColor: "#2979ff",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        margin: "20px auto",
      }}
    />
  );
}

export default Loader;