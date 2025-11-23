import { useState } from "react";
import { UserCheck, Clock, ShieldCheck, Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function CaptchaShell() {
    const [status, setStatus] = useState("idle"); // idle > loading > challenge > verifying > success/failure
  
    // TEMP FAKE DATA (will connect to fastapi later)
    const fakeChallenge = {
        prompt: "Tap the image that does NOT belong.",
        images: [
            "https://plaacekitten.com/90/90",
            "https://plaacekitten.com/91/91",
            "https://plaacekitten.com/92/92",
            "https://plaacekitten.com/93/93",
            "https://plaacekitten.com/94/94",
        ],
    };

    const startChallenge = () => {
        setStatus("loading");

        setTimeout(() => {
            setStatus("challenge");
        }, 900);
    };

    const finishVerification = (success) => {
        setStatus(success ? "success" : "failure");
    }

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
                            Complete a simple challenge designed to be easy for humans but difficult for bots.
                        </p>

                        <button
                            onClick={startChallenge}
                            className="w=full mt-2 inline-flex items-center justify-center px-4 py-2.5
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
                    <div>
                        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                        <p className="mt-3 text-sm text-slate-600">
                            Generating challenge...
                        </p>
                    </div>
                );
            case "challenge":
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b">
                            <p className="text-sm text-slate-600 font-medium flex items-center">
                                <ShieldCheck className= "h-4 w-4 mr-2 text-indigo-500" />
                                {fakeChallenge.prompt}
                            </p>
                            <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                                <Clock className="h-3 w-3 inline mr-1" /> 20s
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 rounded-xl border">
                            {fakeChallenge.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => finishVerification(idx === 1)} // TEMP: only img #1 is correct
                                    className="rounded-lg shadow-sm hover:shadow-md transition overflow-hidden bg-white"
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case "success":
                return (
                <div className="py-10 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                    <h3 className="text-lg font-bold text-green-600 mt-3">Verification Complete</h3>
                    <p className="text-sm text-slate-500 mt-1">You are verified as human.</p>
                </div>
            );
            case "failure":
                return (
                    <div className="py-10 text-center">
                        <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                        <h3 className="text-lg font-bold text-red-600 mt-3">Verification Failed</h3>
                        <p className="text-sm text-slate-500 mt-1">Try again with a new challenge.</p>

                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2.5 
                                        rounded-xl bg-indigo-600 text-white text-sm font-semibold
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
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-5 w-full">
            {renderScreen()}
        </div>
    );
}
