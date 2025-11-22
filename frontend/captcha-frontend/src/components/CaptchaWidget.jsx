import React, { useState } from "react";
import StartScreen from "./screens/StartScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import SuccessScreen from "./screens/SuccessScreen";
import FailureScreen from "./screens/FailureScreen";
import Loader from "./Loader";

function CaptchaWidget() {
    const [screen, setScreen] = useState("start");
    const [loading, setLoading] = useState(false);
    const [challengeData, setChallengeData] = useState(null);
    const [failureReason, setFailureReason] = useState("");

    return (
        <div className="captcha-container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {screen === "start" && (
                        <StartScreen setScreen={setScreen} setChallengeData={setChallengeData} setLoading={setLoading}/>
                    )}

                    {screen === "challenge" && (
                        <ChallengeScreen
                            challengeData={challengeData}
                            setScreen={setScreen}
                            setFailureReason={setFailureReason}
                        />
                    )}

                    {screen === "success" && <SuccessScreen setScreen={setScreen} />}

                    {screen === "failure" && (
                        <FailureScreen setScreen={setScreen} reason={failureReason} />
                    )}
                </>
            )}
        </div>
    );
}

export default CaptchaWidget;