import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

const TrackCharts = () => {
    const [trackData, setTrackData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem("email"); // Get email from localStorage
            if (!email) return;

            try {
                const response = await fetch("https://health-help-1.onrender.com/get-track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();
                setTrackData(data);
            } catch (error) {
                console.error("Error fetching tracking data:", error);
            }
        };

        fetchData();
    }, []);

    // Format date to "3 March" format
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}`;
    };

    // Prepare data for charts
    const dates = trackData.map((entry) => formatDate(entry.date));
    const caloriesBurnt = trackData.map((entry) => entry.kcal);
    const exerciseTime = trackData.map((entry) => entry.time);

    // Count target muscle usage for Pie Chart
    const muscleGroups = trackData.map((entry) => entry.exer); // Assuming 'exer' is muscle-based
    const muscleCount = muscleGroups.reduce((acc, muscle) => {
        acc[muscle] = (acc[muscle] || 0) + 1;
        return acc;
    }, {});

    const pieLabels = Object.keys(muscleCount);
    const pieDataValues = Object.values(muscleCount);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Workout Statistics</h2>

            {/* Calories Burnt Chart */}
            <div className="p-6 shadow-lg rounded-lg border border-gray-300 bg-white mb-8">
                <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Calories Burnt</h3>
                <div className="h-96">
                    <Bar
                        data={{
                            labels: dates,
                            datasets: [
                                {
                                    label: "Calories Burnt",
                                    data: caloriesBurnt,
                                    backgroundColor: "#FF6384",
                                    borderRadius: 8,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: { enabled: true },
                            },
                            scales: {
                                x: {
                                    grid: { display: false },
                                    ticks: { color: "#333", font: { weight: "bold" } },
                                },
                                y: {
                                    grid: { color: "#ddd" },
                                    ticks: { color: "#555" },
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Exercise Time Chart */}
            <div className="p-6 shadow-lg rounded-lg border border-gray-300 bg-white mb-8">
                <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Exercise Time (mins)</h3>
                <div className="h-96">
                    <Bar
                        data={{
                            labels: dates,
                            datasets: [
                                {
                                    label: "Exercise Time (mins)",
                                    data: exerciseTime,
                                    backgroundColor: "#36A2EB",
                                    borderRadius: 8,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: { enabled: true },
                            },
                            scales: {
                                x: {
                                    grid: { display: false },
                                    ticks: { color: "#333", font: { weight: "bold" } },
                                },
                                y: {
                                    grid: { color: "#ddd" },
                                    ticks: { color: "#555" },
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Pie Chart for Target Muscle Groups */}
            <div className="p-6 shadow-lg rounded-lg border border-gray-300 bg-white">
                <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Muscle Groups Worked</h3>
                <div className="flex justify-center">
                    <div className="w-80">
                        <Pie
                            data={{
                                labels: pieLabels,
                                datasets: [
                                    {
                                        data: pieDataValues,
                                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"],
                                        borderWidth: 2,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "bottom", labels: { boxWidth: 12, padding: 10 } },
                                    tooltip: { enabled: true },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackCharts;
