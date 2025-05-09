import React, { useContext, useState, lazy, Suspense } from "react";
import { UserContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { startRemoveOrder } from "../../actions/order-action";
import "../../styles/MyOrders.css";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Divider,
  Chip,
  Paper,
  Stack,
  Rating,
  CircularProgress,
  useTheme,
  alpha,
  IconButton
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';

// Lazy load the ReviewModal component
const ReviewModal = lazy(() => import("../ReviewModal/ReviewModal"));

export default function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const review = useSelector((state) => state.review.data);
  const { userState } = useContext(UserContext);
  const theme = useTheme();

  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState("");

  const handleClose = () => {
    setShow(false);
    setProductId("");
  };
  
  const handleShow = (id) => {
    setShow(true);
    setProductId(id);
  };

  const handleCancel = (id) => {
    dispatch(startRemoveOrder(id));
  };

  return (
    <Box 
      sx={{ 
        py: 5, 
        minHeight: '90vh',
        bgcolor: 'background.default',
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.default, 1)})`
      }}
    >
      <Container maxWidth="lg">
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
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
              p: 3, 
              bgcolor: alpha(theme.palette.primary.light, 0.05),
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: 'text.primary',
                fontWeight: 600
              }}
            >
              <ShoppingBagIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
              Thank you for your order, 
              <Typography 
                component="span" 
                sx={{ 
                  ml: 1,
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <PersonIcon sx={{ mr: 0.5, fontSize: 18 }} />
                {userState.user?.userName}
              </Typography>
            </Typography>
          </Box>

          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              >
                <ReceiptIcon sx={{ mr: 1 }} />
                Your Orders
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Account ID: {userState.user?._id}
              </Typography>
            </Box>

            {orders.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <LocalShippingIcon 
                  sx={{ fontSize: 60, color: alpha(theme.palette.text.secondary, 0.2), mb: 2 }} 
                />
                <Typography variant="h6" gutterBottom>
                  No orders found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your purchase history will appear here
                </Typography>
              </Paper>
            ) : (
              <Stack spacing={3}>
                {orders.map((ele, index) => (
                  <Card 
                    key={index}
                    variant="outlined" 
                    sx={{ 
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    {ele.orderItem.map((order, idx) => (
                      <Box 
                        key={idx}
                        sx={{
                          p: 2,
                          borderBottom: idx !== ele.orderItem.length - 1 ? 
                            `1px dashed ${alpha(theme.palette.divider, 0.3)}` : 'none',
                        }}
                      >
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={12} sm={3} md={2}>
                            <CardMedia
                              component="img"
                              image={order.product.image[0].url}
                              alt={order.product.title}
                              sx={{ 
                                height: 100, 
                                borderRadius: 1,
                                objectFit: 'contain',
                                bgcolor: 'background.paper',
                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                              }}
                            />
                          </Grid>
                          
                          <Grid item xs={12} sm={9} md={4}>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 600,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                              }}
                            >
                              {order.product.title}
                            </Typography>
                            
                            <Chip 
                              size="small" 
                              label={order.product.condition}
                              sx={{ 
                                mt: 1,
                                fontSize: '0.75rem',
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontWeight: 500
                              }} 
                            />
                          </Grid>
                          
                          <Grid item xs={6} sm={4} md={2} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                            <Typography variant="body2" color="text.secondary">
                              Quantity
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                              {order.quantity}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={6} sm={4} md={2} sx={{ textAlign: { xs: 'right', md: 'center' } }}>
                            <Typography variant="body2" color="text.secondary">
                              Price
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                              ₹{order.quantity * order.product.price}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={4} md={2} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' } }}>
                            {review.find((ele) => ele.product === order.product._id) ? (
                              <Chip
                                icon={<StarIcon />}
                                label="Reviewed"
                                color="success"
                                variant="outlined"
                                sx={{ fontWeight: 500 }}
                              />
                            ) : (
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                startIcon={<StarIcon />}
                                onClick={() => handleShow(order.product._id)}
                                sx={{ 
                                  borderRadius: 6,
                                  textTransform: 'none',
                                  fontWeight: 500
                                }}
                              >
                                Review
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                    
                          {ele.orderStatus === 'Pending' && (
                      <Box 
                        sx={{ 
                          p: 2, 
                          textAlign: 'right',
                          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          bgcolor: alpha(theme.palette.background.paper, 0.5)
                        }}
                      >
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => handleCancel(ele._id)}
                          sx={{ 
                            borderRadius: 6,
                            textTransform: 'none',
                            fontWeight: 500,
                            boxShadow: theme.shadows[2],
                            '&:hover': {
                              boxShadow: theme.shadows[4],
                            }
                          }}
                        >
                          Cancel Order
                        </Button>
                      </Box>
                    )}
                  </Card>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Container>

        {show && (
        <Suspense fallback={
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 9999
          }}>
            <CircularProgress />
          </Box>
        }>
          <ReviewModal
            show={show}
            productId={productId}
            handleClose={handleClose}
          />
        </Suspense>
        )}
    </Box>
  );
}
