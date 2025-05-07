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
              Our Story
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.8 }}>
              Founded in 2010, Book Store began with a simple mission: to share the joy of reading with everyone. 
              What started as a small corner shop with a few hundred books has grown into one of India's most loved 
              online bookstores, offering thousands of titles across genres.
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.8 }}>
              Our journey has been guided by our passion for literature and our commitment to making quality books 
              accessible to readers everywhere. We believe that books have the power to transform lives, spark imagination, 
              and foster understanding between people of all backgrounds.
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary"
              size={isMobile ? "medium" : "large"}
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
              Contact Us
            </Button>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2341&q=80"
              alt="Book Store interior with bookshelves"
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
            Our Values
          </Typography>

          <Grid container spacing={3}>
            {companyValues.map((value, index) => (
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

        {/* Team Section */}
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
            Our Team
          </Typography>

          <Grid container spacing={3}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    borderRadius: 3,
                    overflow: 'hidden',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[4],
                      '& .member-image': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                >
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      className="member-image"
                      sx={{
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 2,
                        border: `4px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        transition: 'transform 0.5s ease'
                      }}
                    />
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ fontWeight: 600 }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="subtitle2" 
                      color="primary" 
                      sx={{ mb: 2 }}
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.description}
                    </Typography>
                  </Box>
                </Card>
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
            Our Journey in Numbers
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {[
              { number: '100,000+', label: 'Happy Customers' },
              { number: '50,000+', label: 'Books Delivered' },
              { number: '1,000+', label: 'Authors' },
              { number: '20+', label: 'Cities Served' }
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
            Get in Touch
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
            Have questions or feedback? We'd love to hear from you. Reach out to our team and we'll get back to you soon.
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
            Contact Us
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default About; 