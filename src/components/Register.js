import React, { useEffect, useState } from 'react';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Paper,
  Alert,
  Stack,
  useTheme,
  useMediaQuery,
  alpha,
  IconButton,
  InputAdornment,
  Divider
} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const RegistrationForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('user');
  const [formErrors, setFormErrors] = useState({});
  const [serverFormErrors, setServerFormErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const errors = {};
  const navigate = useNavigate();

  const runValidations = () => {
    if (userName.length === 0) {
      errors.userName = 'Username is required';
    }

    if (email.length === 0) {
      errors.email = 'Email is required';
    }

    if (password.length === 0) {
      errors.password = 'Password is required';
    }

    if (phoneNumber.length === 0) {
      errors.phoneNumber = 'Phone number is required';
    } else if (phoneNumber.length !== 10) {
      errors.phoneNumber = 'Phone number must be 10 digits';
    }
    
    if (role.length === 0) {
      errors.role = 'Please select a role';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (name === 'role') {
      setRole(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    runValidations();
    if (Object.keys(errors).length === 0) {
      const formData = {
        userName,
        email,
        password,
        phoneNumber,
        role
      };
      try {
        if (role === 'moderator') {
          localStorage.setItem('registerFormData', JSON.stringify(formData));
          navigate('/account/addressForm');
        } else {
          setFormErrors({});
          const response = await axios.post('/api/register', formData);
          navigate('/login');
        }
      } catch (e) {
        console.log('try-ct', e);
        setServerFormErrors(e.response.data.errors);
      }
    } else {
      console.log('if', errors);
      setFormErrors(errors);
    }
  };

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('registerFormData')) || {};
    setUsername(savedFormData.userName || '');
    setEmail(savedFormData.email || '');
    setPhoneNumber(savedFormData.phoneNumber || '');
    setPassword(savedFormData.password || '');
    setRole(savedFormData.role || '');
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
            <HowToRegOutlinedIcon color="primary" sx={{ fontSize: 32 }} />
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
              Create Account
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
                id="username"
                name="username"
                label="Username"
                value={userName}
                onChange={handleChange}
                error={!!formErrors.userName}
                helperText={formErrors.userName}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon color="action" />
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
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
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

              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={handleChange}
                error={!!formErrors.phoneNumber}
                helperText={formErrors.phoneNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon color="action" />
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

              <FormControl component="fieldset" error={!!formErrors.role}>
                <FormLabel component="legend" sx={{ fontWeight: 500, mb: 1, color: 'text.primary' }}>
                  Select Role
                </FormLabel>
                <RadioGroup
                  name="role"
                  value={role}
                  onChange={handleChange}
                  row
                  sx={{ ml: 1 }}
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio color="primary" />}
                    label="Admin"
                    sx={{ mr: 3 }}
                  />
                  <FormControlLabel
                    value="user"
                    control={<Radio color="primary" />}
                    label="User"
                    sx={{ mr: 3 }}
                  />
                  <FormControlLabel
                    value="moderator"
                    control={<Radio color="primary" />}
                    label="Moderator"
                  />
                </RadioGroup>
                {formErrors.role && (
                  <Typography color="error" variant="caption" sx={{ mt: 0.5, ml: 1.5 }}>
                    {formErrors.role}
                  </Typography>
                )}
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={role === 'moderator' ? <ArrowForwardIcon /> : <ArrowRightAltIcon />}
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
                  {role === 'moderator' ? 'Next' : 'Register'}
                </Button>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Typography variant="body2" align="center" color="text.secondary">
                Already have an account?{' '}
                <Typography
                  component="span"
                  variant="body2"
                  color="primary"
                  sx={{ 
                    fontWeight: 600, 
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationForm;
