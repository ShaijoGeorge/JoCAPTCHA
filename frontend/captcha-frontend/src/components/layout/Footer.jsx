import { Heart, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-8 text-slate-400 text-sm animate-in fade-in duration-700">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
            
            {/* Left: Copyright */}
            <div className="text-center md:text-left">
                <p className="font-semibold text-slate-600">JoCAPTCHA</p>
                <p className="text-xs mt-1 opacity-75">
                    &copy; {new Date().getFullYear()} Open Source
                </p>
            </div>

            {/* Center: Credits */}
            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-250">
                <span className="opacity-75">Created by</span>
                <span className="text-indigo-600 font-bold">Shaijo George</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse ml-1" />
            </div>

            {/* Right: GitHub Link */}
            <a 
            href="https://github.com/shaijogeorge/jocaptcha" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-600 transition-colors group"
            >
                <span className="hidden md:inline text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                    View Source
                </span>
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                    <Github className="w-5 h-5" />
                </div>
            </a>

        </div>
        </footer>
    );
}