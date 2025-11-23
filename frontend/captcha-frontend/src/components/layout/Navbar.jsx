import { ShieldCheck, Settings } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Left: Logo + Title */}
                <div className="flex items-center space-x-2">
                    <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
                        <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
                            Human Verification
                        </span>
                        <span className="text-base font-bold text-slate-900">
                            JoCAPTCHA Demo
                        </span>
                    </div>
                </div>

                {/* Right: Simple nav buttons (static for now) */}
                <div className="hidden sm:flex items-center space-x-4 text-sm">
                    <button className="px-3 py-1 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition">
                        Demo
                    </button>
                    <button className="px-3 py-1 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition">
                        Docs
                    </button>
                    <button className="px-3 py-1 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center space-x-1">
                        <Settings className="h-4 w-4" />
                        <span>Playground</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
