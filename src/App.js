/* eslint-disable jsx-a11y/accessible-emoji */

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import WavePortalContract from "./utils/WavePortal.json";
import './App.css';

const CONTRACT_ADDRESS = "0xd280Dd88B224dAE6376aB3351305333b93F1745F";

export default function App() {
  // State variable to store our user's public wallet
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAbi = WavePortalContract.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      // First make sure we have access to window.ethereum
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
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

  // This runs our function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

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

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);

      let count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

      // Execute wave from smart contract
      const waveTxn = await wavePortalContract.wave();
      console.log("Mining", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());
    } catch (error) {
      console.error(error);
    }
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

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {/* If there is no currentAccount render this button */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
