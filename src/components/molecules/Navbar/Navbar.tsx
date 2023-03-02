import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar as NavbarBootstrap} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
/* import { AuthContext } from '../../../auth/Auth'; */
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { logoutUser } from '../../../redux/actions/authUserAction';


const Navbar = () => {
    /* const currentUser = useContext(AuthContext); */
    const dispatch: Dispatch<any> = useDispatch();
    const { isLoggedIn, data } = useSelector((state: any) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

  return (
    <NavbarBootstrap bg="dark" expand="lg" variant='dark' fixed='top' collapseOnSelect>
    <Container>
      <NavbarBootstrap.Brand href="/">Quotes App</NavbarBootstrap.Brand>
      <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
      <NavbarBootstrap.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            {isLoggedIn && (
                 <div className="d-flex justify-content-center align-items-center ms-lg-2">
                    <Nav.Link href='/profile'>
                        <NavbarBootstrap.Text style={{ color: "green" }}>
                            <i className="fa-solid fa-user-check"></i>
                        </NavbarBootstrap.Text>
                            {data?.displayName?.toUpperCase()}
                    </Nav.Link>
                    <Nav.Link className="justify-content-end" onClick={handleLogout}>
                        Logout
                    </Nav.Link>
               </div>
            )}
        </Nav>
      </NavbarBootstrap.Collapse>
    </Container>
  </NavbarBootstrap>
  );
};

export default Navbar;