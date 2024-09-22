import { useState } from "react";
import { motion } from "framer-motion";
import logo from "./assets/Obsidient_Horizon-LOGO.png";
import { ethers } from "ethers";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    address: "", 
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };


  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        
        setFormData({
          ...formData,
          address: accounts[0], 
        });
      } catch (error) {
        setErrorMessage("MetaMask connection failed. Please try again.");
      }
    } else {
      setErrorMessage("MetaMask is not installed. Please install it.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-700 to-blue-800"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            <img
              src={logo}
              alt="App Logo"
              className="w-24 h-24 rounded-full shadow-lg"
            />
          </motion.div>

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Register to <br></br>Obsidian Horizon
          </h2>

          <div className="mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectMetaMask}
              className="w-full py-2 bg-yellow-600 text-white rounded-md shadow-md hover:bg-yellow-700 transition-colors duration-300"
            >
              Connect MetaMask
            </motion.button>
            {formData.address && (
              <p className="mt-2 text-green-600">
                Connected to MetaMask: {formData.address}
              </p>
            )}
            {errorMessage && (
              <p className="mt-2 text-red-600">{errorMessage}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              Register
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}

export default App;
