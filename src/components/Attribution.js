import React from "react";
import { Box } from '@chakra-ui/react'

const Attribution = () => (
  <Box
    position="absolute"
    bottom={0}
    width="100%"
    bgColor={"rgba(0,0,0,0.2)"}
    py={6}
    textAlign="center"
    fontSize={14}
  >
    Built by <a target="_blank" rel="noopener noreferrer" href='https://github.com/vamonke/waveportal-starter-project'>vamonke</a> with <a target="_blank" rel="noopener noreferrer" href='https://buildspace.so/'>buildspace</a>
    {" | "}
    Read <a target="_blank" rel="noopener noreferrer" href='https://rinkeby.etherscan.io/address/0x4653415f0a1a208b4f62fcf49c9ea6f66c8050e4'>contract</a> on Etherscan
    {" | "}
    Background from <a target="_blank" rel="noopener noreferrer" href='https://www.freepik.com/free-vector/gradient-galaxy-background_14212522.htm'>freepik</a>
  </Box>
);

export default Attribution;