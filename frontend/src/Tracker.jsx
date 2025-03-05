import React, { useState } from "react";

function Tracker() {
    const [targetMuscle, setTargetMuscle] = useState("");
    const [kcalBurnt, setKcalBurnt] = useState("");
    const [timeSpent, setTimeSpent] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (!targetMuscle || !kcalBurnt || !timeSpent) {
            setMessage("⚠️ Please fill all fields before submitting!");
            return;
        }

        const email = localStorage.getItem("email"); // Get user email from local storage
        if (!email) {
            setMessage("⚠️ No user logged in. Please log in first.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    exer: targetMuscle,
                    kcal: parseInt(kcalBurnt),
                    time: parseInt(timeSpent),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("✅ Workout logged successfully!");
            } else {
                setMessage(`⚠️ ${data.message || "Error logging workout"}`);
            }
        } catch (error) {
            setMessage("⚠️ Server error. Try again later.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="shadow-lg rounded-lg p-6 w-full max-w-md border border-gray-300">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">Track Your Workout</h1>
                
                <label className="block text-gray-600 font-medium mb-1">Target Muscle</label>
                <select 
                    value={targetMuscle} 
                    onChange={(e) => setTargetMuscle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none mb-3"
                >
                    <option value="">Select Target Muscle</option>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Arms">Arms</option>
                    <option value="Legs">Legs</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Core">Core</option>
                    <option value="Full Body">Full Body</option>
                </select>

                <label className="block text-gray-600 font-medium mb-1">Kcal Burnt</label>
                <input 
                    type="number" 
                    placeholder="Enter kcal burnt" 
                    value={kcalBurnt} 
                    onChange={(e) => setKcalBurnt(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none mb-3"
                />

                <label className="block text-gray-600 font-medium mb-1">Time Spent (mins)</label>
                <input 
                    type="number" 
                    placeholder="Enter time spent (mins)" 
                    value={timeSpent} 
                    onChange={(e) => setTimeSpent(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none mb-4"
                />

                <button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    Submit
                </button>

                {message && <p className="text-green-600 text-center mt-3 font-medium">{message}</p>}
            </div>
        </div>
    );
}

export default Tracker;
