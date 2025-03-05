import React, { useState } from "react";
import axios from "axios";

function Goalbased() {
    const [Exer, setExer] = useState("all");
    const [Weight, setWeight] = useState("");
    const [Age, setAge] = useState("");
    const [Btar, setBtar] = useState("");
    const [response, setResponse] = useState("");

    const API_KEY = "AIzaSyBGSa3Y5c2ZKB-tNcS15Y9P87TL0njY_Do"; // Replace with actual API key

    const targetAreas = ["chest", "back", "legs", "arms", "shoulders", "core", "glutes", "biceps", "triceps"];

    async function getres() {
        if (!Weight || !Age || !Btar) {
            setResponse("Please enter valid Age, Weight, and Calories to burn.");
            return;
        }

        let prompt = "";

        if (Exer === "all") {
            prompt = `Suggest a full-body workout plan for a ${Age}-year-old individual weighing ${Weight}kg who wants to burn ${Btar} kcal. Include 5 exercises covering major muscle groups and the approximate calories burned per exercise.`;
        } else if (targetAreas.includes(Exer.toLowerCase())) {
            prompt = `Recommend 5 exercises specifically targeting the ${Exer} for a ${Age}-year-old weighing ${Weight}kg. Ensure the workout burns around ${Btar} kcal. Provide estimated calories burned per exercise.`;
        } else {
            prompt = `Provide details about the exercise "${Exer}" for a ${Age}-year-old weighing ${Weight}kg. Include benefits, how to perform it, and kcal burned per set.`;
        }

        try {
            const res = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                { contents: [{ parts: [{ text: prompt }] }] }
            );

            const responseText = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

            const formattedResponse = responseText
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold formatting
                .replace(/\n/g, "<br>"); // Line breaks

            setResponse(formattedResponse);
        } catch (error) {
            console.error("Error fetching response:", error);
            setResponse("Failed to fetch exercises. Try again!");
        }
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold">Goal-Based Workout Planner</h2>

            {/* Target Body Part Dropdown */}
            <select 
                value={Exer} 
                onChange={(e) => setExer(e.target.value)} 
                className="px-3 py-2 border rounded-md w-full max-w-md bg-transparent"
            >
                <option value="all">Full Body</option>
                {targetAreas.map((area) => (
                    <option key={area} value={area}>{area.charAt(0).toUpperCase() + area.slice(1)}</option>
                ))}
            </select>

            {/* User Inputs */}
            <input
                type="number"
                value={Weight}
                placeholder="Enter your weight (kg)"
                onChange={(e) => setWeight(e.target.value)}
                className="px-3 py-2 border rounded-md w-full max-w-md bg-transparent placeholder-gray-500"
            />

            <input
                type="number"
                value={Age}
                placeholder="Enter your age"
                onChange={(e) => setAge(e.target.value)}
                className="px-3 py-2 border rounded-md w-full max-w-md bg-transparent placeholder-gray-500"
            />

            <input
                type="number"
                value={Btar}
                placeholder="Kcal to Burn"
                onChange={(e) => setBtar(e.target.value)}
                className="px-3 py-2 border rounded-md w-full max-w-md bg-transparent placeholder-gray-500"
            />

            {/* Get Workout Plan Button */}
            <button
                onClick={getres}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Get Workout Plan
            </button>

            {/* Display Response */}
            {response && (
                <div className="mt-4 text-left" 
                     dangerouslySetInnerHTML={{ __html: response }}>
                </div>
            )}
        </div>
    );
}

export default Goalbased;
