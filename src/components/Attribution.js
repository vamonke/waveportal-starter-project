import {
  Box,
} from '@chakra-ui/react'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from "react";

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
    Built by <a target="_blank" rel="noopener noreferrer" href='https://github.com/vamonke/'>vamonke</a> with <a target="_blank" rel="noopener noreferrer" href='https://buildspace.so/'>buildspace</a>
    {" • "}
    Background from <a target="_blank" rel="noopener noreferrer" href='https://www.freepik.com/free-vector/gradient-galaxy-background_14212522.htm'>freepik</a>
  </Box>
);

export default Attribution;