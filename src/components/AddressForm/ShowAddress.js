import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startDeleteAddress } from '../../actions/address-action';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Paper,
  Divider,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Stack,
  Fade,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  useTheme,
  alpha,
  Alert
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import WarningIcon from '@mui/icons-material/Warning';

const ShowAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const theme = useTheme();
  
  const [editAdd, setEditAdd] = useState(false);
  const [addressForm, setAddressForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [filterType, setFilterType] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const { address } = useSelector(state => state.address);

  // Handle sort menu
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    handleSortClose();
  };

  // Handle address filters
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  // Handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Delete dialog handlers
  const openDeleteDialog = (addressId) => {
    setAddressToDelete(addressId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      dispatch(startDeleteAddress(addressToDelete));
      closeDeleteDialog();
    }
  };

  const handleFormAdd = useCallback(() => {
    setAddressForm(true);
    localStorage.setItem('addressForm', 'true');
    localStorage.removeItem('showAddToggle');
  }, []);

  const handleClick = useCallback((id) => {
    setEditAdd(true);
  }, []);
  
  // Function to handle retry when address loading fails
  const handleRetry = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setRetryCount(prev => prev + 1);
    // This would typically trigger a re-fetch from your Redux store
    // For this implementation, we'll simulate a check after a timeout
    setTimeout(() => {
      if (!address || address.length === 0) {
        setError('Could not load addresses. Please try again later.');
      }
      setIsLoading(false);
    }, 1000);
  }, [address]);

  // Apply filters and sorting to addresses
  const filteredAddresses = useMemo(() => {
    if (!address || address.length === 0) return [];
    
    let result = [...address];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(addr => 
        addr.fullName.toLowerCase().includes(query) ||
        addr.city.toLowerCase().includes(query) ||
        addr.state.toLowerCase().includes(query) ||
        (addr.pincode && String(addr.pincode).includes(query))
      );
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      result = result.filter(addr => addr.addressType.toLowerCase() === filterType.toLowerCase());
    }
    
    // Apply sorting
    if (sortOption === 'nameAsc') {
      result.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (sortOption === 'nameDesc') {
      result.sort((a, b) => b.fullName.localeCompare(a.fullName));
    } else if (sortOption === 'cityAsc') {
      result.sort((a, b) => a.city.localeCompare(b.city));
    } else if (sortOption === 'stateAsc') {
      result.sort((a, b) => a.state.localeCompare(b.state));
    }
    
    return result;
  }, [address, searchQuery, filterType, sortOption]);

  // Get address type icon
  const getAddressTypeIcon = (type) => {
    if (type.toLowerCase() === 'home') {
      return <HomeIcon />;
    } else if (type.toLowerCase() === 'work' || type.toLowerCase() === 'office') {
      return <BusinessIcon />;
    } else {
      return <LocationOnIcon />;
    }
  };

  // Get address type color
  const getAddressTypeColor = (type) => {
    if (type.toLowerCase() === 'home') {
      return 'primary';
    } else if (type.toLowerCase() === 'work' || type.toLowerCase() === 'office') {
      return 'secondary';
    } else {
      return 'default';
    }
  };

    useEffect(() => {
    const storesAddForm = localStorage.getItem('addressForm');
    if (storesAddForm === 'true') {
      setAddressForm(true);
    }
     
    // Simulate checking if addresses loaded correctly
    const timer = setTimeout(() => {
      if (!address) {
        setError('Unable to load addresses. The data might be unavailable.');
      } else if (address && address.length === 0 && filteredAddresses.length === 0) {
        // This is a normal "no addresses" state, not an error
        setError(null);
      }
      setIsLoading(false);
    }, 1000);
     
    return () => clearTimeout(timer);
  }, [address, filteredAddresses, retryCount]);

  return (
    <Box
      sx={{
        py: 5,
        minHeight: '90vh',
        bgcolor: 'background.default',
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.default, 1)})`
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            position: 'relative',
            mb: 4,
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
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
              My Addresses
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/account/addressForm"
              onClick={handleFormAdd}
              sx={{
                borderRadius: 8,
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
              Add New Address
            </Button>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Error Alert */}
            {error && (
              <Alert 
                severity="error" 
                variant="outlined"
                sx={{ 
                  mb: 3, 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}
                action={
                  <Button 
                    color="error" 
                    size="small" 
                    onClick={handleRetry}
                    sx={{ textTransform: 'none', fontWeight: 500 }}
                  >
                    Retry
                        </Button>
                }
              >
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {isLoading ? (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  flexDirection: 'column',
                  py: 6 
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    mb: 2
                  }}
                >
                  <LocationOnIcon 
                    fontSize="large" 
                    sx={{ 
                      color: theme.palette.primary.main,
                      animation: 'pulse 1.5s infinite ease-in-out',
                      '@keyframes pulse': {
                        '0%': {
                          transform: 'scale(0.95)',
                          opacity: 0.7,
                        },
                        '70%': {
                          transform: 'scale(1.1)',
                          opacity: 1,
                        },
                        '100%': {
                          transform: 'scale(0.95)',
                          opacity: 0.7,
                        },
                      },
                    }} 
                  />
                </Box>
                <Typography variant="body1" color="text.secondary">
                  Loading addresses...
                </Typography>
              </Box>
            ) : (
              <>
                {/* Search and Filter controls - only show when not in error state and data is loaded */}
                {!error && (
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        fullWidth
                        placeholder="Search addresses..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon color="action" />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label="All"
                          clickable
                          color={filterType === 'all' ? 'primary' : 'default'}
                          onClick={() => handleFilterChange('all')}
                          sx={{ fontWeight: 500 }}
                        />
                        <Chip
                          label="Home"
                          clickable
                          color={filterType === 'home' ? 'primary' : 'default'}
                          onClick={() => handleFilterChange('home')}
                          icon={<HomeIcon />}
                          sx={{ fontWeight: 500 }}
                        />
                        <Chip
                          label="Work"
                          clickable
                          color={filterType === 'work' ? 'primary' : 'default'}
                          onClick={() => handleFilterChange('work')}
                          icon={<BusinessIcon />}
                          sx={{ fontWeight: 500 }}
                        />
                      </Stack>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<SortIcon />}
                        onClick={handleSortClick}
                        sx={{
                          borderRadius: 8,
                          textTransform: 'none',
                          fontWeight: 500,
                        }}
                      >
                        Sort
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleSortClose}
                      >
                        <MenuItem onClick={() => handleSortChange('default')}>Default</MenuItem>
                        <MenuItem onClick={() => handleSortChange('nameAsc')}>Name (A-Z)</MenuItem>
                        <MenuItem onClick={() => handleSortChange('nameDesc')}>Name (Z-A)</MenuItem>
                        <MenuItem onClick={() => handleSortChange('cityAsc')}>City</MenuItem>
                        <MenuItem onClick={() => handleSortChange('stateAsc')}>State</MenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                )}

                {/* Address Grid or Empty State */}
                {filteredAddresses.length > 0 ? (
                  <Grid container spacing={3}>
                    {filteredAddresses.map((ele) => (
                      <Grid item xs={12} md={6} lg={4} key={ele._id}>
                        <Fade in={true} timeout={500}>
                          <Card
                            elevation={0}
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              borderRadius: 2,
                              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                              },
                              position: 'relative',
                              overflow: 'visible'
                            }}
                          >
                            <Chip
                              icon={getAddressTypeIcon(ele.addressType)}
                              label={ele.addressType}
                              color={getAddressTypeColor(ele.addressType)}
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: -10,
                                right: 16,
                                fontWeight: 500,
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                              }}
                            />
                            
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                              <Typography 
                                variant="h6" 
                                gutterBottom
                                sx={{ 
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: theme.palette.text.primary,
                                }}
                              >
                                <PersonIcon sx={{ mr: 1, fontSize: 20, color: theme.palette.primary.main }} />
                                {ele.fullName}
                              </Typography>
                              
                              <Divider sx={{ my: 1.5 }} />
                              
                              <Stack spacing={1.5} sx={{ mt: 2 }}>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  sx={{ 
                                    display: 'flex',
                                    alignItems: 'flex-start'
                                  }}
                                >
                                  <LocationOnIcon sx={{ mr: 1, mt: 0.3, fontSize: 18, color: theme.palette.primary.main, flexShrink: 0 }} />
                                  <span>
                                    {ele.houseNumber}, {ele.address}, 
                                    {ele.landMark && ` ${ele.landMark},`} {ele.city}, {ele.state} - {ele.pincode}
                                  </span>
                                </Typography>
                                
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  sx={{ 
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <PhoneIcon sx={{ mr: 1, fontSize: 18, color: theme.palette.primary.main }} />
                                  {ele.phoneNumber}
                                </Typography>
                              </Stack>
                            </CardContent>
                            
                            <CardActions 
                              sx={{ 
                                p: 2, 
                                pt: 0,
                                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                justifyContent: 'flex-end',
                                gap: 1
                              }}
                            >
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => openDeleteDialog(ele._id)}
                                sx={{
                                  borderRadius: 6,
                                  textTransform: 'none',
                                  fontWeight: 500,
                                }}
                              >
                                Delete
                              </Button>
                              
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                component={Link}
                                to={`/account/addressForm/${ele._id}`}
                                startIcon={<EditIcon />}
                                onClick={() => handleClick(ele._id)}
                                sx={{
                                  borderRadius: 6,
                                  textTransform: 'none',
                                  fontWeight: 500,
                                }}
                              >
                                Edit
                              </Button>
                            </CardActions>
                            </Card>
                        </Fade>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 6,
                      px: 2,
                    }}
                  >
                    {searchQuery || filterType !== 'all' ? (
                      <Alert
                        severity="info"
                        variant="outlined"
                        sx={{ 
                          display: 'inline-flex',
                          borderRadius: 2,
                          '& .MuiAlert-icon': { 
                            alignItems: 'center' 
                          }
                        }}
                      >
                        No addresses match your search or filter.
                      </Alert>
                    ) : (
                      <Stack spacing={1} alignItems="center">
                        <LocationOnIcon fontSize="large" color="disabled" sx={{ fontSize: 60, mb: 1, opacity: 0.3 }} />
                        <Typography variant="h6" color="text.secondary" fontWeight={500}>
                          No addresses found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Add a new address to get started
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<AddIcon />}
                          component={Link}
                          to="/account/addressForm"
                          onClick={handleFormAdd}
                          sx={{
                            mt: 2,
                            borderRadius: 8,
                            textTransform: 'none',
                            fontWeight: 500,
                          }}
                        >
                          Add Address
                        </Button>
                      </Stack>
                    )}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxWidth: 400
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon color="error" sx={{ mr: 1 }} />
            <Typography variant="h6">Confirm Deletion</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this address? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={closeDeleteDialog} 
            variant="outlined"
            sx={{ 
              borderRadius: 6,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            variant="contained"
            sx={{ 
              borderRadius: 6,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShowAddress;