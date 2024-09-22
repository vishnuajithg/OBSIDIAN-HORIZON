import React from "react";
import nft1 from '../assets/NFT1.jpg'
import nft4 from "../assets/NFT4.jpg";

const NftsOwned = () => {
  const nfts = [
    { id: 1, name: "Crimson Dragon", image: `${nft1}` },
    { id: 2, name: "Mystic Wolf", image: `${nft4}` },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transform transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">NFTs Owned</h2>
      <div className="grid grid-cols-1 gap-4">
        {nfts.map((nft) => (
          <div key={nft.id} className="flex items-center">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-16 h-16 rounded-lg mr-4"
            />
            <p className="text-lg font-semibold">{nft.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftsOwned;
