import React from 'react';
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  TextField,
  Button,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha,
  Paper
} from "@mui/material";
import {
  LinkedIn,
  Instagram,
  Twitter,
  Facebook,
  GitHub,
  PhoneOutlined,
  EmailOutlined,
  LocationOnOutlined,
  ArrowForward,
  LocalLibraryOutlined
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Quick Links for navigation
  const quickLinks = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'About Us', path: '/about' },
    { title: 'Categories', path: '/categories' }
  ];

  // Customer service links
  const customerLinks = [
    { title: 'My Account', path: '/account' },
    { title: 'Orders', path: '/account/my-orders' },
    { title: 'Wishlist', path: '/wishlist' },
    { title: 'Return Policy', path: '#' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        pt: { xs: 6, md: 8 },
        pb: { xs: 6, md: 6 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 50% 0, rgba(25, 118, 210, 0.03), transparent 60%)',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <LocalLibraryOutlined sx={{ fontSize: '2rem', color: 'primary.main' }} />
                <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                  Book Store
                </Typography>
              </Stack>
              
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                Book Store is a dynamic online marketplace tailored for book enthusiasts, offering a 
                secure and user-friendly environment for browsing, purchasing, and selling books.
              </Typography>
              
              {/* Newsletter Signup */}
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Subscribe to our newsletter
              </Typography>
              
              <Stack direction="row" spacing={1}>
                <TextField
                  placeholder="Your email"
                  variant="outlined"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px 0 0 8px',
                      bgcolor: 'background.default',
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '0 8px 8px 0',
                    boxShadow: 'none',
                    px: 2
                  }}
                >
                  <ArrowForward fontSize="small" />
                </Button>
              </Stack>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Quick Links
            </Typography>
            
            <Stack spacing={1.5}>
              {quickLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.path}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    {link.title}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>
          
          {/* Customer Service */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Customer Service
            </Typography>
            
            <Stack spacing={1.5}>
              {customerLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.path}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    {link.title}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>
          
          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Contact Us
            </Typography>
            
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Paper
                  elevation={0}
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }}
                >
                  <LocationOnOutlined fontSize="small" color="primary" />
                </Paper>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <Paper
                  elevation={0}
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }}
                >
                  <EmailOutlined fontSize="small" color="primary" />
                </Paper>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  mail@bookstore.com
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <Paper
                  elevation={0}
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }}
                >
                  <PhoneOutlined fontSize="small" color="primary" />
                </Paper>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  +91 945684235
                </Typography>
              </Stack>
              
              {/* Social Media */}
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <IconButton 
                  component={Link} 
                  to="https://www.linkedin.com/" 
                  target="_blank"
                  aria-label="LinkedIn"
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
                
                <IconButton 
                  component={Link} 
                  to="https://www.instagram.com/" 
                  target="_blank"
                  aria-label="Instagram"
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Instagram fontSize="small" />
                </IconButton>
                
                <IconButton 
                  component={Link} 
                  to="https://www.twitter.com/" 
                  target="_blank"
                  aria-label="Twitter"
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Twitter fontSize="small" />
                </IconButton>
                
                <IconButton 
                  component={Link} 
                  to="https://www.facebook.com/" 
                  target="_blank"
                  aria-label="Facebook"
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Facebook fontSize="small" />
                </IconButton>
                
                <IconButton 
                  component={Link} 
                  to="https://github.com/ShubhamSharma20061998" 
                  target="_blank"
                  aria-label="GitHub"
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: alpha(theme.palette.divider, 0.1) }} />
        
        {/* Copyright Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()} Book Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
