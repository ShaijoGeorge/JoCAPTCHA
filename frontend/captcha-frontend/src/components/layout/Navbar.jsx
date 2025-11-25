import { ShieldCheck, Settings, FileText, PlayCircle } from "lucide-react";

export default function Navbar({ currentPage, setPage }) {

    const navBtnClass = (pageName) => 
        `px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center space-x-1.5 ${
            currentPage === pageName 
                ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Left: Logo + Title */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setPage("demo")}>
                    <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
                        <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase">
                            Human Verification
                        </span>
                        <span className="text-base font-bold text-slate-900 leading-none">
                            JoCAPTCHA
                        </span>
                    </div>
                </div>

                {/* Right: Nav buttons */}
                <div className="flex items-center space-x-2">
                    <button onClick={() => setPage("demo")} className={navBtnClass("demo")}>
                        <PlayCircle className="w-4 h-4" />
                        <span>Demo</span>
                    </button>

                    <button onClick={() => setPage("docs")} className={navBtnClass("docs")}>
                        <FileText className="w-4 h-4" />
                        <span>Docs</span>
                    </button>

                    <button onClick={() => setPage("playground")} className={navBtnClass("playground")}>
                        <Settings className="h-4 w-4" />
                        <span>Playground</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
