import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Divider, 
  Avatar, 
  Button, 
  Stack,
  useTheme,
  useMediaQuery,
  alpha,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';

// Team members data
const teamMembers = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    description: 'Book enthusiast with over 15 years of experience in the publishing industry.'
  },
  {
    name: 'Priya Sharma',
    role: 'Chief Product Officer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    description: 'Literature professor turned entrepreneur with a passion for making books accessible to all.'
  },
  {
    name: 'Amit Patel',
    role: 'Head of Operations',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    description: 'Supply chain expert ensuring books reach customers quickly and efficiently.'
  },
  {
    name: 'Aisha Khan',
    role: 'Customer Experience Lead',
    image: 'https://randomuser.me/api/portraits/women/46.jpg',
    description: 'Dedicated to creating delightful experiences for every book lover who visits our store.'
  }
];

// Company values data
const companyValues = [
  {
    icon: <LocalLibraryOutlinedIcon fontSize="large" />,
    title: 'Knowledge for All',
    description: 'We believe in making knowledge accessible to everyone, regardless of their background or location.'
  },
  {
    icon: <SupportAgentOutlinedIcon fontSize="large" />,
    title: 'Customer First',
    description: 'Our customers are at the heart of everything we do, and their satisfaction is our top priority.'
  },
  {
    icon: <LocalShippingOutlinedIcon fontSize="large" />,
    title: 'Reliable Service',
    description: 'We are committed to providing fast, reliable service with no compromise on quality.'
  },
  {
    icon: <VerifiedOutlinedIcon fontSize="large" />,
    title: 'Quality Selection',
    description: 'Every book in our collection is carefully selected to ensure the highest quality content.'
  }
];

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
      pt: { xs: 4, md: 6 },
      pb: { xs: 6, md: 10 }
    }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ mb: { xs: 6, md: 10 } }}>
          <Grid item xs={12} md={6}>
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              component="h1"
              sx={{ 
                fontWeight: 800,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to Book Store
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.8 }}>
              Book Store is a comprehensive online platform that revolutionizes the way readers discover, buy, and sell books. 
              Our platform connects book enthusiasts, sellers, and readers in a seamless ecosystem where knowledge flows freely 
              and books find their perfect homes.
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.8 }}>
              What sets us apart is our unique marketplace model that empowers both individual sellers and established bookstores. 
              Whether you're looking to expand your personal library, sell your pre-loved books, or discover rare editions, 
              our platform provides the tools and community to make it happen.
            </Typography>

            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.8 }}>
              With features like secure transactions, real-time notifications, and a robust review system, we ensure a trustworthy 
              and engaging experience for everyone. Our commitment to quality, combined with a user-friendly interface, makes 
              Book Store the preferred destination for book lovers across India.
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary"
              size={isMobile ? "medium" : "large"}
              component={Link}
              to="/products"
              endIcon={<ArrowRightAltIcon />}
              sx={{ 
                borderRadius: 8,
                px: { xs: 3, md: 4 },
                py: { xs: 1, md: 1.5 },
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: theme.shadows[2],
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[6],
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
             Explore Books
            </Button>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2341&q=80"
              alt="Modern library with digital and physical books"
              sx={{
                width: '100%',
                height: { xs: '300px', md: '400px' },
                objectFit: 'cover',
                borderRadius: 4,
                boxShadow: theme.shadows[10],
              }}
            />
          </Grid>
        </Grid>

        {/* Our Values Section */}
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h2"
            align="center"
            sx={{ 
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60px',
                height: '4px',
                bottom: '-12px',
                left: 'calc(50% - 30px)',
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2
              }
            }}
          >
            Our Platform Features
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                icon: <LocalLibraryOutlinedIcon fontSize="large" />,
                title: 'Diverse Collection',
                description: 'Access a vast collection of books across genres, from bestsellers to rare editions, all in one place.'
              },
              {
                icon: <SupportAgentOutlinedIcon fontSize="large" />,
                title: 'Seller Support',
                description: 'Empowering individual sellers and bookstores with tools to list, manage, and grow their business.'
              },
              {
                icon: <LocalShippingOutlinedIcon fontSize="large" />,
                title: 'Secure Transactions',
                description: 'Safe and reliable payment processing with real-time order tracking and delivery updates.'
              },
              {
                icon: <VerifiedOutlinedIcon fontSize="large" />,
                title: 'Quality Assurance',
                description: 'Rigorous quality checks and a robust review system to ensure the best experience for buyers and sellers.'
              }
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[4],
                      '& .value-icon': {
                        transform: 'scale(1.1)',
                        color: theme.palette.primary.main
                      }
                    }
                  }}
                >
                  <Box
                    className="value-icon"
                    sx={{
                      color: 'text.secondary',
                      transition: 'all 0.3s ease',
                      mb: 2
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 1.5 
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Statistics Section */}
        <Box 
          sx={{ 
            mb: { xs: 6, md: 10 },
            py: { xs: 4, md: 6 },
            px: { xs: 3, md: 6 },
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h2"
            align="center"
            sx={{ 
              fontWeight: 700,
              mb: { xs: 4, md: 5 },
            }}
          >
            Platform Impact
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {[
              { number: '50,000+', label: 'Active Users' },
              { number: '100,000+', label: 'Books Listed' },
              { number: '5,000+', label: 'Active Sellers' },
              { number: '25+', label: 'Categories' }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    p: 2,
                  }}
                >
                  <Typography 
                    variant={isMobile ? "h4" : "h3"} 
                    component="p"
                    sx={{ 
                      fontWeight: 800,
                      color: theme.palette.primary.main,
                      mb: 1
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h2"
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: 'text.primary'
            }}
          >
            Join Our Community
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              color: 'text.secondary'
            }}
          >
            Whether you're a book lover, seller, or both, we invite you to be part of our growing community. 
            Start your journey with Book Store today and discover a world of possibilities.
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<EmailOutlinedIcon />}
            sx={{ 
              borderRadius: 8,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: theme.shadows[2],
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[6],
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Get Started
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default About; 