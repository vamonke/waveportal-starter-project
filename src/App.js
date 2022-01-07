/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */

import { ethers } from "ethers";
import React, { useEffect, useState, useRef } from "react";
import WavePortalContract from "./utils/WavePortal.json";
import './App.css';

const CONTRACT_ADDRESS = "0x11c49f04951A0f931FAb26C7029FB08b415fB43C";

export default function App() {
  // State variable to store our user's public wallet
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);

  const contractABI = WavePortalContract.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      // First make sure we have access to window.ethereum
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      }

      // Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*
   * Create a method that gets all waves from your contract
   */
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      // Call the getAllWaves method from your Smart Contract
      const waves = await wavePortalContract.getAllWaves();

      // We only need address, timestamp, and message
      // in our UI so let's pick those out
      let wavesCleaned = [];
      waves.forEach(wave => {
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message
        });
      });

      // Store our data in React State
      setAllWaves(wavesCleaned);
    } catch (error) {
      console.log(error);
    }
  }

  // This runs our function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  useEffect(() => {
    if (currentAccount) getAllWaves();
  }, [currentAccount])

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const firstAccount = accounts[0];

      console.log("Connected", firstAccount);
      setCurrentAccount(firstAccount);
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  }

  const wave = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      // Execute wave from smart contract
      const waveTxn = await wavePortalContract.wave(message, { gasLimit: 300000 });
      console.log("Mining", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      setMessage("");
      formRef.current.reset();
      getAllWaves();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          👋  Hi there!
        </div>

        <div className="bio">
          My name is Varick and I'm <strike>unemployed</strike> building the future of the internet with web3! Connect your Ethereum wallet and wave at me ;)
        </div>

        {currentAccount && (
          <form ref={formRef} onSubmit={wave}>
            <input
              type="text"
              placeholder="Your message goes here"
              onChange={handleOnChange}
              disabled={isLoading}
            />
            <button disabled={isLoading} className="waveButton" type="submit">
              {isLoading ? <div id="spinner" /> : "Wave at Me"}
            </button>
          </form>
        )}

        {/* If there is no currentAccount render this button */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        <hr />

        {!!allWaves.length && (
          <div className="totalWaves">
            We've already collected {allWaves.length} waves!
          </div>
        )}

        {allWaves.map((wave, index) => {
          return (
            <div key={index} className="wave">
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}
