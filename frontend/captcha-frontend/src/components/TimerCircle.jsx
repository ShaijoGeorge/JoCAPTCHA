import React from 'react';

function TimerCircle({ secondsLeft, total }) {
    const percent = (secondsLeft / total) * 100;

    return (
        <div 
            style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "2.5px solid #2979ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "#2979ff",
                background: "#f8faff",
            }}
        >
            {secondsLeft}
        </div>
    );
}

export default TimerCircle;