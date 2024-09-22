import React from "react";

const TokensOwned = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transform transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Tokens Owned</h2>
      <p className="text-4xl font-semibold">1200 Tokens</p>
      <div className="mt-4 text-yellow-500">💰 Earn more by playing games!</div>
    </div>
  );
};

export default TokensOwned;
