import { ChakraProvider } from '@chakra-ui/react';
import { useTheme } from '../theme';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={useTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
