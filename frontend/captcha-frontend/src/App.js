import { useState } from "react";
import React from "react";
import Navbar from "./components/layout/Navbar";
import CaptchaShell from "./components/captcha/CaptchaShell";
import DebugPanel from "./components/layout/DebugPanel";
import DocsPage from "./components/pages/DocsPage";
import PlaygroundPage from "./components/pages/PlaygroundPage";

function App() {
  const [verificationResult, setVerificationResult] = useState(null);
  const [page, setPage] = useState("demo"); // 'demo' | 'docs' | 'playground'

  const handleVerificationComplete = (result) => {
    console.log("Verification result:", result);
    setVerificationResult(result);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <Navbar currentPage={page} setPage={setPage}/>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Routing Logic */}
        {page === "demo" && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start animate-in fade-in duration-300">
            
            {/* Left: CAPTCHA Widget */}
            <div className="flex flex-col items-center space-y-4">
              <CaptchaShell onVerificationComplete={handleVerificationComplete} />

              <p className="text-xs text-slate-400 text-center max-w-xs leading-relaxed">
                Interact with the widget to see behavioral analysis events in the console.
              </p>
            </div>

            {/* Right: Debug Panel */}
            <DebugPanel result={verificationResult} />
          </div>
        )}

        {page === "docs" && <DocsPage />}

        {page === "playground" && <PlaygroundPage setPage={setPage} />}

      </main>
    </div>
  );
}

export default App;
