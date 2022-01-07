import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'

import './index.css';
import App from './App';

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'white',
        fontFamily: "Space Mono",
      },
      input: {
        bg: 'white',
        color: 'gray.800',
      },
      a: {
        color: 'pink.400',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  fonts: {
    heading: "Space Mono",
  }
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
