import React from "react";
import TokensOwned from "./components/TokensOwned";
import NftsOwned from "./components/NftsOwned";
import PointsPlay from "./components/PointsPlay";
import TradingHistory from "./components/TradingHistory";
import GameFeatures from "./components/GameFeatures";
import NFTsForSale from "./components/NFTsForSale";
import { motion } from "framer-motion";
import logo from "./assets/Obsidient_Horizon-LOGO.png";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-10 px-5 relative">
        {/* Small User Field in Top Right */}
        <motion.div
          className="absolute top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold">Ragnar_Lothbrok1982</p>
        </motion.div>

        {/* Logo and Game Name Section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={logo}
            alt="Obsidian Horizon Logo"
            className="mx-auto h-32 w-32 object-contain mb-4"
          />
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse">
            Obsidian Horizon
          </h1>
        </motion.div>

        {/* Game Features Section */}
        <GameFeatures />

        {/* NFTs For Sale Section */}
        <div className="mt-10">
          <NFTsForSale />
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <TokensOwned />
          <NftsOwned />
          <PointsPlay />
          <TradingHistory />
        </div>
      </div>
    </>
  );
}

export default App;
