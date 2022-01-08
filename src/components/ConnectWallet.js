import React, { useState } from "react";
import { Button } from '@chakra-ui/react'

const ConnectWallet = ({ setCurrentAccount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      size="lg"
      colorScheme="pink"
      // bg="white"
      // color="gray.800"
      type="submit"
      width="100%"
      onClick={onClick}
      loadingText='Connecting wallet..'
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;