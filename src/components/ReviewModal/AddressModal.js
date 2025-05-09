import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  CircularProgress,
  IconButton,
  Fade,
  Alert,
  Stack
} from '@mui/material';
import {
  Close as CloseIcon,
  Home as HomeIcon,
  LocationOn as LocationOnIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddressModal = (props) => {
  const { show, handleClose, handleAddressId, handleCheckOut } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const addresses = useSelector(state => state.address.address);
  
  useEffect(() => {
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddressChange = (event) => {
    const addressId = event.target.value;
    setSelectedAddress(addressId);
    handleAddressId(addressId);
  };
  
  const handleAddNewAddress = () => {
    handleClose();
    navigate('/account/address/new');
  };
  
  const renderAddressCard = (address) => {
    const isSelected = selectedAddress === address._id;
    
    return (
      <Card
        key={address._id}
        elevation={0}
        sx={{
          mb: 2,
          border: `1px solid ${isSelected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2,
          transition: 'all 0.2s ease',
          transform: isSelected ? 'translateY(-3px)' : 'none',
          boxShadow: isSelected 
            ? `0 8px 16px ${alpha(theme.palette.primary.main, 0.15)}`
            : '0 2px 8px rgba(0,0,0,0.05)',
          position: 'relative',
          overflow: 'hidden',
          ...(isSelected && {
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            }
          })
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <FormControlLabel
            value={address._id}
            control={
              <Radio 
                color="primary"
                checked={isSelected}
              />
            }
            label={
              <Box sx={{ ml: 1 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                  {address.fullName}
                  {address.defaultAdd && (
                    <Typography 
                      component="span" 
                      variant="caption" 
                      sx={{ 
                        ml: 1,
                        px: 1, 
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 600
                      }}
                    >
                      Default
                    </Typography>
                  )}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <HomeIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.disabled }} />
                        {address.houseNumber}, {address.address}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.disabled }} />
                        {address.city}, {address.state}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>PIN:</strong> {address.pincode}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Phone:</strong> {address.phoneNumber}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            }
            sx={{ 
              alignItems: 'flex-start',
              m: 0, 
              width: '100%'
            }}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
      }}>
        <Typography variant="h5" fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Select Delivery Address
        </Typography>
        <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3, pb: 1, px: { xs: 2, sm: 3 } }}>
        {isLoading ? (
          <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : addresses?.length > 0 ? (
          <Fade in={!isLoading}>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                aria-label="address"
                name="address"
                value={selectedAddress}
                onChange={handleAddressChange}
              >
                {addresses.map(renderAddressCard)}
              </RadioGroup>
            </FormControl>
          </Fade>
        ) : (
          <Alert 
            severity="info" 
            variant="outlined"
            sx={{ mb: 2 }}
            action={
              <Button 
                color="primary" 
                size="small" 
                startIcon={<AddIcon />}
                onClick={handleAddNewAddress}
              >
                Add New
              </Button>
            }
          >
            You don't have any saved addresses. Add an address to continue.
          </Alert>
        )}
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddNewAddress}
          >
            Add New Address
          </Button>
        </Box>
      </DialogContent>
      
      <Divider />
      
      <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
        <Button 
          variant="outlined" 
          onClick={handleClose}
          sx={{ 
            borderRadius: '8px', 
            px: 3
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckOut}
          disabled={!selectedAddress}
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            borderRadius: '8px',
            px: 3,
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
            },
          }}
        >
          Proceed to Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
