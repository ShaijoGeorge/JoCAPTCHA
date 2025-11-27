import { Server, Shield, Database, Layout } from "lucide-react";

export default function DocsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-3 sm:space-y-4 px-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">System Architecture</h1>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                    How JoCaptcha secures applications using behavioral analysis and multi-modal challenges.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Card 1 */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                        <Layout className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Frontend (React)</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Renders the CAPTCHA widget and handles physics interactions (Drag & Drop, Rotation). 
                        Collects behavioral data (mouse path, timing) and sends it securely to the backend.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                        <Server className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Backend (FastAPI)</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Stateless API that generates cryptographically secure challenge payloads. 
                        Validates answers against Redis storage and issues signed JWT tokens upon success.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                        <Database className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Redis Store</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Stores ephemeral challenge state with a strict Time-To-Live (TTL). 
                        Prevents replay attacks by invalidating Challenge IDs immediately after verification attempts.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Security Logic</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Implements rate limiting, token signatures, and anti-bot heuristics 
                        (e.g., rejecting submissions that are "too fast" for a human to perform).
                    </p>
                </div>
            </div>
        </div>
    );
}