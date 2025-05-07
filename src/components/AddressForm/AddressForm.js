import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startEditAddress, startNewAddress } from '../../actions/address-action';
import { useContext } from 'react';
import { UserContext } from '../../App';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Checkbox,
  Divider,
  Stack,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Alert,
  Autocomplete,
  useTheme,
  alpha,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Home as HomeIcon,
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Cancel as CancelIcon,
  Navigation as NavigationIcon,
  MyLocation as MyLocationIcon
} from '@mui/icons-material';

// Indian states for auto-complete
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal'
];

// Major cities for auto-complete
const popularCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad',
  'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Coimbatore'
];

const AddressForm = () => {
  const { id } = useParams();
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const [activeStep, setActiveStep] = useState(0);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  
  const { address } = useSelector(state => state.address);
  const userId = userState?.user._id;
  
  // Find address if editing
  const foundAddress = useMemo(() => {
    if (id) {
      return address.find(ele => ele._id === id);
    } else if (localStorage.getItem('addressFormData')) {
      return JSON.parse(localStorage.getItem('addressFormData'));
    }
    return null;
  }, [address, id]);
  
  // Form validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    houseNumber: Yup.string().required('House Number is required'),
    address: Yup.string().required('Address is required'),
    landMark: Yup.string().required('Landmark is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    pincode: Yup.string()
      .required('Pin Code is required')
      .matches(/^[0-9]{6}$/, 'Pin code must be 6 digits'),
    addressType: Yup.string().required('Address Type is required').oneOf(['Home', 'Office', 'Other'])
  });
  
  // Step validation schemas for the stepper
  const stepValidationSchemas = [
    Yup.object().shape({
      fullName: Yup.string().required('Full Name is required'),
      phoneNumber: Yup.string()
        .required('Phone Number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    }),
    Yup.object().shape({
      houseNumber: Yup.string().required('House Number is required'),
      address: Yup.string().required('Address is required'),
      landMark: Yup.string().required('Landmark is required'),
    }),
    Yup.object().shape({
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      country: Yup.string().required('Country is required'),
      pincode: Yup.string()
        .required('Pin Code is required')
        .matches(/^[0-9]{6}$/, 'Pin code must be 6 digits'),
    }),
  ];
  
  // Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: foundAddress ? foundAddress.fullName : '',
      phoneNumber: foundAddress ? foundAddress.phoneNumber : '',
      houseNumber: foundAddress ? foundAddress.houseNumber : '',
      address: foundAddress ? foundAddress.address : '',
      landMark: foundAddress ? foundAddress.landMark : '',
      city: foundAddress ? foundAddress.city : '',
      state: foundAddress ? foundAddress.state : '',
      country: foundAddress ? foundAddress.country : 'India', // Default to India
      pincode: foundAddress ? foundAddress.pincode : '',
      addressType: foundAddress ? foundAddress.addressType : 'Home',
      defaultAdd: foundAddress ? foundAddress.defaultAdd : false,
    },
    validationSchema: validationSchema,
    onSubmit: (formData, { resetForm }) => {
      const redirect = () => {
        navigate('/account/address', { state: { msg: foundAddress ? 'Address updated' : 'Address added' } });
      };
      
      const redirect2 = () => {
        navigate('/login', { state: { msg: 'Address successfully added' } });
      };
      
      if (localStorage.getItem('addressFormData') && foundAddress) {
        dispatch(startNewAddress(formData, resetForm, redirect2));
      } else if (localStorage.getItem('token') && foundAddress) {
        dispatch(startEditAddress({ formData, resetForm, redirect, id }));
      } else {
        formData.userId = userId;
        dispatch(startNewAddress(formData, resetForm, redirect));
      }
    }
  });
  
  // Get user's current location
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    
    setLocationLoading(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Use reverse geocoding to get address details from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          
          if (!response.ok) throw new Error('Failed to fetch location data');
          
          const data = await response.json();
          const address = data.address;
          
          // Update form with location data
          formik.setFieldValue('address', data.display_name.split(',').slice(0, 2).join(', '));
          if (address.road) formik.setFieldValue('landMark', address.road);
          if (address.city || address.town) formik.setFieldValue('city', address.city || address.town);
          if (address.state) formik.setFieldValue('state', address.state);
          if (address.postcode) formik.setFieldValue('pincode', address.postcode);
          
          setLocationLoading(false);
          setIsUsingCurrentLocation(true);
        } catch (error) {
          setLocationError('Could not fetch address from your location');
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationError(`Error getting location: ${error.message}`);
        setLocationLoading(false);
      }
    );
  }, [formik]);
  
  // Handle back navigation
  const handleBack = () => {
    navigate('/register');
  };
  
  // Handle cancel
  const handleCancel = () => {
    navigate('/account/address');
  };
  
  // Next step in stepper
  const handleNext = async () => {
    try {
      await stepValidationSchemas[activeStep].validate(formik.values, { abortEarly: false });
      setActiveStep((prevStep) => prevStep + 1);
    } catch (err) {
      // Manually set errors for just the fields in the current step
      const errors = {};
      err.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      formik.setErrors({ ...formik.errors, ...errors });
    }
  };
  
  // Previous step in stepper
  const handleBack2 = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  // Render form steps
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                Personal Information
              </Typography>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                Address Details
              </Typography>
              
              {/* Location button */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={locationLoading ? <CircularProgress size={20} /> : <MyLocationIcon />}
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  sx={{ 
                    borderRadius: 8, 
                    textTransform: 'none',
                    px: 2,
                    py: 1
                  }}
                >
                  {locationLoading ? 'Getting Location...' : 'Use My Current Location'}
                </Button>
                
                {isUsingCurrentLocation && (
                  <Chip 
                    label="Location Used" 
                    color="success" 
                    size="small" 
                    icon={<CheckCircleOutlineIcon />} 
                    sx={{ ml: 2 }}
                  />
                )}
              </Box>
              
              {locationError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {locationError}
                </Alert>
              )}
              
              <TextField
                fullWidth
                label="House/Flat Number"
                name="houseNumber"
                value={formik.values.houseNumber}
                onChange={formik.handleChange}
                error={formik.touched.houseNumber && Boolean(formik.errors.houseNumber)}
                helperText={formik.touched.houseNumber && formik.errors.houseNumber}
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Street Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                variant="outlined"
                margin="normal"
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Landmark"
                name="landMark"
                value={formik.values.landMark}
                onChange={formik.handleChange}
                error={formik.touched.landMark && Boolean(formik.errors.landMark)}
                helperText={formik.touched.landMark && formik.errors.landMark}
                variant="outlined"
                margin="normal"
                placeholder="Nearby landmark for easier navigation"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                Location Information
              </Typography>
              
              <Autocomplete
                freeSolo
                options={popularCities}
                value={formik.values.city}
                onChange={(event, newValue) => {
                  formik.setFieldValue('city', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    variant="outlined"
                    margin="normal"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              
              <Autocomplete
                freeSolo
                options={indianStates}
                value={formik.values.state}
                onChange={(event, newValue) => {
                  formik.setFieldValue('state', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="State"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    variant="outlined"
                    margin="normal"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Pin Code"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutlineIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                Final Details
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  Address Type
                </FormLabel>
                <RadioGroup
                  row
                  name="addressType"
                  value={formik.values.addressType}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Home"
                    control={<Radio color="primary" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <HomeIcon sx={{ mr: 0.5, fontSize: 20, color: theme.palette.primary.main }} />
                        <Typography variant="body2">Home</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="Office"
                    control={<Radio color="secondary" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BusinessIcon sx={{ mr: 0.5, fontSize: 20, color: theme.palette.secondary.main }} />
                        <Typography variant="body2">Office</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio color="default" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon sx={{ mr: 0.5, fontSize: 20, color: theme.palette.text.secondary }} />
                        <Typography variant="body2">Other</Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
                {formik.touched.addressType && formik.errors.addressType && (
                  <FormHelperText error>{formik.errors.addressType}</FormHelperText>
                )}
              </FormControl>
              
              <FormControlLabel
                control={
                  <Checkbox
                    name="defaultAdd"
                    checked={formik.values.defaultAdd}
                    onChange={formik.handleChange}
                    color="primary"
                  />
                }
                label="Set as default address"
              />
              
              <Box sx={{ mt: 3, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Address Summary
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 120 }}>
                      Name:
                    </Typography>
                    <Typography variant="body2">{formik.values.fullName}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 120 }}>
                      Phone:
                    </Typography>
                    <Typography variant="body2">{formik.values.phoneNumber}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 120 }}>
                      Address:
                    </Typography>
                    <Typography variant="body2">
                      {formik.values.houseNumber}, {formik.values.address},
                      {formik.values.landMark && ` ${formik.values.landMark},`} {formik.values.city}, {formik.values.state}, {formik.values.country} - {formik.values.pincode}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 120 }}>
                      Type:
                    </Typography>
                    <Typography variant="body2">{formik.values.addressType}</Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };
  
  // Save form data to localStorage for non-logged in users
  useEffect(() => {
    if (!localStorage.getItem('token') && Object.keys(formik.values).length > 0) {
      localStorage.setItem('addressFormData', JSON.stringify(formik.values));
    }
  }, [formik.values]);
  
  return (
    <Box 
      sx={{ 
        py: 5, 
        minHeight: '90vh',
        bgcolor: 'background.default',
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.default, 1)})`
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
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
          <Box 
            sx={{ 
              p: 3, 
              bgcolor: alpha(theme.palette.primary.light, 0.05),
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LocationOnIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
              {foundAddress ? 'Update Address' : 'Add New Address'}
            </Typography>
          </Box>
          
          <Box sx={{ px: 4, py: 3 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              <Step>
                <StepLabel>Personal Info</StepLabel>
              </Step>
              <Step>
                <StepLabel>Address Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Location</StepLabel>
              </Step>
              <Step>
                <StepLabel>Confirm</StepLabel>
              </Step>
            </Stepper>
            
            <form onSubmit={formik.handleSubmit}>
              {getStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                {activeStep === 0 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    onClick={localStorage.getItem('registerFormData') ? handleBack : handleCancel}
                    sx={{
                      borderRadius: 8,
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 500
                    }}
                  >
                    {localStorage.getItem('registerFormData') ? 'Back to Register' : 'Cancel'}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleBack2}
                    sx={{
                      borderRadius: 8,
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 500
                    }}
                  >
                    Back
                  </Button>
                )}
                
                {activeStep === 3 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                    sx={{
                      borderRadius: 8,
                      px: 4,
                      py: 1.2,
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
                    {foundAddress ? 'Update Address' : 'Save Address'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{
                      borderRadius: 8,
                      px: 4,
                      py: 1.2,
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
                    Continue
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddressForm;
