import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

const AdminNavBar = () => {
    const {userDispatch} = useContext(UserContext)
    const handleLogout = () =>{
        localStorage.removeItem('token')
        userDispatch({type:'LOGOUT_USER'})
    }
    return (
        <Navbar bg="light" expand="md">
            <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    <Nav.Link as={Link} to="/products/add">Add Products</Nav.Link>
                    <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AdminNavBar