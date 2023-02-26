import Routes from "../routes";
import { Container } from "react-bootstrap";
import { Header, Footer } from '../components/organisms';

function App() {
  
  return (
    <div>
      <Header />
      <Container fluid="xxl">
        <main>
          <Routes />
        </main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
