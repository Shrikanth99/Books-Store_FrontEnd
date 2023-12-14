import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import axios from '../config/axios';
import { useContext } from 'react'
import { UserContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { startSetWishlist } from '../actions/wishlist-action';
import { startSetCart } from '../actions/product-action';


const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [serverFormErrors, setServerFormErrors] = useState([])
    const errors = {}
    const dispatch = useDispatch()
    const { userDispatch } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    if(location.state?.msg){
        toast.success(location.state.msg)
    }
    const notify = (msg) => toast.error(msg)
    const runValidations = () => {
        if (email.length === 0) {
            errors.email = 'email is required'
        }
        if (password.length === 0) {
            errors.password = 'password is required'
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'email') {
            setEmail(value)
        }
        else if (name === 'password') {
            setPassword(value)
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        runValidations()
        if (Object.keys(errors).length === 0) {
            const formData = {
                email,
                password
            }
            setFormErrors({})
            try {
                const response = await axios.post('/api/login', formData)
                localStorage.setItem('token', response.data.token)
                const profile = await axios.get('/api/users/profile', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                userDispatch({ type: 'USER_LOGIN', payload: profile.data })
                if(profile.data.role === 'user'){

                    dispatch(startSetWishlist())
                    dispatch(startSetCart())
                }
                navigate('/', { state: { msg: 'Login Successful' } })
                
            }
            catch (e) {
                setServerFormErrors(e.response.data.errors)
            }
        }
        else {
            setFormErrors(errors)
        }

    };

    useEffect(() => {
        const loginErr = serverFormErrors.find((err) => err.msg )
        //console.log('lE',loginErr)
        if(loginErr){
            notify(loginErr.msg)
        }
    },[serverFormErrors])

    return (
        <div>
            <ToastContainer />
            {serverFormErrors.length > 0 && (
                <div className="alert alert-danger">
                    {serverFormErrors.map(ele => (
                        <li key={ele.msg}>{ele.msg}</li>
                    ))}
                </div>
            )}
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Card style={{ width: '400px', borderRadius: '15px' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Welcome Back!</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                                {formErrors.email && (
                                    <div className='invalid-feedback'>{formErrors.email}</div>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    required
                                />
                                {formErrors.password && (
                                    <div className='invalid-feedback'>{formErrors.password}</div>
                                )}
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mt-3">
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginForm;
