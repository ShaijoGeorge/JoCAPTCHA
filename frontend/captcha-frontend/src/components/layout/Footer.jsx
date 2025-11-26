import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full text-center py-6 text-slate-400 text-sm animate-in fade-in duration-700">
        <p className="flex items-center justify-center gap-1">
            Created by <span className="text-slate-600 font-semibold">Shaijo George</span>
        </p>
        <p className="text-xs mt-1 opacity-75">
            &copy; {new Date().getFullYear()} JoCAPTCHA Project
        </p>
        </footer>
    );
}