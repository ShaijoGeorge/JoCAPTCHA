import React, { useEffect, useState } from "react";
import { verifyChallenge, BASE_URL } from "../../services/api";
import TimerCircle from "../TimerCircle";

function ChallengeScreen({ challengeData, setScreen, setFailureReason}) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(challengeData.timeout || 20);

    const startTime = Date.now();

    // TIMER EFFECT
    useEffect(() => {
        const interval = setInterval(() => {
        setSecondsLeft((prev) => {
            if (prev <= 1) {
                clearInterval(interval);
                expireChallenge();
                return 0;
            }
            return prev - 1;
        });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function expireChallenge() {
        setFailureReason("Challenge timed out.");
        setScreen("failure");
    }

    async function verify() {
        if (secondsLeft <= 0) {
            expireChallenge();
            return;
        }

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

                {/* TIMER CIRCLE */}
                <TimerCircle secondsLeft={secondsLeft} total={challengeData.timeout} />
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
                                objectFit: "cover",
                                opacity: secondsLeft > 0 ? 1 : 0.5,
                            }}
                        />
                    ))
                }
            </div>

            <button className="captcha-btn"
                onClick={verify}
                disabled={secondsLeft <= 0}
                style={{
                    background: secondsLeft <= 0 ? "#888" : "#2979ff",
                    cursor: secondsLeft <= 0 ? "not-allowed" : "pointer",
                }}
            >
                {secondsLeft > 0 ? "Verify" : "Expired"}
            </button>
        </div>
    );
}

export default ChallengeScreen;