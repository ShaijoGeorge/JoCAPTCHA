import React from "react";

function StartScreen({ setScreen }) {
    return (
        <div className="captcha-box">
            <div className="captcha-header">
                <span>JoCAPTCHA</span>
                <span>v0.1.0</span>
            </div>

            <div className="captcha-logo">LOGO</div>

            <h3>I’m Not a Robot</h3>

            <button className="captcha-btn" onClick={() => setScreen("challenge")}>
                Start Verification
            </button>
        </div>
  );
}

export default StartScreen;