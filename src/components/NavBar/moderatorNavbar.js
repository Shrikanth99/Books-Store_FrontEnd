import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../images/logo.png';

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
  Close as CloseIcon
} from '@mui/icons-material';

const ModeratorNavBar = () => {
  const { userDispatch } = useContext(UserContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // States
  const [anchorEl, setAnchorEl] = useState(null);
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
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
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
      handleMenuClose();
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
  
  const isMenuOpen = Boolean(anchorEl);
  
  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
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
          Moderator Panel
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage procurement
        </Typography>
      </Box>
      <Divider />
      <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
        <ListItemIcon>
          <DashboardIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Dashboard</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => { navigate('/notifications'); handleMenuClose(); }}>
        <ListItemIcon>
          <Badge badgeContent={pendingProcurements.length} color="error" sx={{ '& .MuiBadge-badge': { right: -3, top: 3 } }}>
            <NotificationsIcon fontSize="small" />
          </Badge>
        </ListItemIcon>
        <ListItemText>Notifications</ListItemText>
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
  
  const drawer = (
    <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={logo} 
            alt="Logo" 
            sx={{ 
              width: 42, 
              height: 42,
              mr: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            }} 
          />
          <Typography variant="h6" fontWeight={600}>
            Book Store
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} edge="end" sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ pt: 1 }}>
        <ListItem button onClick={() => { navigate('/dashboard'); handleDrawerToggle(); }}>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => { navigate('/notifications'); handleDrawerToggle(); }}>
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
          background: `linear-gradient(90deg, #092b5a, #1565c0)`,
          borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ px: { xs: 1, sm: 2 } }}>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box 
              component={Link} 
              to="/dashboard" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <Avatar 
                src={logo} 
                alt="Logo" 
                sx={{ 
                  width: 45, 
                  height: 45,
                  bgcolor: 'white',
                  p: 0.5,
                  mr: 1,
                  boxShadow: `0 0 10px ${alpha(theme.palette.common.white, 0.3)}`,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }} 
              />
              {!isMobile && (
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    ml: 1,
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'white',
                  }}
                >
                  MODERATOR
                </Typography>
              )}
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
              <Tooltip title={pendingProcurements.length ? `${pendingProcurements.length} pending notifications` : 'No new notifications'}>
                <IconButton 
                  size="large" 
                  color="inherit"
                  onClick={handleNotificationsClick}
                  sx={{
                    position: 'relative',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
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
              
              {!isMobile && (
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <LogoutIcon />}
                  color="error"
                  sx={{
                    borderRadius: 8,
                    textTransform: 'none',
                    px: 2,
                    bgcolor: alpha(theme.palette.error.main, 0.9),
                    '&:hover': {
                      bgcolor: theme.palette.error.main,
                    }
                  }}
                >
                  Logout
                </Button>
              )}
              
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ 
                  ml: { xs: 0, md: 1 },
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: alpha(theme.palette.common.white, 0.15),
                    '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.25) }
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </IconButton>
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
      
      {renderMenu}
      
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
