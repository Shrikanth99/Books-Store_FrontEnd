import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import AddressForm from '../AddressForm/AddressForm'


const MyAccount = () => {
    const [showAdd,setShowAdd] = useState(false)

    const handleShow  = () => {
        setShowAdd(true)
    }

  return (
    <div>
      <ul>
        <li>My-profile</li>
        <li>MyOrders</li>
        <li onClick={handleShow} ><Link to='/account' >Saved-Address</Link></li>
      </ul>
      { showAdd && <AddressForm/> }
    </div>
  )
}

export default MyAccount
