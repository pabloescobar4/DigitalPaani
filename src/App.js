import logo from './logo.svg';
import './App.css';
import { Container } from './components/Container';
import { Box, ChakraProvider, theme } from '@chakra-ui/react';

function App() {
  return (
    <Box className="App" >
       <ChakraProvider theme={theme}>

   
      <Container />
      </ChakraProvider>
    </Box>
  );
}

export default App;
