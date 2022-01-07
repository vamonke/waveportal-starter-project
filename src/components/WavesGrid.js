import {
  SimpleGrid,
  Flex,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react'

import React from "react";

const COLORS = [
  "#FFBE0B",
  "#FB5607",
  "#FF006E",
  "#8338EC",
  "#3A86FF",
];

const WaveCard = (props) => {
  const { message, address, timestamp, index } = props;
  const color = COLORS[index % 5];
  return (
    <Flex
      direction="column"
      bg="#251b46"
      borderWidth={1}
      borderStyle={"solid"}
      borderColor={color}
      p={6}
      borderRadius="md"
      boxShadow={`0 0 40px -20px ${color}`}
      fontFamily="Space Mono"
      fontSize="md"
    >
      <Box>
        <Text as="span" color="gray.500">From:</Text> {address}
      </Box>
      <Box>
        <Text as="span" color="gray.500">Sent at:</Text> {timestamp.toLocaleString()}
      </Box>
      <Box>
        <Text as="span" color="gray.500">Message:</Text> {message}
      </Box>
    </Flex>
  );
}

const WavesGrid = ({ waves }) => (
  <Box mt={6}>
    {!!waves.length && (
      <Heading fontSize={18} fontWeight={700} textAlign="center">
        Waves received: <Text as="span" fontWeight="bold" color="yellow.400">{waves.length}</Text>
      </Heading>
    )}
    <SimpleGrid columns={1} spacing={6} mt={8}>
      {/* {waves.map((wave, index) => (
        <WaveCard
          key={index}
          index={waves.length - index + 6}
          {...wave}
        />
      ))}
      {waves.map((wave, index) => (
        <WaveCard
          key={index}
          index={waves.length - index + 4}
          {...wave}
        />
      ))}
      {waves.map((wave, index) => (
        <WaveCard
          key={index}
          index={waves.length - index + 2}
          {...wave}
        />
      ))} */}
      {waves.map((wave, index) => (
        <WaveCard
          key={index}
          index={waves.length - index}
          {...wave}
        />
      ))}
    </SimpleGrid>
  </Box>
)

export default WavesGrid;