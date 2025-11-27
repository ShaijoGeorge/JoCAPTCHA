import { useState } from "react";
import { useEffect } from "react";
import { UserCheck, Clock, ShieldCheck, Loader2, CheckCircle2, XCircle, MousePointer2, RotateCw } from "lucide-react";
import { generateChallenge, verifyChallenge } from "../../services/captchaApi";
import OddOneOutChallenge from "./OddOneOutChallenge";
import DragDropChallenge from "./DragDropChallenge";
import RotateChallenge from "./RotateChallenge";

export default function CaptchaShell({ onVerificationComplete }) {
    const [status, setStatus] = useState("idle"); // idle > loading > challenge > verifying > success/failure
    const [challenge, setChallenge] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null); // Stores Index (int) OR Coordinates (obj)
    const [message, setMessage] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    // Timer Logic
    useEffect(() => {
        if (status !== "challenge") return;
        if (timeLeft === null) return;

        if (timeLeft === 0) {
            setMessage('Timeout');
            setStatus("failure");
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, status]);

    const startChallenge = async () => {
        setMessage('');
        setUserAnswer(null);
        setStatus("loading");

        try {
            const data =await generateChallenge(); // REAL backend call

            // Handle "error" from backend (e.g. empty folder)
            if (data.error) {
                console.error(data.error);
                setStatus("failure");
                return;
            }

            setChallenge(data); // store challenge data
            setStartTime(Date.now()); // Track start time
            setTimeLeft(data.timeout);
            setStatus("challenge");
        } catch (err) {
            console.error(err);
            setStatus("failure");
        }
    };

    const handleVerify = async () => {
        if (userAnswer === null) return;

        setStatus("verifying");

        const timeTaken = Date.now() - startTime;

        try {
            const result = await verifyChallenge({
                challengeId: challenge.challengeId,
                answer: userAnswer,
                timeTaken: timeTaken,
            });

            console.log("Verification result:", result);

            // Call parent callback with result
            if (onVerificationComplete) {
                onVerificationComplete(result);
            }

            if (result.success) {
                setStatus("success");
            } else {
                setMessage(result.reason || 'Incorrect');
                setStatus("failure");
            }
        } catch (error) {
            console.error("Verification error:", error);
            setStatus("failure");
            setMessage("Network error");
        }
    };

    const renderScreen = () => {
        switch (status) {
            case "idle":
                return (
                    <>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
                                    Human Verification
                                </p>
                                <h2 className="text-xl font-bold text-slate-900 mt-1">
                                    I'm not a robot
                                </h2>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                                <UserCheck className="h-5 w-5 text-indigo-600" />
                            </div>
                        </div>

                        <p className="text-sm text-slate-500 leading-relaxed">
                            Complete a quick security check to continue.
                        </p>

                        <button
                            onClick={startChallenge}
                            className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5
                                    rounded-xl bg-indigo-600 text-white text-sm font-semibold
                                    shadow-lg shadow-indigo-500/30 hover:bg-indigo-700
                                    transition"
                        >
                            Start verification
                        </button>
                    </>
                );
            case "loading":
                return (
                    <div className="py-10 flex flex-col items-center">
                        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                        <p className="mt-3 text-sm text-slate-600">
                            Generating challenge...
                        </p>
                    </div>
                );
            case "challenge":
                return (
                    <div className="space-y-4">
                    {/* Header Bar */}
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <p className="text-sm text-slate-600 font-medium flex items-center">
                                {challenge.type === 'odd_one_out' && <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />}
                                {challenge.type === 'drag_drop' && <MousePointer2 className="h-4 w-4 mr-2 text-indigo-500" />}
                                {challenge.type === 'rotate' && <RotateCw className="h-4 w-4 mr-2 text-indigo-500" />}
                                {challenge.prompt}
                            </p>
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center
                                ${timeLeft <= 5 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                <Clock className="h-3 w-3 inline mr-1" /> {timeLeft}s
                            </span>
                        </div>

                        {/* CHALLENGE RENDERER - Wrapped in overflow container for mobile safety */}
                        <div className="w-full overflow-x-auto pb-2">
                            {challenge.type === "odd_one_out" && (
                                <OddOneOutChallenge 
                                    data={challenge.data} 
                                    onSelect={(idx) => setUserAnswer(idx)} 
                                />
                            )}

                            {challenge.type === "drag_drop" && (
                                <DragDropChallenge 
                                    data={challenge.data} 
                                    onPositionChange={(coords) => setUserAnswer(coords)} 
                                />
                            )}

                        {challenge.type === "rotate" && (
                                <RotateChallenge 
                                    data={challenge.data} 
                                    onUpdate={(angle) => setUserAnswer(angle)} 
                                />
                            )}
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={userAnswer === null}
                            className={`w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 
                                    rounded-xl text-sm font-semibold transition shadow-md
                                    ${userAnswer !== null 
                                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30" 
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                        >
                            Submit Answer
                        </button>
                    </div>
                );
            case "verifying":
                return (
                    <div className="py-10 flex flex-col items-center">
                        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                        <p className="mt-3 text-sm text-slate-600">Checking your answer...</p>
                    </div>
                );
            case "success":
                return (
                    <div className="py-10 text-center animate-in fade-in zoom-in duration-300">
                        <div className="inline-flex bg-green-100 p-3 rounded-full mb-3">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Verified Successfully</h3>
                        <p className="text-sm text-slate-500 mt-1">You can now proceed.</p>
                        <button
                            onClick={() => {
                                setStatus("idle");
                                setMessage('');
                                setUserAnswer(null);
                            }}
                            className="mt-5 text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
                        >
                            Test Again
                        </button>
                    </div>
                );
            case "failure":
                return (
                    <div className="py-10 text-center animate-in fade-in zoom-in duration-300">
                        <div className="inline-flex bg-red-100 p-3 rounded-full mb-3">
                            <XCircle className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Verification Failed</h3>
                        <p className="text-sm text-slate-500 mt-1">{message}</p>

                        <button
                            onClick={() => {
                                setStatus("idle");
                                setMessage('');
                                setUserAnswer(null);
                            }}
                            className="mt-4 inline-flex items-center justify-center px-6 py-2 
                                        rounded-lg bg-indigo-600 text-white text-sm font-semibold
                                        shadow-md hover:bg-indigo-700 transition"
                        >
                            Try Again
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };
  
  
    return (
        <div className="w-full max-w-md">
            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 space-y-5 transition-all">
                
                {/* Version Badge - Top Right Corner */}
                <span className="absolute top-2 right-3 text-[10px] text-slate-400 font-mono select-none">
                    v0.1.0
                </span>

                {renderScreen()}
            </div>
        </div>
    );
}
