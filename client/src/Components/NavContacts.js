import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavContacts = () => {
  return (
    <Navbar bg="danger" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>ContactList</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/' >Home</Nav.Link>
            <Nav.Link as={Link} to='/ContactsList' >Contacts</Nav.Link>
            <Nav.Link as={Link} to='/AddContact' >Add Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavContacts