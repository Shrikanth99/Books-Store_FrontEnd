import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import ShowAddress from '../AddressForm/ShowAddress';
import { useDispatch } from 'react-redux';
import { startGetUserAddress } from '../../actions/address-action';
import AddressForm from '../AddressForm/AddressForm';
import { ListGroupItem } from 'react-bootstrap';
import MyProfile from './MyProfile';



const MyAccount = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const [showAdd,setShowAdd] = useState(false)
    const [addressForm,setAddressForm] = useState(false)
    const [editAddressForm,setEditAddressForm] = useState(false)
    const [profileToggle,setProfileToggle] = useState(false)
    const [myOrder, setMyOrder ] = useState(false)
  //console.log('after refresh',id)
  
    const handleShowAdd  = () => {
      setShowAdd(true)
      setProfileToggle(false)
      setMyOrder(false)
      console.log('sad',showAdd)
  }
  const handleShowProfile = () =>{
    setProfileToggle(true)
    setShowAdd(false)
    setMyOrder(false)
  }

  const handleOrder = () => {
    setMyOrder(true)
    setShowAdd(false)
    setProfileToggle(false)
  }

  useEffect(() => {
    dispatch(startGetUserAddress())
    setEditAddressForm()
    if(id){
      setAddressForm(true)
    }
  },[])

  return (
    <div>
      
      <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item onClick={handleShowProfile} ><Link to='/account/my-profile' >My-Profile</Link></ListGroup.Item>
        <ListGroup.Item onClick={handleOrder} ><Link to='/account/my-orders' >My-Orders</Link></ListGroup.Item>
        <ListGroup.Item  onClick={handleShowAdd}  >
        <Card.Link ><Link to='/account/address' >Saved-Address</Link></Card.Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
    {profileToggle && <MyProfile />}
    { myOrder && <MyOrders/> }
    { showAdd && <ShowAddress  /> }
    { addressForm && <AddressForm/> }
    
    </div>
  )
}

export default MyAccount
