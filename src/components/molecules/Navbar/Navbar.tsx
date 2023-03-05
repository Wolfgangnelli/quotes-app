import Nav from 'react-bootstrap/Nav';
import {Navbar as NavbarBootstrap} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { logoutUser } from '../../../redux/actions/authUserAction';
import "./Navbar.scss";

const Navbar = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const { isLoggedIn, data } = useSelector((state: any) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

  return (
    <NavbarBootstrap bg="dark" expand="lg" variant='dark' fixed='top' collapseOnSelect className='custom-nav-bar-bg'>
      <NavbarBootstrap.Brand href="/" className='logo-home fw-bold'>Quotes App</NavbarBootstrap.Brand>
      <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
      <NavbarBootstrap.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            {isLoggedIn && (
                 <div className="d-flex justify-content-center align-items-center ms-lg-2 nav-breakpoints">
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
  </NavbarBootstrap>
  );
};

export default Navbar;