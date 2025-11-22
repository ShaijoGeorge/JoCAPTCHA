import React from 'react';

function TimerCircle({ secondsLeft, total }) {
    const percent = (secondsLeft / total) * 100;

    return (
        <div 
            style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '3px solid #2979ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: "#2979ff",
            }}
        >
            {secondsLeft}
        </div>
    );
}

export default TimerCircle;