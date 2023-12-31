import React,{useEffect, useState, useContext} from 'react'
import { Link, useParams,useNavigate, useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ShowAddress from '../AddressForm/ShowAddress';
import { useDispatch } from 'react-redux';
import { startGetUserAddress } from '../../actions/address-action';
import AddressForm from '../AddressForm/AddressForm';
import MyOrders from './MyOrders';
import Profile from '../Profile/Profile';
import { UserContext } from '../../App';




const MyAccount = () => {
    const {userState} = useContext(UserContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {id} = useParams()
    const [showAddToggle,setShowAddToggle] = useState(false)
    const [addressFormToggle,setAddressFormToggle] = useState(false)
    const [profileToggle,setProfileToggle] = useState(false)
    const [myOrderToggle, setMyOrderToggle ] = useState(false)
  //console.log('after refresh',id)


    
  
    const handleShowAdd  = () => {
      setShowAddToggle(true)
      setProfileToggle(false)
      setMyOrderToggle(false)
      setAddressFormToggle(false)
      localStorage.setItem('showAddToggle', 'true');
      localStorage.removeItem('myOrderToggle')
      localStorage.removeItem('profileToggle')
      localStorage.removeItem('addressForm')

      console.log('sad',showAddToggle)
  }
  const handleShowProfile = () =>{

    setProfileToggle(true)
    setShowAddToggle(false)
    setMyOrderToggle(false)
    setAddressFormToggle(false)
    localStorage.setItem('profileToggle', 'true');
    localStorage.removeItem('myOrderToggle')
    localStorage.removeItem('showAddToggle')
    localStorage.removeItem('addressForm')

    console.log('aF',addressFormToggle)
  }

  const handleOrder = () => {
    setMyOrderToggle(true)
    setShowAddToggle(false)
    setProfileToggle(false)
    setAddressFormToggle(false)
    localStorage.setItem('myOrderToggle', 'true');
    localStorage.removeItem('profileToggle')
    localStorage.removeItem('showAddToggle')
    localStorage.removeItem('addressForm')

  }

  useEffect(() => {

    if(location.state?.msg === 'show'){
      setShowAddToggle(true)
      setAddressFormToggle(true)
    }
    const storedShowAdd = localStorage.getItem('showAddToggle');
    const storedProfile = localStorage.getItem('profileToggle');
    const storedMyOrder = localStorage.getItem('myOrderToggle');
    const storesAddForm = localStorage.getItem('addressForm')

    if(id){
      setAddressFormToggle(true)
    } else if (storedShowAdd === 'true') {
      setShowAddToggle(true)
    }else if ( storedProfile === 'true' ){
      setProfileToggle(true)
    } else if ( storedMyOrder === 'true' ){
      setMyOrderToggle(true)
    } else if ( storesAddForm === 'true' ){
      setAddressFormToggle()
    }

    return () => {
      localStorage.removeItem('showAddToggle');
      localStorage.removeItem('profileToggle');
      localStorage.removeItem('myOrderToggle');
      localStorage.removeItem('addressForm')
  };


  },[])

  return (
    <div>
      
      <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item ><Button variant="link" style={{color:'white'}} onClick={handleShowProfile}  ><Link to='/account/profile' >My-Profile</Link></Button></ListGroup.Item>
        {/* <ListGroup.Item onClick={handleOrder} >My-Order</ListGroup.Item> */}
        <ListGroup.Item onClick={handleOrder} ><Link to='/account/my-orders' >My-Orders</Link></ListGroup.Item>
        <ListGroup.Item  onClick={handleShowAdd}  >
        <Card.Link ><Link to='/account/address' >Saved-Address</Link></Card.Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
    {profileToggle && <Profile />}
    { localStorage.getItem('myOrderToggle') && <MyOrders/>  }
    { showAddToggle && <ShowAddress  />  }
    { addressFormToggle && <AddressForm/>  } 
    
    </div>
  )
}

export default MyAccount
