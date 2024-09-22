import React from "react";

const PointsPlay = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transform transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-green-400">Points to Play</h2>
      <p className="text-4xl font-semibold">500 Points</p>
      <div className="mt-4 text-green-500">
        🎮 Use points to unlock new levels!
      </div>
    </div>
  );
};

export default PointsPlay;
