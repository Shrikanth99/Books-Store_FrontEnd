import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import {toast, Toaster } from 'react-hot-toast';
import logo from '../../images/logo.png'
import '../../styles/navbar.css'

const AdminNavBar = () => {
    const {userDispatch} = useContext(UserContext)
    const handleLogout = () =>{
        localStorage.removeItem('token')
        userDispatch({type:'LOGOUT_USER'})
        toast.success('Logged out successfully')
    }
    //console.log(userDispatch);
    return (
        <Navbar className='navBar' expand="md"  >
            <Navbar.Brand as={Link} to="/"><img src={logo} width='50' height='50'style={{borderRadius:'50%'}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    <Nav.Link as={Link} to="/add-product" >Add-Product</Nav.Link>
                    <Nav.Link as={Link} to='/all-Orders' >View-Orders</Nav.Link>
                    <Nav.Link as={Link} to="/stats" >Stats</Nav.Link>
                    <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AdminNavBar