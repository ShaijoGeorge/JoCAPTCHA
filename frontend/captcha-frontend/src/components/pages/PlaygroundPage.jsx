import { Settings, Sliders } from "lucide-react";

export default function PlaygroundPage() {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Admin Playground</h2>
                    <p className="text-sm text-slate-500">Configure global CAPTCHA parameters.</p>
                </div>
            </div>
        
            <div className="p-8 space-y-8">
                
                {/* Difficulty Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="text-sm font-bold text-slate-700">Difficulty Level</label>
                        <span className="text-xs font-mono bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Medium</span>
                    </div>
                    <input type="range" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    <p className="text-xs text-slate-400">Adjusts the complexity of rotation angles and image similarity.</p>
                </div>

                {/* Toggle Options */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700">Active Challenges</label>
                
                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-slate-600 font-medium">Odd One Out</span>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle-checkbox" />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-slate-600 font-medium">Drag & Drop</span>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle-checkbox" />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-slate-600 font-medium">Rotate</span>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle-checkbox" />
                    </div>
                </div>

                <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition">
                    Save Configuration
                </button>

            </div>
        </div>
    );
}