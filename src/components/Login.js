import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import axios from '../config/axios';
import { UserContext } from '../App';
import { startGetUserAddress } from '../actions/address-action';
import { startSetWishlist } from '../actions/wishlist-action';
import { startSetCart } from '../actions/product-action';
import { startGetOrder } from '../actions/order-action';
import { startGetReview } from '../actions/review-action';
import { startGetCategories } from '../actions/category-action';
import { startGetAllOrders } from '../actions/order-action';
import { startGetProcurement } from '../actions/procurement-action';

// Material UI imports
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Stack,
  useTheme,
  useMediaQuery,
  alpha,
  IconButton,
  InputAdornment,
  Divider,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const LoginForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [serverFormErrors, setServerFormErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const errors = {};
  const { userDispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  if (location.state?.msg) {
    console.log('boom');
    toast.success(location.state.msg);
  }
  
  const notify = (msg) => toast.error(msg);
  
  const runValidations = () => {
    if (email.length === 0) {
      errors.email = 'Email is required';
    }
    if (password.length === 0) {
      errors.password = 'Password is required';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    }
    else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
        {'© '}
        {new Date().getFullYear()}{' '}
        <Link to='/' style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 500 }}>
          Book Store
        </Link>
        {'. All rights reserved.'}
      </Typography>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    runValidations();
    if (Object.keys(errors).length === 0) {
      const formData = {
        email,
        password
      };
      setFormErrors({});
      try {
        const response = await axios.post('/api/login', formData);
        localStorage.setItem('token', response.data.token);
        const profile = await axios.get('/api/users/profile', {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        userDispatch({ type: 'USER_LOGIN', payload: profile.data });
        console.log('r', profile.data.role);
        if (profile.data.role === 'user') {
          dispatch(startGetUserAddress());
          dispatch(startGetCategories());
          dispatch(startSetWishlist());
          dispatch(startSetCart());
          dispatch(startGetOrder());
          dispatch(startGetReview());
          dispatch(startGetProcurement());
        } else if (profile.data.role === 'admin') {
          dispatch(startGetAllOrders(null));
          dispatch(startGetProcurement());
        } else if (profile.data.role === 'moderator') {
          dispatch(startGetProcurement());
        }
        profile.data.role === 'moderator' ? navigate('/notifications') : navigate('/', { state: { msg: 'Login Successful' } });
      }
      catch (e) {
        setServerFormErrors(e.response.data.errors);
      }
    }
    else {
      setFormErrors(errors);
    }
  };

  useEffect(() => {
    const loginErr = serverFormErrors.find((err) => err.msg);
    if (loginErr) {
      notify(loginErr.msg);
    }
  }, [serverFormErrors]);
  
  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (location.state?.msg) {
      toast.success(location.state.msg);
    }
  }, []);

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '82vh',
        py: 4,
        px: 2,
        bgcolor: 'background.default'
      }}
    >
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Container maxWidth="sm">
        <Paper 
          elevation={0} 
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            }
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 4 }}>
            <LoginOutlinedIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back
            </Typography>
          </Stack>

          {serverFormErrors.length > 0 && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': { alignItems: 'center' }
              }}
            >
              <Stack>
                {serverFormErrors.map(ele => (
                  <Typography key={ele.msg} variant="body2">{ele.msg}</Typography>
                ))}
              </Stack>
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2
                    }
                  }
                }}
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2
                    }
                  }
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    Remember me
                  </Typography>
                }
                sx={{ 
                  alignSelf: 'flex-start',
                  mt: 0,
                  mb: 0
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowRightAltIcon />}
                  sx={{
                    borderRadius: 8,
                    py: 1.2,
                    px: 4,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Sign In
                </Button>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" align="center" color="text.secondary">
                Don't have an account?{' '}
                <Typography
                  component={Link}
                  to="/register"
                  variant="body2"
                  color="primary"
                  sx={{ 
                    fontWeight: 600, 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Sign Up
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </Paper>
        <Copyright />
      </Container>
    </Box>
  );
};

export default LoginForm;
