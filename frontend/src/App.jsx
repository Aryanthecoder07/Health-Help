import React from "react";
import "./App.css";
import Corosal from "./corosal";
import Selection from "./Selection";
import Timer from "./timer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 flex flex-col items-center justify-center p-5">
      <h1 className="text-black text-4xl font-bold mb-6">Welcome to Health Help</h1>

      {/* Centered container for carousel and selection stacked vertically */}
      <div className="w-[80vw] max-w-5xl flex flex-col items-center">
        <Corosal />
        
        <div className="mt-1"> {/* Add margin to separate */}
          <Selection />
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default App;
