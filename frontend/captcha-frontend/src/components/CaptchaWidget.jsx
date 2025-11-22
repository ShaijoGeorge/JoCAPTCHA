import React, { useState } from "react";
import StartScreen from "./screens/StartScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import SuccessScreen from "./screens/SuccessScreen";
import FailureScreen from "./screens/FailureScreen";

function CaptchaWidget() {
    const [screen, setScreen] = useState("start");
    const [challengeData, setChallengeData] = useState(null);
    const [failureReason, setFailureReason] = useState("");

    return (
        <div className="captcha-widget">
            {screen === "start" && <StartScreen setScreen={setScreen} />}
            {screen === "challenge" && <ChallengeScreen setScreen={setScreen} challengeData={challengeData} />}
            {screen === "success" && <SuccessScreen setScreen={setScreen} />}
            {screen === "failure" && <FailureScreen setScreen={setScreen} reason={failureReason} />}
        </div>
    );
}

export default CaptchaWidget;