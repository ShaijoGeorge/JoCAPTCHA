import { Terminal, Database, Shield, Activity } from "lucide-react";

export default function DebugPanel({ events, result }) {
    return (
        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col h-full min-h-[500px]">
            {/* Header */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-200 text-sm font-mono font-bold">Developer Console</span>
                </div>
                <div className="flex space-x-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                </div>
            </div>

        {/* Content Area */}
        <div className="p-5 space-y-6 overflow-y-auto custom-scrollbar font-mono text-xs">
            
            {/* Section 1: Live Status */}
            <div className="space-y-2">
                <div className="flex items-center text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    <Activity className="h-3 w-3 mr-1" /> System Status
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-800 p-2 rounded border border-slate-700 text-slate-300">
                        <span className="text-slate-500 block">Backend</span>
                        <span className="text-emerald-400">Online (FastAPI)</span>
                    </div>
                    <div className="bg-slate-800 p-2 rounded border border-slate-700 text-slate-300">
                        <span className="text-slate-500 block">Latency</span>
                        <span className="text-blue-400">~24ms</span>
                    </div>
                </div>
            </div>

            {/* Section 2: Last API Response */}
            <div className="space-y-2">
                <div className="flex items-center text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    <Database className="h-3 w-3 mr-1" /> API Response Payload
                </div>
                <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 relative group">
                    {result ? (
                        <pre className={`text-[10px] leading-relaxed whitespace-pre-wrap ${result.success ? 'text-emerald-300' : 'text-red-300'}`}>
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    ) : (
                        <span className="text-slate-600 italic">Waiting for verification...</span>
                    )}
                </div>
            </div>

            {/* Section 3: Security Token */}
            {result?.success && (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                        <Shield className="h-3 w-3 mr-1" /> Generated Token (JWT)
                    </div>
                    <div className="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded-lg break-all text-emerald-400/80">
                        {result.token}
                    </div>
                    <p className="text-slate-500 italic">
                        * This token is cryptographically signed by the backend and required for subsequent protected API calls.
                    </p>
                </div>
            )}

        </div>
        </div>
    );
}