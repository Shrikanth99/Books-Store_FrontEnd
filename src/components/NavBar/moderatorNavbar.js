import React, { useContext } from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import { UserContext } from '../../App'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'

const ModeratorNavBar = () => {
    const {userDispatch} = useContext(UserContext)

    let procurement = useSelector(state => state.procurements.data )
    procurement = procurement.filter(ele=>ele.status === 'Pending')
    console.log('procu',procurement)


    const handleLogout = () =>{
        localStorage.removeItem('token')
        userDispatch({type:'LOGOUT_USER'})
        toast.success('Logged out successfully')
    }
  return (
    <div>
    <Toaster />
    <Navbar expand="md" style={{position:'sticky',top:'0', zIndex:1, width:'100%',backgroundColor:'#092b5a' }} >
            <Navbar.Brand ><img src={logo} width='50' height='50'style={{borderRadius:'50%'}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link as={Link} to="/notifications">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="cart-count">{procurement?.length}</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  )
}

export default ModeratorNavBar
