import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const UserNavBar = () => {
    const { userDispatch } = useContext(UserContext)
    const carts = useSelector(state=>state.products.cart)
    const handleLogout = () => {
        localStorage.removeItem('token')
        userDispatch({ type: 'LOGOUT_USER' })
    }
    return (
        <Navbar bg="light" expand="md">
            <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    <Nav.Link as={Link} to="/account">My Account</Nav.Link>
                    <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
                    <Nav.Link as={Link} to="/myCart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span className="cart-count">{carts.length}</span>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default UserNavBar