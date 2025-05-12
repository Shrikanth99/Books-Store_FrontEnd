import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';

// Material UI imports
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent,
  CardActionArea,
  Container,
  Button,
  IconButton,
  Chip,
  Paper,
  Skeleton,
  useMediaQuery,
  useTheme,
  alpha,
  Stack
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Image imports
import img1 from '../images/Slide-Img-1.jpeg';
import img2 from '../images/Slide-Img-2.jpg';
import img3 from '../images/Slide-Img-3.jpeg';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector(state => state.products.data);
  const loading = useSelector(state => state.products.loading);
  
  // Get new arrivals (same logic as before)
  const newArrivals = products.slice((50 * products.length) / 100);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleNavigate = () => {
    navigate('/products');
  };

  // Custom arrows for slider with improved accessibility
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        aria-label="Next slide"
        sx={{
          position: 'absolute',
          right: { xs: 8, md: -15 },
          top: '45%',
          zIndex: 2,
          bgcolor: 'background.paper',
          boxShadow: theme.shadows[4],
          width: { xs: 36, md: 44 },
          height: { xs: 36, md: 44 },
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.1),
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <ArrowForwardIosIcon fontSize={isMobile ? 'small' : 'medium'} />
      </IconButton>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        aria-label="Previous slide"
        sx={{
          position: 'absolute',
          left: { xs: 8, md: -15 },
          top: '45%',
          zIndex: 2,
          bgcolor: 'background.paper',
          boxShadow: theme.shadows[4],
          width: { xs: 36, md: 44 },
          height: { xs: 36, md: 44 },
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.1),
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <ArrowBackIosNewIcon fontSize={isMobile ? 'small' : 'medium'} />
      </IconButton>
    );
  };

  // Slider settings
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ],
    dotsClass: "slick-dots custom-dots"
  };

  // Toast notification on login
  useEffect(() => {
    if (location.state?.msg) {
      toast.success('Logged In');
    }
  }, [location.state]);

  // Enhanced carousel items with more relevant content
  const carouselItems = [
    {
      image: img1,
      title: "Discover Literary Treasures",
      description: "Explore our handpicked collection of bestselling books",
      action: "Browse Collection"
    },
    {
      image: img2,
      title: "New Releases This Month",
      description: "Be the first to read the most anticipated titles of the season",
      action: "See New Releases"
    },
    {
      image: img3,
      title: "Special Discount on Classics",
      description: "Timeless stories at special prices for a limited time",
      action: "Shop Now"
    }
  ];

  // Product loading skeleton
  const ProductSkeleton = () => (
    <Box sx={{ px: 1 }}>
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height={280} animation="wave" />
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" width="80%" height={28} />
          <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: '82vh', 
      display: 'flex', 
      flexDirection: 'column', 
      bgcolor: 'background.default',
      pt: 0,
      overflowX: 'hidden',
    }}>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      />

      {/* Hero Carousel - Enhanced with better UI/UX */}
      <Box sx={{ position: 'relative', mb: { xs: 4, md: 6 } }}>
        <Slider
          dots={true}
          infinite={true}
          speed={700}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={5000}
          arrows={!isMobile}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          pauseOnHover={true}
          cssEase="cubic-bezier(0.45, 0, 0.55, 1)"
        >
          {carouselItems.map((item, index) => (
            <Box key={index} position="relative">
              <Box
                component="img"
                src={item.image}
                alt={`${item.title} - Book Store`}
                sx={{
                  width: '100%',
                  height: { xs: '50vh', sm: '60vh', md: '70vh' },
                  objectFit: 'cover',
                  filter: 'brightness(0.85)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: { xs: 3, md: 5 },
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)',
                  color: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <Container maxWidth="lg">
                  <Typography 
                    variant={isMobile ? "h5" : "h3"} 
                    component="h1"
                    sx={{ 
                      fontWeight: 700,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      mb: 1
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant={isMobile ? "body2" : "h6"}
                    sx={{ 
                      mb: 3,
                      maxWidth: { xs: '100%', md: '60%' },
                      textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    size={isMobile ? "medium" : "large"}
                    sx={{ 
                      borderRadius: 8,
                      px: { xs: 3, md: 4 },
                      py: { xs: 1, md: 1.5 },
                      textTransform: 'none',
                      fontWeight: 600,
                      mb: { xs: 2, md: 4 },
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: theme.shadows[8],
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={handleNavigate}
                    endIcon={<ArrowRightAltIcon />}
                  >
                    {item.action}
                  </Button>
                </Container>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* New Arrivals Section */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, md: 10 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: { xs: 3, md: 5 }
        }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h2"
              sx={{ 
                fontWeight: 700,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 4,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 2
                }
              }}
            >
              New Arrivals
            </Typography>
            <Chip 
              label="New" 
              color="primary" 
              size="small" 
              sx={{ 
                height: 24, 
                fontWeight: 600,
                display: { xs: 'none', sm: 'flex' }
              }}
            />
          </Stack>
          
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleNavigate}
            endIcon={<ArrowRightAltIcon />}
            sx={{ 
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 600,
              px: { xs: 2, md: 3 },
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
              }
            }}
          >
            View All
          </Button>
        </Box>

        {/* Products Slider with loading state */}
        <Box sx={{ mb: 6, mx: { xs: -1, md: 0 } }}>
          {loading ? (
            <Slider {...settings}>
              {[1, 2, 3, 4, 5].map((item) => (
                <ProductSkeleton key={item} />
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {newArrivals.map((product) => (
                <Box key={product._id} sx={{ px: 1 }}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8]
                      },
                      bgcolor: 'background.paper',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                    }}
                  >
                    <CardActionArea 
                      onClick={() => handleClick(product._id)}
                      sx={{ position: 'relative' }}
                    >
                      <CardMedia
                        component="img"
                        height={280}
                        image={product.image[0].url}
                        alt={product.title}
                        sx={{ 
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                      {product.discount > 0 && (
                        <Chip
                          label={`${product.discount}% OFF`}
                          color="error"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                          }}
                        />
                      )}
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography 
                          variant="h6" 
                          noWrap
                          sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            color: 'text.primary'
                          }}
                          title={product.title}
                        >
                          {product.title}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mt: 1
                        }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 700,
                              color: 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}
                          >
                            ₹{product.price}
                            {product.originalPrice > product.price && (
                              <Typography 
                                component="span" 
                                variant="body2" 
                                sx={{ 
                                  textDecoration: 'line-through',
                                  color: 'text.secondary',
                                  fontWeight: 400
                                }}
                              >
                                ₹{product.originalPrice}
                              </Typography>
                            )}
                          </Typography>
                          <IconButton 
                            size="small" 
                            color="primary"
                            aria-label="Add to cart"
                            sx={{ 
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.2),
                              } 
                            }}
                          >
                            <ShoppingBagOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              ))}
            </Slider>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;