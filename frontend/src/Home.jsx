import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Welcome to Your Fitness Journey!</h1>
      <p>Select an exercise type below:</p>
      <div className="mt-4 space-x-4">
        <Link to="/self-paced" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Self-Paced Exercises
        </Link>
        <Link to="/goal-based" className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Goal-Based Exercises
        </Link>
        <Link to="/tracker" className="px-4 py-2 bg-green-500 text-white rounded-lg">
          tracker
        </Link>
        <Link to="/charts" className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Tracker Analysis
        </Link>
      </div>
    </div>
  );
}

export default Home;
