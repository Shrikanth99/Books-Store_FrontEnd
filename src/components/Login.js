import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../config/axios';
import { useContext } from 'react'
import { UserContext } from '../App';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { startGetUserAddress } from '../actions/address-action'
import { startSetWishlist } from '../actions/wishlist-action';
import { startSetCart } from '../actions/product-action';
import { startGetOrder } from '../actions/order-action';
import { startGetReview } from '../actions/review-action';
import { startGetCategories } from '../actions/category-action';
import { startgetAllOrders } from '../actions/order-action';
import { startGetProcurement } from '../actions/procurement-action';


const LoginForm = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [serverFormErrors, setServerFormErrors] = useState([])
    const errors = {}
    const { userDispatch } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    if(location.state?.msg){
        console.log('boom')
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

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
           <Link to='/'>Your Website</Link>
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      
      
      const defaultTheme = createTheme();
      


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
                console.log('r',profile.data.role)
                if(profile.data.role === 'user'){
                    dispatch(startGetUserAddress())
                    dispatch(startGetCategories())
                    dispatch(startSetWishlist())
                    dispatch(startSetCart())
                    dispatch(startGetOrder())
                    dispatch(startGetReview())
                    dispatch(startGetProcurement())
                }else if( profile.data.role === 'admin' ){
                    dispatch(startgetAllOrders())
                    dispatch(startGetProcurement())
                }else if(profile.data.role === 'moderator' ){
                    dispatch(startGetProcurement())
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
    useEffect(()=>{
        localStorage.clear()
    },[])

    useEffect(()=>{
        if(location.state?.msg){
            toast.success(location.state.msg)
        }
    },[])

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
<ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} validate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
               <Link to="/register">Dont have an account?SignUp</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>


        </div>
    );
};

export default LoginForm;
