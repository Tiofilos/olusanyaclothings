import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';
import roles from '../helpers/roles';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const { logout, isLogged, user } = useAuth();

  const [profileTitle, setProfileTitle] = useState('Unknown profile');

  useEffect(() => {
    if (user?.role === roles.admin) setProfileTitle('Admin');
    else if (user?.role === roles.client) setProfileTitle('Client');
  }, [user]);

  return (
    <Navbar collapseOnSelect expand="md" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand as={Link} to={routes.home}>
          Victoria Hall
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user?.role === roles.admin && (
            <>
            <Nav.Link as={NavLink} to={routes.settings}>
              Settings
            </Nav.Link>
            </>
            )}
          </Nav>
          <Nav>
            {!isLogged() && (
            <>
            <Nav.Link as={NavLink} to={routes.login}>Login</Nav.Link>
            </>
            )}
            {isLogged() && (
            <NavDropdown title={profileTitle} id="collasible-nav-dropdown">
              <NavDropdown.Item as={NavLink} to={routes.profile}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
