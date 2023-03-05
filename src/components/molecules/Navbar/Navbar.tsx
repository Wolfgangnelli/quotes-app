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
      <NavbarBootstrap.Brand href="/" className='logo-home fw-bold ms-2'>Quotes App</NavbarBootstrap.Brand>
      <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
      <NavbarBootstrap.Collapse id="basic-navbar-nav" className='d-xl-flex justify-content-end align-items-end'>
        <Nav>
            {isLoggedIn && (
                 <div className="d-flex justify-content-xl-end align-items-lg-end justify-content-center align-items-center me-lg-2 nav-breakpoints">
                    <Nav.Link href='#'>
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