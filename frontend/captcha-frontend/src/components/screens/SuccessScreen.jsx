import React from "react";

function SuccessScreen({ setScreen }) {
  return (
    <div className="captcha-box">
      <div className="captcha-header">
        <span>JoCAPTCHA</span>
        <span>v0.1.0</span>
      </div>

      <div className="captcha-icon success">✔</div>

      <h3>Verification Complete</h3>

      <button className="captcha-btn" onClick={() => setScreen("start")}>
        Test Again
      </button>
    </div>
  );
}

export default SuccessScreen;