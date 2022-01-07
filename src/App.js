/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Heading,
  Button,
  useToast,
  Text,
} from '@chakra-ui/react'

import WaveForm from "./components/WaveForm";
import WavesGrid from "./components/WavesGrid";
import Attribution from "./components/Attribution";
import { getContract } from "./utils/contract";

export default function App() {
  // State variable to store our user's public wallet
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const toast = useToast()

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

      const wavePortalContract = getContract();
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
      setAllWaves(wavesCleaned.reverse());
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

  const wave = async (message) => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }

      const wavePortalContract = getContract();
      const waveTxn = await wavePortalContract.wave(message, { gasLimit: 300000 });
      console.log("Mining", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
      
      toast({
        title: 'Transmition success',
        description: "Your wave has been stored in the blockchain.",
        status: 'success',
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Oops!',
        description: "Something went wrong :(",
        status: 'success',
        position: "top",
        duration: 5000,
      });
    }
  }

  /**
   * Listen in for emitter events!
   */
  useEffect(() => {
    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    const { ethereum } = window;
    if (ethereum) {
      const wavePortalContract = getContract();
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);

  return (
    <Box
      pt={24}
      pb={32}
      bgImage="url(/background.jpg)"
      bgSize="cover"
      bgPos="center"
      bgRepeat="none"
      bgAttachment="fixed"
      minH="100vh"
    >
      <Container maxW="container.sm">
        <Box>
          <Heading fontWeight={700}>
            Hi there, I'm <Text as="span" color="yellow.400">Varick</Text> 🧑‍🚀
          </Heading>
          <Box mt={5} fontSize={18}>
            I'm <strike>an astronaut</strike> building the future of the internet with Web3! Connect your Ethereum wallet and wave at me using the power of blockchain ;)
          </Box>
          {currentAccount ? (
            <WaveForm
              submit={wave}
              account={currentAccount}
            />
          ) : (
            <Button
              size="lg"
              mt={6}
              bg="white"
              color="gray.800"
              type="submit"
              width="100%"
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          )}
        </Box>
        <WavesGrid waves={allWaves} />
      </Container>
      <Attribution />
    </Box>
  );
}
