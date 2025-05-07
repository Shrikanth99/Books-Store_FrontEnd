import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../App';
import { setEmptyAddress } from '../../actions/address-action';
import { setClearCart } from '../../actions/product-action';
import { setClearWishlist } from '../../actions/wishlist-action';
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
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const UserNavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { userDispatch } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Account menu state
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const accountMenuOpen = Boolean(accountMenuAnchor);
  
  // Mobile drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  const carts = useSelector(state => state.products.cart);

  const handleAccountMenuClick = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = (destination) => {
    setAccountMenuAnchor(null);
    
    if (destination === 'profile') {
      navigate('/account/profile');
    } else if (destination === 'orders') {
      navigate('/account/my-orders');
    } else if (destination === 'address') {
      navigate('/account/address');
    } else if (destination === 'selling') {
      navigate('/account/my-sell');
    }
  };

  const handleToggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    userDispatch({ type: 'LOGOUT_USER' });
    dispatch(setEmptyAddress());
    dispatch(setClearCart());
    dispatch(setClearWishlist());
    toast.success('Logged out successfully');
    navigate('/');
    setMobileDrawerOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Products', path: '/products', icon: <CategoryIcon /> },
    { text: 'Wishlist', path: '/wishlist', icon: <FavoriteIcon /> },
    { text: 'Sell Products', path: '/sellProduct', icon: <StoreIcon /> }
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
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          pb: 3,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.03)
        }}
      >
        <Avatar
          src={logo}
          sx={{ 
            width: 60, 
            height: 60, 
            mb: 1,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Book Store
        </Typography>
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
              <Box 
                component="span" 
                sx={{ 
                  mr: 2,
                  color: isActive(item.path) ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.6),
                }}
              >
                {item.icon}
              </Box>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 400
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              py: 1.2,
              px: 3,
              borderRadius: 0,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05)
              }
            }}
            onClick={handleAccountMenuClick}
          >
            <Box component="span" sx={{ mr: 2, color: alpha(theme.palette.text.primary, 0.6) }}>
              <AccountCircleIcon />
            </Box>
            <ListItemText primary="My Account" />
            <KeyboardArrowDownIcon fontSize="small" />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/myCart"
            onClick={() => setMobileDrawerOpen(false)}
            sx={{
              py: 1.2,
              px: 3,
              borderRadius: 0,
              color: isActive('/myCart') ? theme.palette.primary.main : 'inherit',
              bgcolor: isActive('/myCart') ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05)
              }
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                mr: 2,
                color: isActive('/myCart') ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.6),
              }}
            >
              <Badge badgeContent={carts?.length || 0} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Box>
            <ListItemText 
              primary="Cart" 
              primaryTypographyProps={{
                fontWeight: isActive('/myCart') ? 600 : 400
              }}
            />
          </ListItemButton>
        </ListItem>
        
        <Box sx={{ mt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, pt: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                py: 1.2,
                px: 3,
                borderRadius: 0,
                color: theme.palette.error.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.error.main, 0.05)
                }
              }}
            >
              <Box component="span" sx={{ mr: 2, color: theme.palette.error.main }}>
                <LogoutIcon />
              </Box>
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          color: 'text.primary'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: '70px' }}>
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
                  mr: 1
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
                  Book Store
                </Typography>
              )}
            </Box>

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
                  {/* Cart Button with Badge */}
                  <Button
                    component={Link}
                    to="/myCart"
                    color={isActive('/myCart') ? 'primary' : 'inherit'}
                    startIcon={
                      <Badge badgeContent={carts?.length || 0} color="primary">
                        <ShoppingCartIcon />
                      </Badge>
                    }
                    sx={{
                      textTransform: 'none',
                      fontWeight: isActive('/myCart') ? 600 : 500,
                      color: isActive('/myCart') ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.85),
                    }}
                  >
                    Cart
                  </Button>

                  {/* My Account Menu */}
                  <Tooltip title="Account settings">
                    <Button
                      onClick={handleAccountMenuClick}
                      aria-controls={accountMenuOpen ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={accountMenuOpen ? 'true' : undefined}
                      endIcon={<KeyboardArrowDownIcon />}
                      startIcon={<AccountCircleIcon />}
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
                      My Account
                    </Button>
                  </Tooltip>

                  <Menu
                    id="account-menu"
                    anchorEl={accountMenuAnchor}
                    open={accountMenuOpen}
                    onClose={() => handleAccountMenuClose()}
                    MenuListProps={{
                      'aria-labelledby': 'account-button',
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    sx={{
                      mt: 1,
                      '& .MuiPaper-root': {
                        borderRadius: 2,
                        minWidth: 180,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                      }
                    }}
                  >
                    <MenuItem onClick={() => handleAccountMenuClose('profile')}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => handleAccountMenuClose('orders')}>
                      My Orders
                    </MenuItem>
                    <MenuItem onClick={() => handleAccountMenuClose('address')}>
                      Saved Address
                    </MenuItem>
                    <MenuItem onClick={() => handleAccountMenuClose('selling')}>
                      My Selling Orders
                    </MenuItem>
                  </Menu>

                  {/* Logout Button */}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{
                      ml: 1,
                      border: `1px solid ${alpha(theme.palette.error.main, 0.5)}`,
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.05),
                        borderColor: theme.palette.error.main
                      }
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

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

      {/* Menu for My Account on Mobile */}
      <Menu
        id="mobile-account-menu"
        anchorEl={accountMenuAnchor}
        open={accountMenuOpen}
        onClose={() => handleAccountMenuClose()}
        MenuListProps={{
          'aria-labelledby': 'account-button',
        }}
        sx={{
          mt: 1,
          '& .MuiPaper-root': {
            borderRadius: 2,
            minWidth: 180,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }
        }}
      >
        <MenuItem onClick={() => handleAccountMenuClose('profile')}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleAccountMenuClose('orders')}>
          My Orders
        </MenuItem>
        <MenuItem onClick={() => handleAccountMenuClose('address')}>
          Saved Address
        </MenuItem>
        <MenuItem onClick={() => handleAccountMenuClose('selling')}>
          My Selling Orders
        </MenuItem>
      </Menu>

      <Toaster position="top-center" />
    </>
  );
};

export default UserNavBar;