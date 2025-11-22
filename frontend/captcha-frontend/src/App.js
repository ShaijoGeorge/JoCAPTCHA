import React from "react";
import CaptchaWidget from "./components/CaptchaWidget";
import "./styles/captcha.css";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      <CaptchaWidget />
    </div>
  );
}

export default App;
