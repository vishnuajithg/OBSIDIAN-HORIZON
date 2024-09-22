import React, { useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import nft1 from "../assets/NFT1.jpg";
import nft2 from "../assets/NFT2.jpg";
import nft3 from "../assets/NFT3.jpg";
import nft4 from "../assets/NFT4.jpg";
import nft5 from "../assets/NFT5 .jpg";

const NFTsForSale = () => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const nfts = [
    {
      id: 1,
      name: "Crimson Dragon",
      image: `${nft1}`,
      price: "200 Tokens",
    },
    {
      id: 2,
      name: "Galactic Phoenix",
      image: `${nft2}`,
      price: "300 Tokens",
    },
    {
      id: 3,
      name: "Neon Tiger",
      image: `${nft3}`,
      price: "500 Tokens",
    },
    {
      id: 4,
      name: "Mystic Wolf",
      image: `${nft4}`,
      price: "250 Tokens",
    },
    {
      id: 5,
      name: "Cyber Gorilla",
      image: `${nft5}`,
      price: "400 Tokens",
    },
  ];

  const checkMetaMaskConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        alert("MetaMask connected successfully!");
      } catch (error) {
        console.error("User denied MetaMask connection", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleBuyNFT = async (nftName) => {
    if (!currentAccount) {
      await checkMetaMaskConnection();
    } else {
      alert(`You bought ${nftName}!`);
      // Additional logic to handle the purchase using smart contracts can be added here.
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-white">
      <h2 className="text-4xl font-bold mb-8 text-blue-400">NFTs For Sale</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nfts.map((nft) => (
          <motion.div
            key={nft.id}
            className="bg-gray-700 p-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={nft.image}
              alt={nft.name}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              {nft.name}
            </h3>
            <p className="text-gray-300 text-lg mb-4">{nft.price}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-500 transition-colors duration-300"
              onClick={() => handleBuyNFT(nft.name)}
            >
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NFTsForSale;
