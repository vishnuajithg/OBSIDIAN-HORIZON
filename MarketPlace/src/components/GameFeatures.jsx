import React from "react";
import { motion } from "framer-motion";

const GameFeatures = () => {
  const features = [
    {
      id: 1,
      title: "Immersive Open World",
      description:
        "Explore vast, detailed landscapes and uncover hidden treasures.",
    },
    {
      id: 2,
      title: "Dynamic Combat",
      description:
        "Engage in fast-paced, real-time battles with responsive controls.",
    },
    {
      id: 3,
      title: "NFT Integration",
      description:
        "Earn and trade unique NFTs as you progress through the game.",
    },
    {
      id: 4,
      title: "Multiplayer Mode",
      description:
        "Team up with friends or challenge others in intense PvP battles.",
    },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
      <h2 className="text-4xl font-bold mb-8 text-yellow-400">Game Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="bg-gray-700 p-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-2 text-indigo-400">
              {feature.title}
            </h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameFeatures;
