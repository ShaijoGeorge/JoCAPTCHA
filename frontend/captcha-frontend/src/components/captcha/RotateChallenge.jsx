import { useState } from "react";
import { RotateCw } from "lucide-react";

export default function RotateChallenge({ data, onUpdate }) {
    // Start with the random angle from server
    const [angle, setAngle] = useState(data?.start_angle || 0);

    const handleChange = (e) => {
        const newAngle = parseInt(e.target.value, 10);
        setAngle(newAngle);
        // Send the current angle back to parent
        onUpdate(newAngle);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6 py-4 bg-slate-50 rounded-xl border border-slate-200">
        
            {/* Rotatable Image Container */}
            <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-inner border border-slate-200 overflow-hidden">
                <img 
                src={data?.image} 
                alt="Rotate me" 
                className="w-28 h-28 object-contain transition-transform duration-75 ease-out"
                style={{ transform: `rotate(${angle}deg)` }}
                draggable="false"
                />
                
                {/* Helper visual: A small notch at the top to indicate "Up" */}
                <div className="absolute top-2 w-1 h-2 bg-slate-300 rounded-full"></div>
            </div>

            {/* Slider Control */}
            <div className="w-full px-6 space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
                    <span>Rotate</span>
                    <span>{angle}°</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
                <div className="flex justify-center text-xs text-slate-400 pt-1">
                    <RotateCw className="w-3 h-3 mr-1" />
                    <span>Make the image upright</span>
                </div>
            </div>
        </div>
    );
}