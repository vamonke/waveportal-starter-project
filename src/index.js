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
      // styles for the `body`
      body: {
        bg: 'gray.800',
        color: 'white',
      },
      heading: {
        fontFamily: "Space Mono",
      },
      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  fonts: {
    heading: 'Space Mono',
    body: 'Space Mono',
    code: 'Space Mono',
  },
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
