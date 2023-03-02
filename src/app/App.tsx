import Routes from "../routes";
import { Container } from "react-bootstrap";
import { Header, Footer } from '../components/organisms';
/* import { AuthProvider } from '../auth/Auth'; */

function App() {
  
  return (
  /*   <AuthProvider> */
      <div>
        <Header />
        <Container fluid="xxl">
          <main>
            <Routes />
          </main>
        </Container>
        <Footer />
      </div>
/*     </AuthProvider> */
  );
}

export default App;
