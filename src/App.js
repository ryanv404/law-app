import { Container } from '@mui/material';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Header />
      <Main
        sx={{
          minWidth: "470px",
          maxWidth: "720px"
        }}
      />
      <Footer />
    </Container>
  );
};

export default App;
