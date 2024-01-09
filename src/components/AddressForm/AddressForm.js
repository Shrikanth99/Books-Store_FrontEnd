import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startEditAddress, startNewAddress } from '../../actions/address-action';
import { useContext } from 'react';
import { UserContext } from '../../App';

const AddressForm = () => {
  const {id} = useParams()
  console.log('ParamsId',id)
  const {userState} = useContext(UserContext)
  // console.log('af',userState)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const [foundAddress,setFoundAddress] = useState({})

  const {address} = useSelector(state => state.address )
  console.log('sa',address)

  const userId = userState?.user._id
  // console.log('id',userId)
  let foundAddress = address.find((ele) => {
    return ele._id === id
  })
  
  if(localStorage.getItem('addressFormData')){
    foundAddress = JSON.parse(localStorage.getItem('addressFormData'))
    console.log('lucy',foundAddress)
  }


  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.number().required('Phone Number is required'),
    houseNumber: Yup.string().required('House Number is required'),
    address: Yup.string().required('Address is required'),
    landMark: Yup.string().required('Landmark is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    pincode: Yup.number().required('Pin Code is required'),
    addressType: Yup.string().required('Address Type is required').oneOf(['Home', 'Office'])
    //defaultAdd: Yup.boolean().required('Default Address is required'),
  });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues : {
        fullName: foundAddress ? foundAddress.fullName : '',
        phoneNumber: foundAddress ? foundAddress.phoneNumber : '',
        houseNumber: foundAddress ? foundAddress.houseNumber : '',
        address: foundAddress ? foundAddress.address : '',
        landMark: foundAddress ? foundAddress.landMark : '',
        city:foundAddress ? foundAddress.city : '',
        state: foundAddress ? foundAddress.state : '',
        country: foundAddress ? foundAddress.country : '',
        pincode: foundAddress ? foundAddress.pincode : '',
        addressType: foundAddress ? foundAddress.addressType : 'Home',
        defaultAdd: false,
    },
    validationSchema : validationSchema,
    validateOnChange: false, 
    validateOnBlur : false,
    onSubmit : (formData,{resetForm}) => {
        // localStorage.setItem('addressFormData',JSON.stringify(formData))
        console.log('fd',formData)
        const redirect = () => {
          navigate('/account/address', { state: { msg: 'Address added' } })
        }
        const redirect2 = () =>{
          navigate('/login',{state:{msg: 'Address successfully added'}})
        }
        // if(l){
        //   dispatch(startEditAddress({formData,resetForm,redirect,id}))
        // } else {
        //   dispatch(startNewAddress(formData,resetForm,redirect))
        // }
        if(localStorage.getItem('addressFormData') && foundAddress){
          dispatch(startNewAddress(formData,resetForm,redirect2))
        }
        else if(localStorage.getItem('token') && foundAddress){
          dispatch(startEditAddress({formData,resetForm,redirect,id}))
        }
        else{
          formData.userId = userId
          dispatch(startNewAddress(formData,resetForm,redirect))
        }
    }

  })

  const handleBack = () => {
    navigate('/register')
  }

  const handleClick = () => {
    // foundAddress = undefined
    navigate('/account/address')
  }

  const handleChange = (e) =>{
    if(e.target.name === 'fullName'){
      formik.setFieldValue('fullName',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,fullName:e.target.value}))
      }
    }
     else if(e.target.name === 'phoneNumber'){
      formik.setFieldValue('phoneNumber',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,phoneNumber:e.target.value}))
      }
    }
    else if(e.target.name === 'houseNumber'){
      formik.setFieldValue('houseNumber',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,houseNumber:e.target.value}))
      }
    }
    else if(e.target.name === 'address'){
      formik.setFieldValue('address',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,address:e.target.value}))
      }
    }
    else if(e.target.name === 'landMark'){
      formik.setFieldValue('landMark',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,landMark:e.target.value}))
      }
    }
    else if(e.target.name === 'city'){
      formik.setFieldValue('city',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,city:e.target.value}))
      }
    }
    else if(e.target.name === 'state'){
      formik.setFieldValue('state',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,state:e.target.value}))
      }
    }
    else if(e.target.name === 'country'){
      formik.setFieldValue('country',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,country:e.target.value}))
      }
    }
    else if(e.target.name === 'pincode'){
      formik.setFieldValue('pincode',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,pincode:e.target.value}))
      }
    }
    else if(e.target.name === 'addressType'){
      formik.setFieldValue('addressType',e.target.value)
      if(!localStorage.getItem('token')){
        localStorage.setItem('addressFormData',JSON.stringify({...formik.values,addressType:e.target.value}))
      }
    }
    //console.log('ss',formik.values)
    // localStorage.setItem('addressFormData',JSON.stringify(formik.values))
    
  }
  
  // useEffect(()=>{
  //   console.log('booooooooooom')
  //   localStorage.setItem('addressFormData',JSON.stringify(formik.values))
  // },[formik.values])
  return (
    <Container style={{maxWidth:'730px',marginTop:'30px',border:'1px solid grey',padding:'20px',borderRadius:'10px'}} >
      <h2>Address Form</h2>
      <Form onSubmit={formik.handleSubmit} >
        <Form.Group controlId="fullName">
          <Form.Label>Full-Name</Form.Label>
          <Form.Control
            className={`${formik.errors.fullName ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Enter username"
            name="fullName"
            value={formik.values.fullName}
            onChange={handleChange}

          />
          {formik.errors.fullName && (
            <div className='invalid-feedback'>{formik.errors.fullName}</div>
          )}
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Mobile-Number </Form.Label>
          <Form.Control
            className={`${formik.errors.phoneNumber ? 'is-invalid' : ''}`}
            type="number"
            placeholder="Enter-Mobile-Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={handleChange}

          />
          {formik.errors.phoneNumber && (
            <div className='invalid-feedback'>{formik.errors.phoneNumber}</div>
          )}
        </Form.Group>
        <Form.Group controlId="houseNumber">
          <Form.Label>House-Number</Form.Label>
          <Form.Control
            className={`${formik.errors.houseNumber ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Enter houseNumber"
            name="houseNumber"
            value={formik.values.houseNumber}
            onChange={handleChange}

          />
          {formik.errors.houseNumber && (
            <div className='invalid-feedback'>{formik.errors.houseNumber}</div>
          )}
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            className={`${formik.errors.address ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Enter Address"
            name="address"
            value={formik.values.address}
            onChange={handleChange}

          />
          {formik.errors.address && (
            <div className='invalid-feedback'>{formik.errors.address}</div>
          )}
        </Form.Group>
        <Form.Group controlId="landMark">
          <Form.Label>Landmark</Form.Label>
          <Form.Control
            className={`${formik.errors.landMark ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Enter username"
            name="landMark"
            value={formik.values.landMark}
            onChange={handleChange}

          />
          {formik.errors.landMark && (
            <div className='invalid-feedback'>{formik.errors.landMark}</div>
          )}
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            className={`${formik.errors.state ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Enter State"
            name="state"
            value={formik.values.state}
            onChange={handleChange}

          />
          {formik.errors.state && (
            <div className='invalid-feedback'>{formik.errors.state}</div>
          )}
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            className={`${formik.errors.city ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Enter City"
            name="city"
            value={formik.values.city}
            onChange={handleChange}

          />
          {formik.errors.city && (
            <div className='invalid-feedback'>{formik.errors.city}</div>
          )}
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            className={`${formik.errors.country ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Enter Country "
            name="country"
            value={formik.values.country}
            onChange={handleChange}

          />
          {formik.errors.country && (
            <div className='invalid-feedback'>{formik.errors.country}</div>
          )}
        </Form.Group>
        <Form.Group controlId="pincode">
          <Form.Label>Pin-Code</Form.Label>
          <Form.Control
            className={`${formik.errors.pinCode ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Enter Your Pin-Code "
            name="pincode"
            value={formik.values.pincode}
            onChange={handleChange}

          />
          {formik.errors.pincode && (
            <div className='invalid-feedback'>{formik.errors.pincode}</div>
          )}
        </Form.Group>
        <Form.Group as={Row} controlId="addType" >
            <Form.Label as="legend" column sm={2} >
            Address-Type
            </Form.Label>
            <Col sm={10}>
            <Form.Check
                type="radio"
                label="Home"
                name="addressType"
                value='Home'
                checked={formik.values.addressType === 'Home'}
                onChange={handleChange}
                
            />
            <Form.Check
                type="radio"
                label="Office"
                name="addressType"
                value='Office'
                checked={formik.values.addressType === 'Office'}
                onChange={handleChange}
                
            />
              {formik.errors.addressType && (
                <div className='invalid-feedback'>{formik.errors.addressType}</div>
              )}
            </Col>
        </Form.Group>

        <Form.Group  >
            <Form.Check
                type='checkbox'
                label='Default-Address'
                name='defaultAdd'
                value={formik.values.defaultAdd}
                onChange={handleChange}
                
            />
        </Form.Group>

        { localStorage.getItem('token') && foundAddress? <> 
                          <Button variant="primary" type='submit'  >Update</Button> 
                          <Button variant="danger" type='submit' onClick={handleClick} >Cancel</Button>
                         </> : <>
                                { localStorage.getItem('registerFormData') && <Button variant='primary' onClick={handleBack}  >Back</Button> }
                                <Button variant="primary" type="submit" className="ml-10 mt-3" >
                                  Add Address
                                </Button>
                              </> 
        }


      </Form>
      
    </Container>
  );
};

export default AddressForm;
