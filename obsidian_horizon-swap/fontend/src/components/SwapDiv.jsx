import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SwapDiv = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedTokenPrice, setSelectedTokenPrice] = useState(0);
  const [swappedAmount, setSwappedAmount] = useState(0);
  const [showSwapDetails, setShowSwapDetails] = useState(false);
  const amountToSwap = 2.00;

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        setTokens(response.data);
      } catch (err) {
        setError('Failed to load tokens');
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const handleTokenSelection = (e) => {
    const selectedTokenSymbol = e.target.value;
    setSelectedToken(selectedTokenSymbol);

    const selectedTokenData = tokens.find((token) => token.symbol === selectedTokenSymbol);
    if (selectedTokenData) {
      setSelectedTokenPrice(selectedTokenData.current_price);
    }
  };

  const handleSwap = () => {
    if (!selectedToken) {
      alert('Please select a token to swap.');
      return;
    }

    const swappedValue = amountToSwap * selectedTokenPrice;
    setSwappedAmount(swappedValue);
    setShowSwapDetails(true);
  };

  return (
    <div className="bg-gradient-to-r from-gray-500 to-blue-900 text-yellow-300 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-blue-800 rounded-lg shadow-lg border-2 border-yellow-500">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-300">Swap Your Tokens</h2>

        {/* From Token Section */}
        <div className="mb-6">
          <label className="block text-base  font-bold mb-2 text-yellow-400">From Token</label>
          <div className="flex items-center bg-blue-700 rounded-lg overflow-hidden">
            <input
              type="text"
              value="2.00"
              readOnly
              className="flex-grow min-w-0 bg-transparent text-lg p-3 outline-none text-yellow-300 placeholder-yellow-600"
            />
          </div>
        </div>

        {/* Centered Select Token Section */}
        <div className="mb-6 flex justify-center">
          <select
            className="bg-blue-600 text-yellow-300 p-3 border-l border-yellow-500 focus:outline-none appearance-none cursor-pointer w-40 rounded-lg"
            value={selectedToken}
            onChange={handleTokenSelection}
          >
            <option value="" disabled className='rounded-lg'>
              Select a Token
            </option>
            {loading ? (
              <option>Loading...</option>
            ) : error ? (
              <option>{error}</option>
            ) : (
              tokens.map((token) => (
                <option key={token.id} value={token.symbol}>
                  {token.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-6 relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-yellow-500 opacity-50"></div>
          <button
            className="relative z-10 bg-blue-700 hover:bg-blue-600 rounded-full p-3 transition duration-300 border border-yellow-500 group"
            onClick={handleSwap}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400 group-hover:text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 7v6m0 0l4-4m-4 4l4 4M20 17v-6m0 0l-4 4m4-4l-4-4"
              />
            </svg>
          </button>
        </div>

        {/* Swap Tokens Button */}
        <button
          className="w-full bg-yellow-500 hover:bg-yellow-500 text-lg py-3 rounded-lg font-semibold text-blue-900 transition duration-300 relative overflow-hidden group"
          onClick={handleSwap}
        >
          <span className="relative z-10 text-lg  font-bold">Swap Tokens</span>
          <div className="absolute inset-0 h-full w-full bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>

        {/* Display Swapped Token and Balance */}
        {showSwapDetails && (
          <div className="mt-6 text-center text-yellow-300">
            <h3>Balance after swapping</h3>
            <p>1 eth = {selectedTokenPrice}</p>
            <p>Your balance is :{swappedAmount.toFixed(2)} {selectedToken}</p>
            {/* <p>Swapped Token: {selectedToken}</p> */}
            {/* <p>Swapped Amount: {swappedAmount.toFixed(2)} USD</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapDiv;
