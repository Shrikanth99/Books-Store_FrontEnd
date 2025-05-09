import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { startEmptyCart, startIncCartQuantity, startRemoveCart, startRemCartQuantity } from "../../actions/product-action";
import { startCreateWishlist } from "../../actions/wishlist-action";
import { startPayment, startRemovePayment, startUpdatePayment } from "../../actions/payment-action";
import { startOrder } from "../../actions/order-action";
import { startCreateProcurement } from "../../actions/procurement-action";
import AddressModal from "../ReviewModal/AddressModal";
import '../../styles/cart.css';

// Material UI imports
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Divider,
  Stack,
  Paper,
  Alert,
  AlertTitle,
  Link,
  TextField,
  Switch,
  FormControlLabel,
  useTheme,
  alpha,
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SellIcon from '@mui/icons-material/Sell';

export default function Cart() {
  const theme = useTheme();
  const { userState } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [addressId, setAddressId] = useState(
    localStorage.getItem('addID') ? localStorage.getItem('addID') : ''
  );
  const [switchBtn, setSwitchBtn] = useState(false);

  let carts = useSelector(state => state.products.cart);
  const payment = useSelector(state => state.payments.payment);
  const address = useSelector(state => state.address.address);
  
  const searchParams = new URLSearchParams(window.location.search);
  const success = searchParams.get('success');
  const cancel = searchParams.get('cancel');

  const userEmail = userState?.user.email;

  if (switchBtn) {
    carts = carts.filter(product => product.mode === 'sell');
  } else {
    carts = carts.filter(product => product.mode === 'buy');
  }

  const totalPrice = carts.reduce((acc, curr) => {
    return acc + curr.productId.price * curr.quantity;
  }, 0);

  let shippingPrice;
  if (totalPrice > 1000 || totalPrice === 0) {
    shippingPrice = 0;
  } else if (totalPrice > 0 && totalPrice < 1000) {
    shippingPrice = 100;
  }

  const handleIncrement = (id, mode) => {
    dispatch(startIncCartQuantity(id, mode));
  };

  const handleDecrement = (id, mode) => {
    dispatch(startRemCartQuantity(id, mode));
  };

  const handleRemoveItem = (id, mode) => {
    dispatch(startRemoveCart(id, mode));
  };

  const handleWishlist = (id) => {
    dispatch(startCreateWishlist(id));
  };

  const requestObj = (carts) => {
        const products = carts.map((ele) => {
            return {
        product: ele.productId._id,
        price: ele.productId.price,
        title: ele.productId.title,
        quantity: ele.quantity
      };
    });
    return products;
  };

  const requestObj2 = (carts) => {
    return carts.map(ele => {
        return {
            product: ele.productId._id,
        quantity: ele.quantity
      };
    });
  };

    const handleNavigate = () => {
    navigate('/account/addressForm', { state: { msg: 'show' } });
  };

    const handleClose = () => {
        setShow(false);
  };
        
  const handleShow = () => {
    setShow(true);
      };
        
  const handleSwitch = () => {
    setSwitchBtn(!switchBtn);
      };

      const handleAddressId = (id) => {
    setAddressId(id);
    localStorage.setItem('addID', id);
  };

  const handleRemoveId = () => {
    setAddressId('');
    localStorage.removeItem('addID');
    setShow(false);
  };
    
    const handleCheckOut = async () => {
    if (!switchBtn) {
      const products = requestObj(carts);
      dispatch(startPayment(products, totalPrice, userEmail));
    } else {
      const products = requestObj2(carts);
            const procurementData = {
                products: products,
                address: addressId,
        totalCost: totalPrice
      };
      dispatch(startCreateProcurement(procurementData, handleRemoveId));
    }
  };

    const orderItem = payment.products?.map(ele => {
        return {
      product: ele.product,
      quantity: ele.quantity
    };
  });

     const orderData = {
    orderItem: orderItem,
    totalAmount: payment?.totalAmount,
        payment: payment?._id,
    address: addressId
  };

  useEffect(() => {
    if (success && localStorage.getItem('transactionId')) {
      dispatch(startUpdatePayment(localStorage.getItem('transactionId')));
    }
    if (Object.keys(payment).length === 0 && success) {
      dispatch(startEmptyCart('buy'));
    }
    if (cancel) {
      dispatch(startRemovePayment(localStorage.getItem('transactionId')));
    }
  }, []);

    useEffect(() => {
    if (Object.keys(payment).length > 0 && success) {
      dispatch(startOrder(orderData));
    }
  }, [payment]);

  const emptyCart = (
    <Box sx={{ 
      textAlign: 'center', 
      py: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {switchBtn 
        ? <SellIcon sx={{ fontSize: 80, color: alpha(theme.palette.text.secondary, 0.2), mb: 3 }} />
        : <ShoppingCartIcon sx={{ fontSize: 80, color: alpha(theme.palette.text.secondary, 0.2), mb: 3 }} />
      }
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
        Your {switchBtn ? 'selling' : 'shopping'} cart is empty
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
        {switchBtn 
          ? "Start adding books to sell and earn money." 
          : "Start adding books to your cart to make a purchase."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
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
        Browse Books
      </Button>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', py: 4, minHeight: '80vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {switchBtn 
              ? <SellIcon sx={{ mr: 1.5, fontSize: 32 }} />
              : <ShoppingCartIcon sx={{ mr: 1.5, fontSize: 32 }} />
            }
            {switchBtn ? 'Selling' : 'Shopping'} Cart
          </Typography>
          <FormControlLabel
            control={
              <Switch 
                checked={switchBtn}
                onChange={handleSwitch}
                color="secondary"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {switchBtn ? 'Switch to Shopping Cart' : 'Switch to Selling Cart'}
              </Typography>
            }
          />
        </Box>

        {carts.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            {emptyCart}
          </Paper>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  position: 'relative',
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
                <Box 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {switchBtn ? 'Selling Items' : 'Cart Items'} ({carts.length})
                  </Typography>
                </Box>

                {carts.map(product => (
                  <Box key={product.productId._id}>
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={3}>
                          <Box 
                            sx={{ 
                              position: 'relative',
                              borderRadius: 2,
                              overflow: 'hidden',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                          >
                            <CardMedia
                              component="img"
                              image={product.productId.image[0].url}
                              alt={product.productId.title}
                              sx={{ 
                                height: 120,
                                objectFit: 'contain',
                                bgcolor: 'background.paper'
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              minHeight: '2.4em'
                            }}
                          >
                            {product.productId.title}
                          </Typography>
                          {switchBtn && product.condition && (
                            <Chip 
                              label={`Condition: ${product.condition}`}
                              size="small"
                              color="secondary"
                              sx={{ mb: 1 }}
                            />
                          )}
                          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              startIcon={<DeleteOutlineIcon />}
                              onClick={() => handleRemoveItem(product.productId._id, {mode: product.mode})}
                              sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 500,
                                py: 0.5
                              }}
                            >
                              Remove
                                                        </Button>
                            {!switchBtn && (
                              <Button
                                size="small"
                                variant="outlined"
                                color="secondary"
                                startIcon={<FavoriteBorderIcon />}
                                onClick={() => handleWishlist(product.productId._id)}
                                sx={{
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  fontWeight: 500,
                                  py: 0.5
                                }}
                              >
                                Wishlist
                                                        </Button>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Typography 
                              variant="h6" 
                              color="primary"
                              sx={{ 
                                fontWeight: 700,
                                mb: 1
                              }}
                            >
                              ₹{product.productId.price * product.quantity}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                              borderRadius: 2,
                              p: 0.5,
                              mb: 1
                            }}>
                              <IconButton
                                size="small"
                                onClick={() => handleDecrement(product.productId._id, product.mode)}
                                disabled={product.quantity <= 1}
                                sx={{ color: theme.palette.primary.main }}
                              >
                                <RemoveCircleOutlineIcon fontSize="small" />
                              </IconButton>
                              <TextField
                                value={product.quantity}
                                variant="standard"
                                InputProps={{
                                  readOnly: true,
                                  disableUnderline: true,
                                }}
                                sx={{ 
                                  width: 40, 
                                  mx: 1,
                                  '& input': { 
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    p: 0
                                  }
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => handleIncrement(product.productId._id, {mode: product.mode})}
                                sx={{ color: theme.palette.primary.main }}
                              >
                                <AddCircleOutlineIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              ₹{product.productId.price} each
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  mt: 3,
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Payment Methods
                </Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                  <Box 
                    component="img" 
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                    sx={{ 
                      height: 30,
                      objectFit: 'contain',
                      filter: 'grayscale(0.2)'
                    }}
                  />
                  <Box 
                    component="img" 
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                    sx={{ 
                      height: 30,
                      objectFit: 'contain',
                      filter: 'grayscale(0.2)'
                    }}
                  />
                  <Box 
                    component="img" 
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                    sx={{ 
                      height: 30,
                      objectFit: 'contain',
                      filter: 'grayscale(0.2)'
                    }}
                  />
                  <Box 
                    component="img" 
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                    alt="PayPal"
                    sx={{ 
                      height: 30,
                      objectFit: 'contain',
                      filter: 'grayscale(0.2)'
                    }}
                  />
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Order Summary
                  </Typography>
                  <List disablePadding>
                    <ListItem 
                      sx={{ 
                        px: 0, 
                        py: 1,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography variant="body1">
                        Products ({carts.length})
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        ₹{totalPrice}
                      </Typography>
                    </ListItem>
                                    {!switchBtn && (
                      <ListItem 
                        sx={{ 
                          px: 0, 
                          py: 1,
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocalShippingIcon 
                            fontSize="small" 
                            sx={{ mr: 1, color: theme.palette.primary.main }}
                          />
                          <Typography variant="body1">
                                        Shipping
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={500}>
                          {shippingPrice === 0 ? 'Free' : `₹${shippingPrice}`}
                        </Typography>
                      </ListItem>
                    )}
                    <Divider sx={{ my: 1.5 }} />
                    <ListItem 
                      sx={{ 
                        px: 0, 
                        py: 1.5,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        Total
                      </Typography>
                      <Typography 
                        variant="h6" 
                        fontWeight={700}
                        color="primary"
                      >
                        ₹{!switchBtn ? totalPrice + shippingPrice : totalPrice}
                      </Typography>
                    </ListItem>
                  </List>

                  {address.length === 0 ? (
                    <Alert 
                      severity="info" 
                      sx={{ 
                        mt: 2,
                        borderRadius: 2,
                        '& .MuiAlert-icon': { alignItems: 'center' }
                      }}
                      action={
                        <Button 
                          color="info" 
                          size="small" 
                          onClick={handleNavigate}
                          sx={{ 
                            textTransform: 'none',
                            fontWeight: 600
                          }}
                        >
                          Add Address
                        </Button>
                      }
                    >
                      <AlertTitle>No Address Found</AlertTitle>
                      Please add a delivery address to proceed with checkout.
                    </Alert>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      onClick={handleShow}
                      startIcon={<PaymentIcon />}
                      sx={{
                        mt: 3,
                        borderRadius: 8,
                        py: 1.5,
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
                      Proceed to Checkout
                               </Button>    
                  )}

                  {switchBtn && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                      Selling items requires address verification for pickup
                    </Typography>
                  )}

                  {!switchBtn && shippingPrice === 0 && totalPrice > 0 && (
                    <Box sx={{ 
                      mt: 2,
                      p: 1.5,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <LocalShippingIcon 
                        fontSize="small" 
                        sx={{ mr: 1, color: theme.palette.success.main }}
                      />
                      <Typography variant="body2" color="success.main" fontWeight={500}>
                        Free shipping on orders over ₹1000
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
      
      {show && <AddressModal show={show} handleClose={handleClose} handleAddressId={handleAddressId} handleCheckOut={handleCheckOut} />}
    </Box>
    );
}