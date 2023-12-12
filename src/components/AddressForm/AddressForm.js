import React from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useFormik} from 'formik';
import * as Yup from 'yup';

const AddressForm = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.number().required('Phone Number is required'),
    houseNumber: Yup.string().required('House Number is required'),
    address: Yup.string().required('Address is required'),
    landMark: Yup.string().required('Landmark is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    pinCode: Yup.number().required('Pin Code is required'),
    addressType: Yup.string().required('Address Type is required').oneOf(['Home', 'Office']),
    defaultAdd: Yup.boolean().required('Default Address is required'),
  });

  const formik = useFormik({
    initialValues : {
        fullName: '',
        phoneNumber: '',
        houseNumber: '',
        address: '',
        landMark: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        addressType: '',
        defaultAdd: false,
    },
    validationSchema : validationSchema,
    validateOnChange: false, 
    validateOnBlur : false,
    onSubmit : (formData,{resetForm}) => {
        console.log('fd',formData)
        // resetForm()
    }

  })

  return (
    <Container style={{maxWidth:'768px',marginTop:'100px',border:'1px solid grey',padding:'20px',borderRadius:'10px'}} >
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

        <Button  variant="primary" type="submit" className="w-100 mt-3">
            Add Address
        </Button>


      </Form>
      
    </Container>
  );
};

export default AddressForm;
