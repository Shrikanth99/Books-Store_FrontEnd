import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { toast, Toaster } from 'react-hot-toast';
import logo from '../../images/logo.png';

// Material UI imports
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  alpha,
  CircularProgress,
  Divider,
  Snackbar,
  Alert,
  Slide
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Add as AddIcon,
  ShoppingBag as ShoppingBagIcon,
  BarChart as BarChartIcon,
  Dashboard as DashboardIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';

const AdminNavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { userDispatch } = useContext(UserContext);
  
  // State management
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAppBar, setShowAppBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const profileMenuOpen = Boolean(profileMenuAnchor);
  
  // Handle scroll behavior for AppBar
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY) {
          setShowAppBar(false);
        } else {
          setShowAppBar(true);
        }
      } else {
        setShowAppBar(true);
      }
      setLastScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);
  
  // Reset error state on mount
  useEffect(() => {
    setError(null);
  }, []);
  
  const handleToggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };
  
  const handleLogout = () => {
    try {
      setIsLoading(true);
      localStorage.removeItem('token');
      userDispatch({ type: 'LOGOUT_USER' });
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to log out. Please try again.");
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
      setMobileDrawerOpen(false);
      setProfileMenuAnchor(null);
    }
  };
  
  const handleErrorClose = () => {
    setError(null);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Products', path: '/products', icon: <CategoryIcon /> },
    { text: 'Add Product', path: '/add-product', icon: <AddIcon /> },
    { text: 'View Orders', path: '/all-Orders', icon: <ShoppingBagIcon /> },
    { text: 'Stats', path: '/stats', icon: <BarChartIcon /> },
  ];
  
  // Mobile drawer content
  const mobileDrawerContent = (
    <Box
      sx={{ width: 260 }}
      role="presentation"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.03)
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={logo}
            alt="Book Store"
            sx={{ 
              width: 40, 
              height: 40, 
              mr: 1.5,
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Admin Panel
          </Typography>
        </Box>
        <IconButton onClick={handleToggleMobileDrawer} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ pt: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={() => setMobileDrawerOpen(false)}
              sx={{
                py: 1.2,
                px: 3,
                borderRadius: 0,
                color: isActive(item.path) ? theme.palette.primary.main : 'inherit',
                bgcolor: isActive(item.path) ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              <ListItemIcon
                sx={{ 
                  minWidth: 36,
                  color: isActive(item.path) ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.6),
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 400
                }}
              />
              {isActive(item.path) && (
                <Box 
                  sx={{
                    width: 4,
                    height: 20,
                    borderRadius: 4,
                    bgcolor: theme.palette.primary.main,
                    ml: 1
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
        
        <Divider sx={{ my: 1.5 }} />
        
        {/* Logout in Drawer */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            disabled={isLoading}
            sx={{
              py: 1.2,
              px: 3,
              borderRadius: 0,
              color: theme.palette.error.main,
              '&:hover': {
                bgcolor: alpha(theme.palette.error.main, 0.05)
              },
              '&.Mui-disabled': {
                opacity: 0.6
              }
            }}
          >
            <ListItemIcon
              sx={{ 
                minWidth: 36,
                color: theme.palette.error.main
              }}
            >
              {isLoading ? (
                <CircularProgress size={20} color="error" />
              ) : (
                <LogoutIcon />
              )}
            </ListItemIcon>
            <ListItemText 
              primary={isLoading ? "Logging Out..." : "Logout"} 
              primaryTypographyProps={{
                fontWeight: 500
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  
  // Profile Menu
  const profileMenu = (
    <Menu
      anchorEl={profileMenuAnchor}
      id="profile-menu"
      open={profileMenuOpen}
      onClose={handleProfileMenuClose}
      onClick={handleProfileMenuClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          mt: 1.5,
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
          borderRadius: 2,
          minWidth: 180,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Admin Panel
        </Typography>
      </Box>
      <Divider />
      <MenuItem
        onClick={handleLogout}
        disabled={isLoading}
        sx={{
          color: theme.palette.error.main,
          py: 1
        }}
      >
        <ListItemIcon sx={{ color: theme.palette.error.main }}>
          {isLoading ? <CircularProgress size={20} color="error" /> : <LogoutIcon fontSize="small" />}
        </ListItemIcon>
        <ListItemText>{isLoading ? 'Logging out...' : 'Logout'}</ListItemText>
      </MenuItem>
    </Menu>
  );
  
  return (
    <>
      <Slide appear={false} direction="down" in={showAppBar}>
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            color: 'text.primary',
            transition: 'transform 0.3s ease'
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ minHeight: '70px' }}>
              {/* Mobile menu icon */}
              {isMobile && (
                <IconButton
                  size="large"
                  aria-label="menu"
                  edge="start"
                  onClick={handleToggleMobileDrawer}
                  sx={{ ml: 'auto' }}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              {/* Logo - visible on all screens */}
              <Box 
                component={Link} 
                to="/"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <Avatar
                  src={logo}
                  alt="Book Store"
                  sx={{ 
                    width: 40, 
                    height: 40,
                    mr: 1,
                    transition: 'transform 0.2s ease',
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
                      fontWeight: 700,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mr: 2
                    }}
                  >
                    Admin Panel
                  </Typography>
                )}
              </Box>

              {/* Desktop navigation */}
              {!isMobile && (
                <>
                  <Box sx={{ flexGrow: 1, display: 'flex', gap: 0.5 }}>
                    {navItems.map((item) => (
                      <Button
                        key={item.text}
                        component={Link}
                        to={item.path}
                        startIcon={item.icon}
                        sx={{
                          my: 2, 
                          px: 2,
                          textTransform: 'none',
                          fontWeight: isActive(item.path) ? 600 : 500,
                          color: isActive(item.path) ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.85),
                          position: 'relative',
                          '&::after': isActive(item.path) ? {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            width: '30%',
                            height: '3px',
                            backgroundColor: theme.palette.primary.main,
                            transform: 'translateX(-50%)',
                            borderRadius: '4px 4px 0 0'
                          } : {},
                          '&:hover': {
                            backgroundColor: 'transparent',
                            color: theme.palette.primary.main,
                          }
                        }}
                      >
                        {item.text}
                      </Button>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {/* Admin Menu */}
                    <Tooltip title="Admin settings">
                      <Button
                        onClick={handleProfileMenuOpen}
                        aria-controls={profileMenuOpen ? 'admin-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={profileMenuOpen ? 'true' : undefined}
                        endIcon={<KeyboardArrowDownIcon />}
                        startIcon={<PersonIcon />}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 500,
                          color: alpha(theme.palette.text.primary, 0.85),
                          '&:hover': {
                            backgroundColor: 'transparent',
                            color: theme.palette.primary.main,
                          }
                        }}
                      >
                        Admin
                      </Button>
                    </Tooltip>

                    {/* Logout Button */}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleLogout}
                      disabled={isLoading}
                      startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <LogoutIcon />}
                      sx={{
                        ml: 1,
                        border: `1px solid ${alpha(theme.palette.error.main, 0.5)}`,
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.error.main, 0.05),
                          borderColor: theme.palette.error.main
                        },
                        '&.Mui-disabled': {
                          borderColor: alpha(theme.palette.error.main, 0.2),
                        }
                      }}
                    >
                      {isLoading ? 'Logging out...' : 'Logout'}
                    </Button>
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={handleToggleMobileDrawer}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 260,
            bgcolor: 'background.paper',
          },
        }}
      >
        {mobileDrawerContent}
      </Drawer>
      
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
      
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          duration: 3000,
          style: {
            borderRadius: '8px',
            padding: '10px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }
        }} 
      />
    </>
  );
};

export default AdminNavBar;