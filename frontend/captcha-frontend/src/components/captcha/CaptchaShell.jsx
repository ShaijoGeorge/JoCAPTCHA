import { UserCheck, Clock, ShieldCheck } from "lucide-react";

export default function CaptchaShell() {
  return (
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
                            Human Verification
                        </p>
                        <h2 className="text-xl font-bold text-slate-900 mt-1">
                            I&apos;m not a robot
                        </h2>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                        <UserCheck className="h-5 w-5 text-indigo-600" />
                    </div>
                </div>

                {/* Description / Hint */}
                <p className="text-sm text-slate-500 leading-relaxed">
                    To continue, complete a quick micro-task challenge designed to be
                    easy for humans, but difficult for bots.
                </p>

                {/* Status strip */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 text-slate-500">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span>Context-aware verification</span>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-500">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>~10s to complete</span>
                    </div>
                </div>

                {/* Main button (for now just visual) */}
                <button
                    type="button"
                    className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 
                            rounded-xl bg-indigo-600 text-white text-sm font-semibold
                            shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Start verification
                </button>

                {/* Footer text */}
                <p className="text-[11px] text-slate-400 text-center pt-1">
                    JoCAPTCHA project &mdash; built with FastAPI + Redis + React.
                </p>
            </div>
        </div>
    );
}
