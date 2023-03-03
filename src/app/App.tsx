import { useState, createContext } from 'react';
import Routes from "../routes";
import { Container } from "react-bootstrap";
import { Header, Footer } from '../components/organisms';
import { FullScreenLoader } from '../components/atoms';

export const FullScreenLoaderContext = createContext<React.Dispatch<React.SetStateAction<boolean>>>(null!);

function App() {
  const [fullScreenLoadingActive, setfullScreenLoadingActive] = useState(false);
  
  return (
    <>
      <FullScreenLoaderContext.Provider value={setfullScreenLoadingActive}>
      {fullScreenLoadingActive && <FullScreenLoader />}
        <Header />
        <Container as={'main'} fluid="xxl">
            <Routes />
        </Container>
        <Footer />
      </FullScreenLoaderContext.Provider>
    </>
  );
}

export default App;
