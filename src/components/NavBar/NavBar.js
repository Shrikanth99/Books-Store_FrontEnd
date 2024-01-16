
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import '../../styles/navbar.css'
const NavBar = () =>{

    return (
    <Navbar expand="md" className='navBar' >
    <Navbar.Brand as={Link} to="/"><img src={logo} width='50' height='50'style={{borderRadius:'50%'}}/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/products">Products</Nav.Link>
        <Nav.Link as={Link} to="/register">Register</Nav.Link>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    )
}

export default NavBar