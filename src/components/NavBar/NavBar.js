import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Remove logo import
// import logo from '../../images/logo.png';

// Material UI imports
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useScrollTrigger,
  Slide,
  Badge,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme,
  alpha,
  Stack,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import { LocalLibraryOutlined } from '@mui/icons-material';

// Hide AppBar on scroll
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'Books', path: '/products' },
    { title: 'Categories', path: '/categories' },
    { title: 'About', path: '/about' }
  ];

  const userLinks = [
    { title: 'Register', path: '/register' },
    { title: 'Login', path: '/login' }
  ];

  // Check if current path matches the nav item path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <HideOnScroll>
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
            {/* Logo for desktop */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                mr: 3,
                alignItems: 'center'
              }}
            >
              <Link to="/">
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
              </Link>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  ml: 1.5,
                  fontWeight: 700,
                  color: 'text.primary',
                  textDecoration: 'none',
                  display: { xs: 'none', lg: 'flex' }
                }}
              >
                Book Store
              </Typography>
            </Box>

            {/* Mobile menu icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08)
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    borderRadius: 2,
                    minWidth: 180,
                    overflow: 'visible',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      left: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.title} 
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.path}
                    selected={isActive(page.path)}
                    sx={{
                      py: 1.5,
                      px: 2.5,
                      borderRadius: 1,
                      mx: 0.5,
                      mb: 0.5,
                      '&.Mui-selected': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                        }
                      },
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      }
                    }}
                  >
                    <Typography 
                      sx={{ 
                        fontWeight: isActive(page.path) ? 600 : 400,
                        color: isActive(page.path) ? 'primary.main' : 'text.primary',
                      }}
                    >
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
                <Divider sx={{ my: 1.5 }} />
                {userLinks.map((link) => (
                  <MenuItem 
                    key={link.title} 
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={link.path}
                    selected={isActive(link.path)}
                    sx={{
                      py: 1.5,
                      px: 2.5,
                      borderRadius: 1,
                      mx: 0.5,
                      '&.Mui-selected': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                        }
                      },
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      }
                    }}
                  >
                    <Typography 
                      sx={{ 
                        fontWeight: isActive(link.path) ? 600 : 400,
                        color: isActive(link.path) ? 'primary.main' : 'text.primary',
                      }}
                    >
                      {link.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo for mobile */}
            <Box 
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                justifyContent: 'center'
              }}
            >
              <Link to="/">
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
                              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  ml: 1.5,
                  fontWeight: 700,
                  color: 'text.primary',
                  textDecoration: 'none',
                  display: { xs: 'none', lg: 'flex' }
                }}
              >
                Book Store
              </Typography>
              </Link>
            </Box>

            {/* Desktop menu */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                display: { xs: 'none', md: 'flex' }, 
                pl: 2
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 1,
                    color: isActive(page.path) ? 'primary.main' : 'text.primary',
                    fontWeight: isActive(page.path) ? 600 : 500,
                    position: 'relative',
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    py: 1,
                    px: 2,
                    borderRadius: 1.5,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: isActive(page.path) ? '20px' : '0px',
                      height: '3px',
                      bottom: '6px',
                      left: 'calc(50% - 10px)',
                      backgroundColor: 'primary.main',
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      '&::after': {
                        width: '20px'
                      }
                    }
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {/* Action buttons group */}
            <Stack 
              direction="row" 
              spacing={{ xs: 0.5, sm: 2 }}
              alignItems="center"
            >
              {/* Search Button */}
              {/* <Tooltip title="Search">
                <IconButton 
                  aria-label="search" 
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08)
                    }
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip> */}

              {/* Cart Button */}
              {/* <Tooltip title="Shopping Bag">
                <IconButton 
                  aria-label="shopping cart" 
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08)
                    }
                  }}
                >
                  <Badge badgeContent={3} color="primary">
                    <ShoppingBagOutlinedIcon />
                  </Badge>
                </IconButton>
              </Tooltip> */}

              {/* Desktop Auth Buttons or User Menu */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {userLinks.map((link) => (
                  <Button
                    key={link.title}
                    component={Link}
                    to={link.path}
                    variant={link.title === 'Login' ? 'contained' : 'outlined'}
                    color="primary"
                    size="small"
                    sx={{
                      ml: 1,
                      borderRadius: 8,
                      px: 2,
                      py: 0.7,
                      fontWeight: 600,
                      textTransform: 'none',
                      ...(link.title !== 'Login' && {
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: alpha(theme.palette.primary.main, 0.04)
                        }
                      }),
                      ...(link.title === 'Login' && {
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: '0 6px 10px rgba(0,0,0,0.08)',
                          transform: 'translateY(-1px)'
                        },
                      })
                    }}
                    startIcon={link.title === 'Login' ? <PersonOutlineOutlinedIcon /> : <BookOutlinedIcon />}
                  >
                    {link.title}
                  </Button>
                ))}
              </Box>

              {/* Mobile Auth Icon */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <Tooltip title="Account">
                  <IconButton 
                    component={Link} 
                    to="/login"
                    sx={{ 
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08)
                      }
                    }}
                  >
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default NavBar;