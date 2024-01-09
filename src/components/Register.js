import React, { useEffect, useState} from 'react';
import axios from '../config/axios';
import { json, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

const RegistrationForm = () => {
  const [userName,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [role,setRole] = useState('user')
  const [formErrors,setFormErrors] = useState({})
  const [serverFormErrors,setServerFormErrors] = useState([])

  const errors = {}
  const navigate = useNavigate()
  const runValidations = () =>{
    // const emailValidation = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(userName.length === 0){
        errors.userName = 'username is required'
    }

    if(email.length === 0){
        errors.email = 'email is required'
    }
    // else if(!emailValidation.test(email)){
    //     errors.email = 'email format is invalid'
    // }

    if(password.length === 0){
        errors.password = 'password is required'
    }

    if(phoneNumber.length === 0){
        errors.phoneNumber = 'phoneNumber is required'
    }
    else if(phoneNumber.length !== 10){
        errors.phoneNumber = 'phoneNumber must be of 10 digits'
    }
    if(role.length === 0){
        errors.role = 'Please select any one role'
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name == 'username'){
        setUsername(value)
    }
    else if(name == 'email'){
        setEmail(value)
    }
    else if(name == 'password'){
        setPassword(value)
    }
    else if(name == 'phoneNumber'){
        setPhoneNumber(value)
    }
    else if(name == 'role'){
        setRole(value)  
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    runValidations()
    if(Object.keys(errors).length === 0){
        const formData = {
            userName,
            email,
            password,
            phoneNumber,
            role
        }
        try{
            if(role === 'moderator'){
              localStorage.setItem('registerFormData',JSON.stringify(formData) )
              navigate('/account/addressForm' )
            }else {
              setFormErrors({})
              const response = await axios.post('/api/register',formData)
              navigate('/login')
            }
            
        }
        catch(e){
            console.log(e)
            setServerFormErrors(e.response.data.errors)
        }
    }
    else{
        console.log(errors)
        setFormErrors(errors)
    }
  };

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('registerFormData')) || {};
    setUsername(savedFormData.userName || '')
    setEmail(savedFormData.email || '')
    setPhoneNumber(savedFormData.phoneNumber || '')
    setPassword(savedFormData.password || '')
    setRole(savedFormData.role || '')

  },[])

  return (
    <div style={{height:'463px'}}>
        {serverFormErrors.length > 0 && (
              <div className="alert alert-danger">
                {serverFormErrors.map(ele => (
                  <li key={ele.msg}>{ele.msg}</li>
                ))}
              </div>
            )}
  
    <Container style={{maxWidth:'768px',marginTop:'20px',border:'1px solid grey',padding:'20px',borderRadius:'10px'}}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className={`${formErrors.userName ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Enter username"
            name="username"
            value={userName}
            onChange={handleChange}
          />
          {formErrors.userName && (
            <div className='invalid-feedback'>{formErrors.userName}</div>
          )}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
           className={`${formErrors.email ? 'is-invalid' : ''}`}
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <div className='invalid-feedback'>{formErrors.email}</div>
          )}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            className={`${formErrors.password ? 'is-invalid' : ''}`}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
           {formErrors.password && (
            <div className='invalid-feedback'>{formErrors.password}</div>
          )}
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            className={`${formErrors.phoneNumber ? 'is-invalid' : ''}`}
            type="tel"
            placeholder="Enter phone number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
          {formErrors.phoneNumber && (
            <div className='invalid-feedback'>{formErrors.phoneNumber}</div>
          )}
        </Form.Group>

        <Form.Group as={Row} controlId="formGender">
          <Form.Label as="legend" column sm={2}>
            Role
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="admin"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={handleChange}
              required
            
            />
            <Form.Check
              type="radio"
              label="user"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={handleChange}
              required
             
            />
            <Form.Check
              type="radio"
              label="moderator"
              name="role"
              value="moderator"
              checked={role === 'moderator'}
              onChange={handleChange}
              required
            />
          </Col>
          {formErrors.role && (
            <div className='invalid-feedback'>{formErrors.role}</div>
          )}
        </Form.Group>
        <div className='text-center'>
          { role=== 'moderator' ? (<Button variant="primary" type="submit">
          Next
        </Button>) : (<Button variant="primary" type="submit">
          Register
        </Button>) }
        {/* <Button variant="primary" type="submit">
          Register
        </Button> */}
        </div>
      </Form>
    </Container>
    </div>
  );
};

export default RegistrationForm;
