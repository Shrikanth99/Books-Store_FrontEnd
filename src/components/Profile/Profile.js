import React,{useState,useContext, useEffect} from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Profile = () => {
  const {userState} = useContext(UserContext)
  console.log(userState,'mp')
  const {user} = userState
  console.log(user,'us')

    const [userName,setUsername] = useState(user? user?.userName : '')
    const [email,setEmail] = useState(user ?  user.email :'')
    const [phoneNumber,setPhoneNumber] = useState(user ? user.phoneNumber : '')
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
  
      if(phoneNumber.length === 0){
          errors.phoneNumber = 'phoneNumber is required'
      }
      else if(phoneNumber.length !== 10){
          errors.phoneNumber = 'phoneNumber must be of 10 digits'
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
      
      else if(name == 'phoneNumber'){
          setPhoneNumber(value)
      }
      
    };
  
    // const handleSubmit = async(e) => {
    //   e.preventDefault();
    //   runValidations()
    //   if(Object.keys(errors).length === 0){
    //       const formData = {
    //           userName,
    //           email,
    //           phoneNumber,
    //       }
    //       try{
    //           setFormErrors({})
    //           // const response = await axios.post('/api/register',formData)
    //           // navigate('/login')
    //       }
    //       catch(e){
    //           console.log(e)
    //           setServerFormErrors(e.response.data.errors)
    //       }
    //   }
    //   else{
    //       console.log(errors)
    //       setFormErrors(errors)
    //   }
    // };

    useEffect(() => {
      if(user){
        setUsername(user.userName)
        setEmail(user.email)
        setPhoneNumber(user.phoneNumber)
      }
    },[user])
  
    return (
      <div>
          {serverFormErrors.length > 0 && (
                <div className="alert alert-danger">
                  {serverFormErrors.map(ele => (
                    <li key={ele.msg}>{ele.msg}</li>
                  ))}
                </div>
              )}
    
      <Container style={{maxWidth:'768px',marginTop:'100px',border:'1px solid grey',padding:'20px',borderRadius:'10px'}}>
        <Form >
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className={`${formErrors.userName ? 'is-invalid' : ''}`}
              type="text"
              placeholder="Enter username"
              name="username"
              value={userName}
              onChange={handleChange}
              readOnly
            />
            {formErrors.userName && (
              <div className='invalid-feedback'>{formErrors.userName}</div>
            )}
          </Form.Group>
  
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              readOnly
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
  
          
  
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              readOnly
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
  
          
          <div className='text-center'>
          {/* <Button variant="primary" type="submit">
            Register
          </Button> */}
          </div>
        </Form>
      </Container>
      </div>
  );
}

export default Profile
