import React from "react";

function FailureScreen({ setScreen, reason }) {
  return (
    <div className="captcha-box screen-fade">
        <div className="captcha-box">
            <div className="captcha-header">
                <span>JoCAPTCHA</span>
                <span>v0.1.0</span>
            </div>

            <div className="captcha-icon failure">✖</div>

            <h3>Verification Failed</h3>
            <p>{reason}</p>

            <button className="captcha-btn" onClick={() => setScreen("start")}>
                New Challenge
            </button>
        </div>
    </div>
  );
}

export default FailureScreen;