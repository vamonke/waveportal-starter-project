import {
  Input,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react'
/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState, useRef } from "react";

const WaveForm = (props) => {
  const { submit, account } = props;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);

  const handleOnChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  }

  const wave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await submit(message);
    formRef.current.reset();
    setIsLoading(false);
  }

  return (
    <Box
      as="form"
      ref={formRef}
      onSubmit={wave}
      p={6}
      bgColor="#251b46"
      borderRadius="lg"
      boxShadow={`0 0 40px -25px #FFF`}
    >
      <Flex
        fontSize="sm"
        justifyContent="space-between"
        color="gray.300"
      >
        <Box>
          Your account:
        </Box>
        <Box>
          {account}
        </Box>
      </Flex>
      <Input
        mt={3}
        type="text"
        size="lg"
        placeholder="Your message goes here"
        onChange={handleOnChange}
        disabled={isLoading}
        bg="rgba(255, 255, 255, 1)"
        colorScheme="gray"
        variant="outline"
        required
        autoFocus
      />
      <Flex justifyContent="center">
        <Button
          isLoading={isLoading}
          mt={4}
          size="lg"
          color="white"
          colorScheme="pink"
          type="submit"
          width="100%"
          loadingText='Transmitting wave..'
        >
          👋  Wave at me
        </Button>
      </Flex>
    </Box>
  );
}

export default WaveForm;