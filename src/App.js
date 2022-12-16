import './App.css';
// import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Main />
      {/* <Footer /> */}
    </QueryClientProvider>
  );
}

export default App;
