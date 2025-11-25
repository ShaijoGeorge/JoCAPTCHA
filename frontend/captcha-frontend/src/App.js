import { useState } from "react";
import React from "react";
import Navbar from "./components/layout/Navbar";
import CaptchaShell from "./components/captcha/CaptchaShell";
import DebugPanel from "./components/layout/DebugPanel";

function App() {
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerificationComplete = (result) => {
    console.log("Verification result:", result);
    setVerificationResult(result);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
          {/* Left: Widget card */}
          <CaptchaShell onVerificationComplete={handleVerificationComplete} />

          {/* Right: Live Debug Panel */}
          <DebugPanel result={verificationResult} />

        </div>
      </main>
    </div>
  );
}

export default App;
