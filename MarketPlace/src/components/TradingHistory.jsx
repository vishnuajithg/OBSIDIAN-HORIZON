import React from "react";
import nft1 from "../assets/NFT1.jpg";
import nft4 from "../assets/NFT4.jpg";


const TradingHistory = () => {
  const history = [
    {
      id: 1,
      action: "Sold",
      image : `${nft1}`,
      item: `Mystic Warrior NFT`,
      date: "2024-09-20",
      price: "1500 Tokens",
    },
    {
      id: 2,
      action: "Bought",
      image : `${nft4}`,
      item: "Cyber Warrior NFT",
      date: "2024-09-19",
      price: "1200 Tokens",
    },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transform transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-red-400">Trading History</h2>
      <ul className="space-y-4">
        {history.map((trade) => (
          <li key={trade.id} className="flex justify-between">
            <div>
              <span className="font-semibold">{trade.action}:</span>{" "}
              {/* {trade.item} */}
            </div>
            <img
              src={trade.image}
              alt={trade.name}
              className="w-16 h-16 rounded-lg mr-4"
            />
            <div className="text-gray-400 text-sm">{trade.date}</div>
            <div className="text-yellow-400 font-semibold">{trade.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradingHistory;
