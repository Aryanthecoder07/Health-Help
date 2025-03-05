import React, { useState, useEffect, useRef } from "react";

function Timer() {
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSec((prevSec) => {
                    if (prevSec === 59) {
                        setMin((prevMin) => prevMin + 1);
                        return 0;
                    }
                    return prevSec + 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const togglePlayPause = () => {
        setIsRunning(!isRunning);
    };

    const handleStop = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setSec(0);
        setMin(0);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold">Timer</h1>
            <p className="text-lg">
                {String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
            </p>
            
            <div className="space-x-4">
                <button
                    onClick={togglePlayPause}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    {isRunning ? "Pause" : "Play"}
                </button>

                <button
                    onClick={handleStop}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    {isRunning || sec > 0 || min > 0 ? "Stop" : "Start"}
                </button>
            </div>
        </div>
    );
}

export default Timer;
