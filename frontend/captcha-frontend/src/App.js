import React from "react";
import Navbar from "./components/layout/Navbar";
import CaptchaShell from "./components/captcha/CaptchaShell";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
          {/* Left: Widget card */}
          <CaptchaShell />

          {/* Right: Placeholder panel */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">
              Verification result (debug)
            </h3>
            <p className="text-sm text-slate-500">
              upcoming steps, this panel show:
            </p>
            <ul className="mt-2 text-xs text-slate-500 space-y-1 list-disc list-inside">
              <li>Last verification status (success/failure)</li>
              <li>Reason (time limit, wrong answer, etc.)</li>
              <li>Example API payload to FastAPI backend</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
