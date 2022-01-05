/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-unused-vars */

import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
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
      </div>
    </div>
  );
}
