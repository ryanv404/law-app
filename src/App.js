import { Container } from '@mui/material';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <Container 
      maxWidth="sm"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Header />
      <Main />
      <Footer />
    </Container>
  );
};

export default App;
