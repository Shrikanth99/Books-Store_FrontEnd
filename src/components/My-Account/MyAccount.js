import React,{useEffect, useState, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
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
      setAddressFormToggle(!addressFormToggle)
      console.log('sad',showAddToggle)
  }
  const handleShowProfile = () =>{
    setProfileToggle(true)
    setShowAddToggle(false)
    setMyOrderToggle(false)
    setAddressFormToggle(false)
    console.log('aF',addressFormToggle)
  }

  const handleOrder = () => {
    setMyOrderToggle(true)
    setShowAddToggle(false)
    setProfileToggle(false)
    setAddressFormToggle(false)
  }

  useEffect(() => {
    dispatch(startGetUserAddress())
    if(id){
      setAddressFormToggle(true)
    } else if ( userState ){
      setProfileToggle()
    }
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
    { myOrderToggle ? <MyOrders/> : 'Byee' }
    { showAddToggle ? <ShowAddress  /> : " hii" }
    { addressFormToggle ? <AddressForm/>  : 'Helo' } 
    
    </div>
  )
}

export default MyAccount
