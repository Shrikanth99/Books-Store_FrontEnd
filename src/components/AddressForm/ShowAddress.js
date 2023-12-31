import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddressForm from './AddressForm';


const ShowAddress = (props) => {
    
    const navigate = useNavigate()
    const [editAdd,setEditAdd] = useState(false)
    const [addressForm,setAddressForm] = useState(false)
    const {id} = useParams()
    // if(id){
    //     setEditAdd(true)
    // }
    const {address} = useSelector(state => state.address )

    const handleClick = (id) => {
        console.log('ad_id',id)
        setEditAdd(true)
    }

    const handleFormAdd = () => {
        setAddressForm(true)
        localStorage.setItem('addressForm','true')
        localStorage.removeItem('showAddToggle')
    }

    console.log('mak',addressForm)

    useEffect(() => {
        const storesAddForm = localStorage.getItem('addressForm')
        if(storesAddForm === 'true'){
            setAddressForm(true)
        }
        
    },[])

  return (
        <div>
           
            <>
            <Button onClick={handleFormAdd} ><Link to='/account/addressForm' style={{color : 'white'}} > ➕ Add-New-Address </Link></Button>
            </>
            <div>
               
            </div>
                {address.length > 0 ? (
                addressForm || editAdd ? (
                    <AddressForm />
                ) : (
                    address.map((ele) => (
                    <Card key={ele._id} style={{ width: '30rem' }}>
                        <Card.Body>
                        <Card.Title> {ele.fullName}, {ele.addressType} </Card.Title>
                        <Card.Text>
                            {ele.houseNumber}, {ele.address},<br />
                            {ele.landMark}, {ele.city} <br />
                            {ele.state} - {ele.pincode} <br />
                            Mobile - {ele.phoneNumber}
                        </Card.Text>
                        <Button variant="primary">Delete</Button>
                        <Button variant="primary" onClick={() => { handleClick(ele._id) }}>
                            <Link to={`/account/addressForm/${ele._id}`} style={{ color: 'white' }}>Edit</Link>
                        </Button>
                        </Card.Body>
                    </Card>
                    ))
                )
                ) : (
                <h4> No Address Found </h4>
                )}
                {/* {address.length>0 ? addressForm ? <AddressForm/> : editAdd ? <AddressForm /> : (
                address.map((ele) => {
                    return (
                        <>
                            <Card key={ele._id} style={{width : '30rem'}} >
                                <Card.Body>
                                <Card.Title> {ele.fullName}, {ele.addressType} </Card.Title>
                                <Card.Text>
                                        {ele.houseNumber},{ele.address},<br/>
                                        {ele.landMark},{ele.city} <br/>
                                        {ele.state} :- {ele.pincode} <br/>
                                        Mobile :- {ele.phoneNumber}
                                    </Card.Text>
                                    <Button variant="primary">Delete</Button>
                                    <Button  variant="primary" onClick={() => {handleClick(ele._id)}} >
                                        <Link to={`/account/addressForm/${ele._id}`} style={{color :'white'}} >Edit</Link></Button>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })
                ) : <>
                        <h4> No-Address-Found </h4>

                    </> } */}
        </div>
  )
}

export default ShowAddress

// address.length > 0 ? address?.map((ele) => {
//     return (
//         <Card key={ele._id} style={{width : '30rem'}} >
//             <Card.Body>
//                 <Card.Title> {ele.fullName}, {ele.addressType} </Card.Title>
//                 <Card.Text>
//                     {ele.houseNumber},{ele.address},<br/>
//                     {ele.landMark},{ele.city} <br/>
//                     {ele.state} :- {ele.pincode} <br/>
//                     Mobile :- {ele.phoneNumber}
//                 </Card.Text>
//                 <Button variant="primary">Delete</Button>
//                 <Button  variant="primary" onClick={() => {handleClick(ele._id)}} >
//                     <Link to={`/account/addressForm/${ele._id}`} style={{color :'white'}} >Edit</Link></Button>
//             </Card.Body>
//         </Card>
//     )
// }) : <div>
//         <h5>No-Address-Found</h5>
//     </div>