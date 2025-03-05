import React, { useState } from "react";
import axios from "axios";

function Selfpaced() {
    const [Ques, setQues] = useState("");
    const [weight, setWeight] = useState(0);
    const [response, setResponse] = useState("");

    const API_KEY = "AIzaSyBGSa3Y5c2ZKB-tNcS15Y9P87TL0njY_Do";
    const targetAreas = ["chest", "back", "legs", "arms", "shoulders", "core", "glutes", "biceps", "triceps"];

    async function getres() {
        try {
            if (!Ques.trim()) {
                setResponse("⚠️ Please enter an exercise name or muscle group.");
                return;
            }

            let prompt = "";

            if (targetAreas.includes(Ques.toLowerCase())) {
                prompt = `List 5 effective exercises for targeting the ${Ques} muscles. For each exercise, also provide a search suggestion in this format: "Search on Health help: [Exercise Name]"`;
            } else {
                prompt = `Provide a detailed breakdown of the exercise "${Ques}". Include its benefits, step-by-step instructions on how to perform it, variations, and a recommendation to search "Health help: ${Ques}" for video demonstrations.`;
            }

            const res = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                {
                    contents: [{ parts: [{ text: prompt }] }],
                }
            );

            const responseText = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response received.";

            // Fix search term redundancy (keep only exercise names)
            const cleanedResponse = responseText.replace(/Search on Health help: .*?/g, (match) => {
                const words = match.split(" ");
                return `Search on Health help: ${words[words.length - 1]}`;
            });

            const formattedResponse = cleanedResponse
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")  // Bold formatting
                .replace(/\n/g, "<br>"); // Line breaks

            setResponse(formattedResponse);
        } catch (error) {
            console.error("Error fetching response:", error);
            setResponse("❌ Failed to fetch exercises. Try again!");
        }
    }

    return (
        <div className="flex flex-col items-center space-y-4 text-gray-800">
            <h2 className="text-xl font-semibold">Self-Paced Exercise Finder</h2>
            
            <input
                type="text"
                value={Ques}
                placeholder="Enter exercise name or target area"
                onChange={(e) => setQues(e.target.value)}
                className="px-3 py-2 border rounded-md w-full max-w-md"
            />

            <input
                type="number"
                value={weight}
                placeholder="Enter your weight (kg)"
                onChange={(e) => setWeight(e.target.value)}
                className="px-3 py-2 border rounded-md w-full max-w-md"
            />

            <button
                onClick={getres}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Get Exercises
            </button>

            {response && (
                <div className="mt-4 w-full max-w-md text-left leading-relaxed"
                     dangerouslySetInnerHTML={{ __html: response }}>
                </div>
            )}
        </div>
    );
}

export default Selfpaced;
