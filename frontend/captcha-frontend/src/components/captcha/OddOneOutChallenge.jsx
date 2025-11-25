import { useState } from "react";

export default function OddOneOutChallenge({ data, onSelect }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSelect = (idx) => {
        setSelectedIndex(idx);
        onSelect(idx); // Send answer back to parent
    };

    // Ensure data.images exists
    const images = data?.images || [];

    return (
        <div className ="grid grid-cols-3 gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {images.map((img, idx) => (
                <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`relative aspect-square rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden bg-white border-2
                        ${selectedIndex === idx 
                        ? "border-indigo-600 ring-2 ring-indigo-100 scale-[0.98]" 
                        : "border-transparent hover:scale-[1.02]"}`}
                >
                    <img 
                        src={img} 
                        alt={`Option ${idx}`} 
                        className="w-full h-full object-contain p-2" 
                        draggable="false"
                    />
                </button>
            ))}
        </div>
    );
}