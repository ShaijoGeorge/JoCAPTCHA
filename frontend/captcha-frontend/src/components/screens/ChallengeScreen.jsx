import React, { useState } from "react";
import { verifyChallenge, BASE_URL } from "../../services/api";

function ChallengeScreen({ challengeData, setScreen, setFailureReason}) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const startTime = Date.now();

    async function verify() {
        if (selectedIndex === null) {
            alert("Please select an image.");
            return;
        }

        const timeTaken = Date.now() - startTime;

        const result = await verifyChallenge({
            challengeId: challengeData.challengeId,
            answer: selectedIndex,
            timeTaken: timeTaken
        });

        if (result.success) {
            setScreen("success");
        } else {
            setFailureReason(result.reason);
            setScreen("failure");
        }
    }

    return (
        <div className="captcha-box">
            <div className="captcha-header">
                <span>JoCAPTCHA</span>
                <span>v0.1.0</span>
            </div>

            <p>{challengeData.prompt}</p>

            <div className="captcha-content-box" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
                {
                    challengeData.images.map((img, index) => (
                        <img
                            key={index}
                            src={`${BASE_URL}${img}`}
                            alt=""
                            onClick={() => setSelectedIndex(index)}
                            style={{
                                width: "70px",
                                height: "70px",
                                border: selectedIndex === index ? "3px solid #2979ff" : "2px solid #ccc",
                                borderRadius: "5px",
                                cursor: "pointer",
                                objectFit: "cover"
                            }}
                        />
                    ))
                }
            </div>

            <button className="captcha-btn" onClick={verify}>
                Verify
            </button>
        </div>
    );
}

export default ChallengeScreen;