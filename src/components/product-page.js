// ProductPage.js

import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startRemoveCart, startCreateCart } from "../actions/product-action";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../App";
import {
  startCreateWishlist,
  startRemoveWishlist,
} from "../actions/wishlist-action";
import { startGetProductReview } from "../actions/review-action";

// Material UI imports
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  Paper,
  alpha,
  Rating as MuiRating,
  LinearProgress,
  Stack,
  Avatar,
  Chip,
  IconButton
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductPage = () => {
  const theme = useTheme();
  const [cartToggle, setCartToggle] = useState(false);
  const [wishlistToggle, setWishlistToggle] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // View single product
  const [product] = useSelector((state) => {
    return state.products.data.filter((ele) => ele._id === id);
  });

  const cart = useSelector((state) => {
    return state.products.cart;
  });
  
  const wishlist = useSelector((state) => {
    return state.wishlist.data;
  });

  const reviews = useSelector((state) => {
    return state.review.productReview;
  });

  const fiveStars = reviews.filter(review => review.rating > 4 && review.rating <= 5);
  const fourStars = reviews.filter(review => review.rating > 3 && review.rating <= 4);
  const threeStars = reviews.filter(review => review.rating > 2 && review.rating <= 3);
  const twoStars = reviews.filter(review => review.rating > 1 && review.rating <= 2);
  const oneStar = reviews.filter(review => review.rating > 0 && review.rating <= 1);

  const index = cart.findIndex((product) => product.productId._id === id);
  const wishlistIndex = wishlist.findIndex((product) => product.product === id);
  const wishlistItem = wishlist.find((product) => product.product === id);
  
  if (index !== -1 && !cartToggle) {
    setCartToggle(true);
  }

  if (wishlistIndex !== -1 && !wishlistToggle) {
    setWishlistToggle(true);
  }

  const cartToggleSet = () => {
    setCartToggle(!cartToggle);
  };

  const wishlistToggleSet = () => {
    setWishlistToggle(!wishlistToggle);
  };
  
  const { userState } = useContext(UserContext);
  const user = userState.user.role;
  
  const handleClick = () => {
    const body = {
      mode: 'buy'
    };
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { msg: "You need to Login first" } });
    } else {
      if (!cartToggle) {
        dispatch(startCreateCart(id, body, cartToggleSet));
        toast.success("Added to cart successfully");
      } else {
        dispatch(startRemoveCart(id, body, cartToggleSet));
        toast.success("Removed from cart");
      }
    }
  };

  const handleWishlist = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { msg: "You need to Login first" } });
    } else {
      if (!wishlistToggle) {
        dispatch(startCreateWishlist(id, wishlistToggleSet));
        toast.success("Added to wishlist");
      } else {
        dispatch(startRemoveWishlist(wishlistItem?._id, wishlistToggleSet));
        toast.success("Removed from wishlist");
      }
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    dispatch(startGetProductReview(id));
  }, [dispatch, id]);

  // Calculate average rating
  const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      py: 6,
      minHeight: '80vh'
    }}>
      <Container>
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                mb: 3
              }}
            >
              <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
                {product?.image && (
                  <>
                    <AutoPlaySwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={activeStep}
                      onChangeIndex={handleStepChange}
                      enableMouseEvents
                      interval={5000}
                    >
                      {product.image.map((step, index) => (
                        <Box
                          key={step._id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            bgcolor: 'background.paper',
                            p: 2
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              height: 350,
                              maxWidth: '100%',
                              objectFit: 'contain',
                              display: 'block',
                            }}
                            src={step.url}
                            alt={`Product Image ${index + 1}`}
                          />
                        </Box>
                      ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                      steps={product.image.length}
                      position="static"
                      activeStep={activeStep}
                      sx={{ 
                        bgcolor: 'background.paper',
                        '& .MuiMobileStepper-dot': {
                          width: 8,
                          height: 8,
                          mx: 0.5
                        },
                        '& .MuiMobileStepper-dotActive': {
                          bgcolor: 'primary.main'
                        }
                      }}
                      nextButton={
                        <Button
                          size="small"
                          onClick={handleNext}
                          disabled={activeStep === product.image.length - 1}
                        >
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                          ) : (
                            <KeyboardArrowRight />
                          )}
                        </Button>
                      }
                      backButton={
                        <Button 
                          size="small" 
                          onClick={handleBack} 
                          disabled={activeStep === 0}
                        >
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                          ) : (
                            <KeyboardArrowLeft />
                          )}
                        </Button>
                      }
                    />
                  </>
                )}
              </Box>
            </Paper>

            {/* Ratings Bar Chart */}
            {reviews.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Rating Distribution
                  <Chip 
                    label={`${averageRating.toFixed(1)}/5`}
                    color="primary"
                    size="small"
                    sx={{ ml: 2, fontWeight: 600 }}
                  />
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: 40 }}>5 ★</Typography>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(fiveStars.length / (reviews.length || 1)) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 5,
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 5
                          }
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
                      {fiveStars.length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: 40 }}>4 ★</Typography>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(fourStars.length / (reviews.length || 1)) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 5,
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 5
                          }
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
                      {fourStars.length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: 40 }}>3 ★</Typography>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(threeStars.length / (reviews.length || 1)) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 5,
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 5
                          }
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
                      {threeStars.length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: 40 }}>2 ★</Typography>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(twoStars.length / (reviews.length || 1)) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 5,
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 5
                          }
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
                      {twoStars.length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: 40 }}>1 ★</Typography>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(oneStar.length / (reviews.length || 1)) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 5,
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 5
                          }
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
                      {oneStar.length}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            )}
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
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
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {product?.title}
              </Typography>

              {reviews.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MuiRating
                    value={averageRating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                  </Typography>
                </Box>
              )}

              <Typography 
                variant="h5" 
                color="primary" 
                sx={{ 
                  fontWeight: 700,
                  my: 2,
                  display: 'inline-block',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ₹{product?.price}
              </Typography>

              {product?.stockCount === 0 && (
                <Chip 
                  label="Out of Stock" 
                  color="error" 
                  size="small"
                  sx={{ ml: 2, fontWeight: 600 }}
                />
              )}

              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 2, 
                  mb: 3,
                  color: alpha(theme.palette.text.primary, 0.8),
                  lineHeight: 1.7
                }}
              >
                {product?.description}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button
                  variant={cartToggle ? "outlined" : "contained"}
                  color={cartToggle ? "error" : "primary"}
                  onClick={handleClick}
                  disabled={userState.user?.role === "admin" || product?.stockCount === 0}
                  startIcon={cartToggle ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
                  sx={{
                    borderRadius: 8,
                    py: 1.2,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: cartToggle ? 'none' : theme.shadows[2],
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: cartToggle ? 'none' : theme.shadows[4],
                    },
                  }}
                >
                  {cartToggle ? "Remove from Cart" : "Add to Cart"}
                </Button>
                <Button
                  variant={wishlistToggle ? "outlined" : "contained"}
                  color={wishlistToggle ? "error" : "secondary"}
                  onClick={handleWishlist}
                  disabled={userState.user?.role === "admin"}
                  startIcon={wishlistToggle ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  sx={{
                    borderRadius: 8,
                    py: 1.2,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: wishlistToggle ? 'none' : theme.shadows[2],
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: wishlistToggle ? 'none' : theme.shadows[4],
                    },
                  }}
                >
                  {wishlistToggle ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </Stack>
              <Toaster position="top-center" />
            </Paper>

            {/* Reviews */}
            {reviews.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ 
                  px: 3, 
                  py: 2, 
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.04)
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Customer Reviews
                  </Typography>
                </Box>
                <List sx={{ p: 0 }}>
                  {reviews.map((review, index) => (
                    <React.Fragment key={index}>
                      <ListItem 
                        alignItems="flex-start" 
                        sx={{ 
                          px: 3, 
                          py: 2,
                          transition: 'background-color 0.2s',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.03)
                          }
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar 
                              sx={{ 
                                width: 36, 
                                height: 36, 
                                bgcolor: theme.palette.primary.main,
                                mr: 1.5,
                                fontSize: '1rem'
                              }}
                            >
                              {review.userId.userName.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {review.userId.userName}
                              </Typography>
                              <MuiRating
                                value={review.rating}
                                precision={0.5}
                                readOnly
                                size="small"
                              />
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ pl: 7, pt: 0.5 }}>
                            {review.review}
                          </Typography>
                        </Box>
                      </ListItem>
                      {index < reviews.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductPage;
