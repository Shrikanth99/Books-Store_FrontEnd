import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {toast, Toaster } from 'react-hot-toast';
import { setEmptyAddress } from '../../actions/address-action';
import { setClearCart } from '../../actions/product-action';
import { setClearWishlist } from '../../actions/wishlist-action';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../images/logo.png'


const UserNavBar = () => {
    const { userDispatch } = useContext(UserContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
      setAnchorEl(null);
      console.log('hjj',e.currentTarget.textContent)
        if(e.currentTarget.textContent === 'Profile'){
            navigate('/account/profile')
        }
        else if(e.currentTarget.textContent === 'MyOrders'){
            navigate('/account/my-orders')
        }
        else if(e.currentTarget.textContent === 'SavedAddress'){
            navigate('/account/address')
        }
        else if(e.currentTarget.textContent === 'My-Selling-Order' ){
            navigate('/account/my-sell')
        }
    }
  

    const carts = useSelector(state=>state.products.cart)

    const handleLogout = () => {
        localStorage.removeItem('token')
        userDispatch({ type: 'LOGOUT_USER' })
        dispatch(setEmptyAddress())
        dispatch(setClearCart())
        dispatch(setClearWishlist())
        toast.success('Logged out')

    }
    return (
        <div style={{position:'sticky',top:'0', zIndex:1, backgroundColor:'#092b5a' }}  >
            <Toaster/>
            <Navbar expand="md"  >
            <Navbar.Brand as={Link} to="/"><img src={logo} width='50' height='50'style={{borderRadius:'50%'}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    <Nav.Link
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    > 
                        MyAccount
                    </Nav.Link>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>MyOrders</MenuItem>
                        <MenuItem onClick={handleClose}>SavedAddress</MenuItem>
                        <MenuItem onClick={handleClose} >My-Selling-Order</MenuItem>
                    </Menu>
                    <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
                    <Nav.Link as={Link} to="/myCart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span className="cart-count">{carts?.length}</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
                    <Nav.Link as={Link} to='/sellProduct' >Sell-Products</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
        
    )
}

export default UserNavBar