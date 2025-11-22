import React from "react";
import { generateChallenge } from "../../services/api";

function StartScreen({ setScreen, setChallengeData, setLoading }) {
    async function start() {
        const data = await generateChallenge();
        setChallengeData(data);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setScreen("challenge");
        }, 500); // small delay for animation feel
    }

    return (
        <div className="captcha-box screen-fade">
            <div className="captcha-box">
                <div className="captcha-header">
                    <span>JoCAPTCHA</span>
                    <span>v0.1.0</span>
                </div>

                <div className="captcha-logo">LOGO</div>

                <h3>I’m Not a Robot</h3>

                <button className="captcha-btn" onClick={start}>
                    Start Verification
                </button>
            </div>
        </div>
  );
}

export default StartScreen;