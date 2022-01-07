import {
  Input,
  Button,
  Box,
  Spinner,
  Flex,
} from '@chakra-ui/react'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState, useRef } from "react";

const WaveForm = (props) => {
  const { submit } = props;
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

  const isDisabled = !message || isLoading;

  return (
    <Box
      as="form"
      ref={formRef}
      onSubmit={wave}
      py={6}
    >
      <Input
        type="text"
        size="lg"
        placeholder="Your message goes here"
        onChange={handleOnChange}
        disabled={isLoading}
        _focus={{
          bg: "#251b46"
        }}
      />
      <Button
        disabled={isDisabled}
        mt={4}
        size="lg"
        bg="white"
        color="gray.800"
        type="submit"
        width="100%"
      >
        {isLoading ? (
          <Flex
            justifyContent="center"
            alignContent="center"
          >
            <Spinner size="sm" mr={3} />
            Transmitting wave..
          </Flex>
        ) : "👋  Wave at me"
        }
      </Button>
    </Box>
  );
}

export default WaveForm;