import { useState, useRef, useEffect } from "react";
import { Move } from "lucide-react";

export default function DragDropChallenge({ data, onPositionChange }) {
    const containerRef = useRef(null);
    const [position, setPosition] = useState({ x: 20, y: 20 }); // Start position
    const [isDragging, setIsDragging] = useState(false);

    // Extract target data (with defaults)
    const targetX = data?.target_x || 200;
    const targetY = data?.target_y || 100;
    const imageUrl = data?.image || "";
    
    // Handle dragging logic (Mouse + Touch)
    const handleMove = (clientX, clientY) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        // Keep within bounds (300x200 container)
        const x = Math.max(0, Math.min(offsetX, rect.width));
        const y = Math.max(0, Math.min(offsetY, rect.height));

        setPosition({ x, y });
        onPositionChange({ x, y }); // Send coordinates to parent
    };

    const onMouseMove = (e) => {
        if (isDragging) handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e) => {
        if (isDragging) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const stopDrag = () => setIsDragging(false);

    // Global event listeners for smooth dragging outside the box
    useEffect(() => {
        if (isDragging) {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", stopDrag);
        } else {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", stopDrag);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", stopDrag);
        }
        return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", stopDrag);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", stopDrag);
        };
    }, [isDragging]);

    return (
        <div 
        ref={containerRef}
        className="relative w-full h-[200px] bg-slate-100 rounded-xl border-2 border-slate-200 overflow-hidden shadow-inner"
        >
        {/* Target Zone (Circle) */}
        <div 
            className="absolute w-[60px] h-[60px] rounded-full border-2 border-dashed border-indigo-400 bg-indigo-50/50 flex items-center justify-center pointer-events-none"
            style={{ 
            left: targetX - 30, // Center the circle
            top: targetY - 30 
            }}
        >
            <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-50"></div>
        </div>

        {/* Draggable Item */}
        <div
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className={`absolute w-[50px] h-[50px] cursor-grab active:cursor-grabbing hover:scale-105 transition-transform
                        flex items-center justify-center
                        ${isDragging ? "scale-110 z-50" : "z-10"}`}
            style={{
            left: position.x - 25, // Center the item on cursor
            top: position.y - 25,
            }}
        >
            {/* Render Image or Icon */}
            {imageUrl ? (
            <img src={imageUrl} alt="drag-item" className="w-full h-full object-contain drop-shadow-lg" draggable="false" />
            ) : (
            <div className="w-full h-full bg-white rounded-full shadow-md border flex items-center justify-center">
                <Move className="w-5 h-5 text-slate-500" />
            </div>
            )}
        </div>

        <p className="absolute bottom-2 right-3 text-[10px] text-slate-400 pointer-events-none select-none">
            Drag object to target
        </p>
        </div>
    );
}