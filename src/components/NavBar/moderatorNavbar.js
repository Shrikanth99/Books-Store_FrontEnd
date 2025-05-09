import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

// Material UI imports
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Divider,
  Button,
  useTheme,
  alpha,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Container,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  Add as AddIcon,
  ShoppingBag as ShoppingBagIcon,
  LocalLibraryOutlined
} from '@mui/icons-material';

const ModeratorNavBar = () => {
  const { userDispatch } = useContext(UserContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // States
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Selectors
  const allProcurements = useSelector(state => state.procurements.data || []);
  const pendingProcurements = allProcurements.filter(ele => ele.status === 'Pending');
  
  // Reset error state when component mounts
  useEffect(() => {
    setError(null);
  }, []);
  
  // Handle menu toggles
  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleLogout = () => {
    try {
      setIsLoading(true);
      localStorage.removeItem('token');
      userDispatch({ type: 'LOGOUT_USER' });
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout. Please try again.');
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
      handleProfileMenuClose();
    }
  };
  
  const handleErrorClose = () => {
    setError(null);
  };
  
  const handleNotificationsClick = () => {
    if (pendingProcurements.length === 0) {
      toast.info('You have no new notifications');
    } else {
      navigate('/notifications');
    }
  };
  
  const handleNavigate = (path) => {
    navigate(path);
    handleProfileMenuClose();
    setMobileOpen(false);
  };
  
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  
  // Profile Menu
  const renderProfileMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      id="profile-menu"
      keepMounted
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          borderRadius: 2,
          minWidth: 180,
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Moderator Account
        </Typography>

      </Box>
      <Divider />
      <MenuItem onClick={() => handleNavigate('/account/profile')}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>My Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/notifications')}>
        <ListItemIcon>
          <ShoppingBagIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Procurements</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout} disabled={isLoading}>
        <ListItemIcon>
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <LogoutIcon fontSize="small" color="error" />
          )}
        </ListItemIcon>
        <ListItemText sx={{ color: theme.palette.error.main }}>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
  
  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        bgcolor: alpha(theme.palette.primary.main, 0.03)
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalLibraryOutlined 
            sx={{ 
              fontSize: '2rem', 
              color: 'primary.main',
              mr: 1
            }} 
          />
          <Typography variant="h6" fontWeight={600}>
            Book Store
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'text.primary' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ pt: 1 }}>
        <ListItem button onClick={() => handleNavigate('/account/profile')}>
          <ListItemIcon>
            <PersonIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button onClick={() => handleNavigate('/notifications')}>
          <ListItemIcon>
            <ShoppingBagIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Procurements" />
        </ListItem>
        <ListItem button onClick={() => handleNavigate('/notifications')}>
          <ListItemIcon>
            <Badge badgeContent={pendingProcurements.length} color="error">
              {pendingProcurements.length > 0 ? (
                <NotificationsActiveIcon color="primary" />
              ) : (
                <NotificationsIcon color="primary" />
              )}
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        <ListItem 
          button 
          onClick={handleLogout}
          disabled={isLoading}
          sx={{ 
            color: theme.palette.error.main,
            '&.Mui-disabled': {
              opacity: 0.7,
            }
          }}
        >
          <ListItemIcon>
            {isLoading ? (
              <CircularProgress size={24} color="error" />
            ) : (
              <LogoutIcon color="error" />
            )}
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
  
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: 'background.paper',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: { xs: 1, md: 1.5 } }}>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08)
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box 
              component={Link} 
              to="/notifications" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <LocalLibraryOutlined 
                sx={{ 
                  fontSize: '2rem', 
                  color: 'primary.main',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }} 
              />
              {!isMobile && (
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    ml: 1.5,
                    fontWeight: 700,
                    color: 'text.primary',
                    textDecoration: 'none',
                  }}
                >
                  MODERATOR
                </Typography>
              )}
            </Box>
            
            {!isMobile && (
              <>
                <Button
                  component={Link}
                  to="/account/profile"
                  sx={{ 
                    ml: 3,
                    color: 'text.primary',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    borderRadius: 1,
                    px: 1.5,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    }
                  }}
                  startIcon={<PersonIcon />}
                >
                  Profile
                </Button>
                <Button
                  component={Link}
                  to="/notifications"
                  sx={{ 
                    ml: 2,
                    color: 'text.primary',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    borderRadius: 1,
                    px: 1.5,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    }
                  }}
                  startIcon={<ShoppingBagIcon />}
                >
                  Procurements
                </Button>
              </>
            )}
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
              <Tooltip title={pendingProcurements.length ? `${pendingProcurements.length} pending notifications` : 'No new notifications'}>
                <IconButton 
                  size="large" 
                  aria-label="notifications"
                  onClick={handleNotificationsClick}
                  sx={{
                    color: 'text.primary',
                    position: 'relative',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      bgcolor: alpha(theme.palette.primary.main, 0.08)
                    }
                  }}
                >
                  <Badge 
                    badgeContent={pendingProcurements.length} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        minWidth: '18px',
                        height: '18px',
                      }
                    }}
                  >
                    {pendingProcurements.length > 0 ? (
                      <NotificationsActiveIcon />
                    ) : (
                      <NotificationsIcon />
                    )}
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{ 
                  ml: { xs: 0, md: 1 },
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08)
                  }
                }}
              >
                <PersonIcon />
              </IconButton>
              
              {!isMobile && (
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <LogoutIcon />}
                  color="primary"
                  sx={{
                    ml: 1,
                    borderRadius: 1,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    px: 2,
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      borderColor: theme.palette.primary.main,
                    }
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Profile Menu */}
      {renderProfileMenu}
      
      {/* Error Handling */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleErrorClose} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModeratorNavBar;
