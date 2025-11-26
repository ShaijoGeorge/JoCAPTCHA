import { useState, useEffect } from "react";
import { Settings, Save, Loader2, CheckCircle } from "lucide-react";
import { getSettings, saveSettings } from "../../services/captchaApi";

export default function PlaygroundPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    
    // State for settings
    const [difficulty, setDifficulty] = useState(50);
    const [enabledTypes, setEnabledTypes] = useState([]);

    // Load settings on mount
    useEffect(() => {
        async function load() {
            try {
                const data = await getSettings();
                setDifficulty(data.difficulty);
                setEnabledTypes(data.enabled_types);
            } catch (err) {
                console.error("Failed to load settings", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleToggle = (type) => {
        setEnabledTypes((prev) => 
        prev.includes(type) 
            ? prev.filter((t) => t !== type) 
            : [...prev, type]
        );
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccessMsg("");
        try {
            await saveSettings({ difficulty, enabled_types: enabledTypes });
            setSuccessMsg("Settings saved successfully!");
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            alert("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-slate-500">Loading configuration...</div>;

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
                        <span className="text-xs font-mono bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                            {difficulty}%
                        </span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={difficulty}
                        onChange={(e) => setDifficulty(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                    />
                    <p className="text-xs text-slate-400">Adjusts complexity (e.g. rotation tolerance, image similarity).</p>
                </div>

                {/* Toggle Options */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700">Active Challenges</label>
                    
                    {[
                        { id: "odd_one_out", label: "Odd One Out", color: "bg-blue-500" },
                        { id: "drag_drop", label: "Drag & Drop", color: "bg-amber-500" },
                        { id: "rotate", label: "Rotate", color: "bg-emerald-500" }
                    ].map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                            <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${task.color}`}></div>
                                <span className="text-sm text-slate-600 font-medium">{task.label}</span>
                            </div>
                            <input 
                                type="checkbox" 
                                checked={enabledTypes.includes(task.id)}
                                onChange={() => handleToggle(task.id)}
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" 
                            />
                        </div>
                    ))}
                </div>

                {/* Save Button */}
                <div className="space-y-3">
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition flex items-center justify-center space-x-2"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>{saving ? "Saving..." : "Save Configuration"}</span>
                    </button>
                
                    {successMsg && (
                        <div className="flex items-center justify-center space-x-2 text-emerald-600 text-sm bg-emerald-50 p-2 rounded-lg animate-in fade-in">
                            <CheckCircle className="w-4 h-4" />
                            <span>{successMsg}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}