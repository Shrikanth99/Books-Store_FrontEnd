import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRemoveWishlist } from '../../actions/wishlist-action';
import '../../styles/product.css';

// Material UI imports
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Paper,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  Fade,
  Skeleton
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';

const WishList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    const wishlist = useSelector(state => {
    return state.wishlist.data;
  });

    const products = useSelector(state => {
    return state.products.data;
  });

    const handleWishlist = (id) => {
    const wishlistItem = wishlist.find(ele => ele.product === id);
    dispatch(startRemoveWishlist(wishlistItem._id));
  };

  const navigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  let wishlistItems = [];
    wishlist.forEach(ele => {
    wishlistItems.push(products.find(ele2 => ele2._id === ele.product));
  });

    return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      py: 4,
      minHeight: '80vh' 
    }}>
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 4,
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden',
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FavoriteIcon 
              color="primary" 
              sx={{ 
                mr: 1.5, 
                fontSize: 28,
                color: theme.palette.secondary.main
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              My Wishlist
            </Typography>
          </Box>

          {wishlistItems.length > 0 ? (
            <Grid container spacing={3}>
            {wishlistItems.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                        '& .MuiCardMedia-root': {
                          transform: 'scale(1.05)',
                        }
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="220"
                        image={item.image[0].url}
                        alt={item.title}
                        sx={{
                          transition: 'transform 0.6s ease',
                        }}
                        onClick={() => navigateToProduct(item._id)}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1
                        }}
                      >
                        <Tooltip title="Remove from Wishlist" placement="left" TransitionComponent={Fade} arrow>
                          <IconButton
                            onClick={() => handleWishlist(item._id)}
                            size="small"
                            sx={{
                              bgcolor: 'white',
                              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                              color: theme.palette.error.main,
                              '&:hover': {
                                bgcolor: theme.palette.error.main,
                                color: 'white'
                              }
                            }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="View Details" placement="left" TransitionComponent={Fade} arrow>
                          <IconButton
                            onClick={() => navigateToProduct(item._id)}
                            size="small"
                            sx={{
                              bgcolor: 'white',
                              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                              color: theme.palette.primary.main,
                              '&:hover': {
                                bgcolor: theme.palette.primary.main,
                                color: 'white'
                              }
                            }}
                          >
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          mb: 1,
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '3.6em',
                          cursor: 'pointer'
                        }}
                        onClick={() => navigateToProduct(item._id)}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        ₹{item.price}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        size="medium"
                        fullWidth
                        startIcon={<DeleteOutlineIcon />}
                        onClick={() => handleWishlist(item._id)}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                          borderRadius: 2,
                          py: 1
                        }}
                      >
                        Remove
                      </Button>
                    </CardActions>
                    </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 2,
                textAlign: 'center'
              }}
            >
              <FavoriteIcon
                sx={{
                  fontSize: 70,
                  mb: 3,
                  color: alpha(theme.palette.text.secondary, 0.2)
                }}
              />
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Your wishlist is empty
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 500 }}
              >
                Start adding items to your wishlist by clicking the heart icon on products you love.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={() => navigate('/products')}
                sx={{
                  borderRadius: 8,
                  py: 1.2,
                  px: 4,
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
                Browse Products
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default WishList;
