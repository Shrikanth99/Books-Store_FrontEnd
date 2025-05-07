import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startCancelProcurement } from "../../actions/procurement-action";
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
  useTheme,
  alpha,
  List,
  ListItem
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SellIcon from '@mui/icons-material/Sell';

const MySelling = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Use selector with memoization to prevent unnecessary re-renders
  const procurement = useSelector(state => state.procurements.data);
  
  // Memoize sorted procurement data to optimize rendering
  const sortedProcurement = useMemo(() => {
    return [...procurement].sort((a, b) => 
      new Date(b.procurementDate) - new Date(a.procurementDate)
    );
  }, [procurement]);

  // Use useCallback to prevent function recreation on each render
  const handleCancel = useCallback((id) => {
    dispatch(startCancelProcurement(id));
  }, [dispatch]);

  // Status chip color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'warning';
      case 'Approved':
        return 'success';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
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
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
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
              <SellIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
              My Selling Items
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
                <ReceiptLongIcon sx={{ mr: 1 }} />
                Procurement Records
              </Typography>
            </Box>

            {sortedProcurement.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <InventoryIcon 
                  sx={{ fontSize: 60, color: alpha(theme.palette.text.secondary, 0.2), mb: 2 }} 
                />
                <Typography variant="h6" gutterBottom>
                  No selling items found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your selling history will appear here
                </Typography>
              </Paper>
            ) : (
              <Stack spacing={3}>
                {sortedProcurement.map((procurement, index) => (
                  <Card 
                    key={index}
                    variant="outlined" 
                    sx={{ 
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ 
                      p: 2, 
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: theme.palette.primary.main }} />
                        <Typography variant="body2" color="text.secondary">
                          Procurement Date: {new Date(procurement.procurementDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                      <Chip 
                        label={procurement.status} 
                        size="small"
                        color={getStatusColor(procurement.status)}
                        sx={{ fontWeight: 500 }}
                      />
                    </Box>
                    
                    <List disablePadding>
                      {procurement.products.map((item, idx) => (
                        <ListItem 
                          key={idx}
                          divider={idx !== procurement.products.length - 1}
                          sx={{
                            py: 2,
                            px: 2,
                          }}
                        >
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={3} md={2}>
                              <CardMedia
                                component="img"
                                image={item.product.image[0].url}
                                alt={item.product.title}
                                sx={{ 
                                  height: 100, 
                                  borderRadius: 1,
                                  objectFit: 'contain',
                                  bgcolor: 'background.paper',
                                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                }}
                              />
                            </Grid>
                            
                            <Grid item xs={12} sm={9} md={6}>
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
                                {item.product.title}
                              </Typography>
                              
                              {item.product.condition && (
                                <Chip 
                                  size="small" 
                                  label={`Condition: ${item.product.condition}`}
                                  sx={{ 
                                    mt: 1,
                                    fontSize: '0.75rem',
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                  }} 
                                />
                              )}
                            </Grid>
                            
                            <Grid item xs={6} sm={6} md={2} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                              <Typography variant="body2" color="text.secondary">
                                Quantity
                              </Typography>
                              <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                                {item.quantity}
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={6} md={2} sx={{ textAlign: { xs: 'right', md: 'center' } }}>
                              <Typography variant="body2" color="text.secondary">
                                Status
                              </Typography>
                              <Typography 
                                variant="body1" 
                                fontWeight={600} 
                                sx={{ 
                                  mt: 0.5,
                                  color: procurement.status === 'Approved' 
                                    ? 'success.main' 
                                    : procurement.status === 'Cancelled' 
                                      ? 'error.main' 
                                      : 'warning.main'
                                }}
                              >
                                {procurement.status}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItem>
                      ))}
                    </List>
                    
                    {procurement.status === 'Pending' && (
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
                          onClick={() => handleCancel(procurement._id)}
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
                          Cancel Procurement
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
    </Box>
  );
};

export default MySelling;
