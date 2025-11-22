import React from "react";

function ChallengeScreen({ setScreen }) {
  return (
    <div className="captcha-box">
      <div className="captcha-header">
        <span>JoCAPTCHA</span>
        <span>v0.1.0</span>
      </div>

      <p>Description of challenge will go here...</p>

      <div className="captcha-content-box">Challenge content</div>

      <button className="captcha-btn" onClick={() => setScreen("success")}>
        Verify (demo)
      </button>
    </div>
  );
}

export default ChallengeScreen;