import React from 'react';
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

  const {address} = useSelector(state => state.address )
  console.log('sa',address)

  const userId = userState?.user._id
  // console.log('id',userId)

  let foundAddress = address.find((ele) => {
    return ele._id === id
  })
  console.log('Fadd',foundAddress)


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
        userId : userId,
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
        console.log('fd',formData)
        const redirect = () => {
          navigate('/account/address', { state: { msg: 'Address added' } })
        }
        if(foundAddress){
          dispatch(startEditAddress({formData,resetForm,redirect,id}))
        } else {
          dispatch(startNewAddress(formData,resetForm,redirect))
        }
    }

  })

  const handleClick = () => {
    // foundAddress = undefined
    navigate('/account/address')
  }


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
            onChange={formik.handleChange}

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
            onChange={formik.handleChange}

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
            onChange={formik.handleChange}

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
            onChange={formik.handleChange}

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
            onChange={formik.handleChange}

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
            onChange={formik.handleChange}

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
            onChange={formik.handleChange}

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
            onChange={formik.handleChange}

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
            onChange={formik.handleChange}

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
                onChange={formik.handleChange}
                
            />
            <Form.Check
                type="radio"
                label="Office"
                name="addressType"
                value='Office'
                checked={formik.values.addressType === 'Office'}
                onChange={formik.handleChange}
                
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
                onChange={formik.handleChange}
                
            />
        </Form.Group>

        { foundAddress ? <> 
                          <Button variant="primary" type='submit'  >Update</Button> 
                          <Button variant="danger" type='submit' onClick={handleClick} >Cancel</Button>
                         </> : <>
                                <Button variant="primary" type="submit" className="w-100 mt-3" >
                                  Add Address
                                </Button>
                              </> 
        }


      </Form>
      
    </Container>
  );
};

export default AddressForm;
