import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetProcurement, startUpdateProcurment } from "../../actions/procurement-action";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
  Container,
  Stack,
  Avatar,
  Tabs,
  Tab,
  Badge,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Done as DoneIcon,
  Pending as PendingIcon,
  Autorenew as AutorenewIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  History as HistoryIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

const Notification = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  // State
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [localItems, setLocalItems] = useState([]);
  
  // Get data from Redux store
  const { data, pagination, loading, error } = useSelector(state => state.procurements);
  
  // Initial load
  useEffect(() => {
    loadProcurements(1, true);
  }, [statusFilter]);
  
  // Function to load procurements with pagination
  const loadProcurements = async (pageNum, isInitialLoad = false) => {
    try {
      const result = await dispatch(
        startGetProcurement({
          page: pageNum,
          limit: 4,
          status: statusFilter,
        })
      );
      
      if (result && result.procurements) {
        // Update local items
        if (isInitialLoad) {
          setLocalItems(result.procurements);
        } else {
          setLocalItems(prevItems => [...prevItems, ...result.procurements]);
        }
        
        // Check if we have more pages
        setHasMoreItems(pageNum < result.pagination.pages);
      }
    } catch (error) {
      console.error("Error loading procurements:", error);
    }
  };
  
  // Load more items when scrolling
  const loadMoreItems = useCallback(() => {
    if (loading || !hasMoreItems) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    loadProcurements(nextPage);
  }, [loading, hasMoreItems, page]);
  
  // Reset state when filters change
  useEffect(() => {
    setPage(1);
    setLocalItems([]);
    setHasMoreItems(true);
  }, [statusFilter]);
  
  // Intersection Observer for infinite scroll
  const observer = useRef();
  const lastItemElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreItems) {
        loadMoreItems();
      }
    }, { threshold: 0.8 });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMoreItems, loadMoreItems]);
  
  // Handle accept procurement
  const handleAccept = async (id) => {
    await dispatch(startUpdateProcurment(id));
    
    // Update local state to reflect the change immediately
    setLocalItems(prevItems =>
      prevItems.map(item =>
        item._id === id ? { ...item, status: 'Procured' } : item
      )
    );
  };
  
  // Format date helper
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  // Render loading state for initial load
  if (loading && page === 1 && localItems.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '60vh' 
      }}>
        <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Loading Procurement Requests...
        </Typography>
      </Box>
    );
  }
  
  // Render error state
  if (error && !loading && localItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={() => loadProcurements(1, true)}>
              Retry
            </Button>
          }
        >
          Error loading procurement requests: {error}
        </Alert>
      </Container>
    );
    }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant="h4" 
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Procurement Requests
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <IconButton 
            onClick={() => loadProcurements(1, true)}
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
      
      {/* Status Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={statusFilter}
          onChange={(e, newValue) => setStatusFilter(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-flexContainer': {
              borderBottom: 1,
              borderColor: 'divider',
            }
          }}
        >
          <Tab 
            value="Pending" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PendingIcon fontSize="small" color="warning" />
                <Typography>Pending</Typography>
              </Box>
            }
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
          <Tab 
            value="Procured" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon fontSize="small" color="success" />
                <Typography>Procured</Typography>
              </Box>
            }
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
          <Tab 
            value="all" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon fontSize="small" />
                <Typography>All Requests</Typography>
              </Box>
            }
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
        </Tabs>
      </Box>
      
      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            background: `linear-gradient(45deg, ${alpha(theme.palette.warning.main, 0.08)}, ${alpha(theme.palette.warning.light, 0.15)})`,
            transition: 'transform 0.3s ease',
            height: '100%',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  Pending Requests
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.warning.main, width: 36, height: 36 }}>
                  <PendingIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {localItems.filter(item => item.status === 'Pending').length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Awaiting your approval
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            background: `linear-gradient(45deg, ${alpha(theme.palette.success.main, 0.08)}, ${alpha(theme.palette.success.light, 0.15)})`,
            transition: 'transform 0.3s ease',
            height: '100%',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  Procured Items
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.success.main, width: 36, height: 36 }}>
                  <CheckCircleIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {localItems.filter(item => item.status === 'Procured').length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Successfully procured
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            background: `linear-gradient(45deg, ${alpha(theme.palette.info.main, 0.08)}, ${alpha(theme.palette.info.light, 0.15)})`,
            transition: 'transform 0.3s ease',
            height: '100%',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  Total Requests
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.info.main, width: 36, height: 36 }}>
                  <ShoppingBagIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {pagination.total || localItems.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                All procurement requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Procurement cards */}
      {localItems.length > 0 ? (
        <Grid container spacing={3}>
          {localItems.map((procurement, index) => {
            // Determine if this is the last item for infinite scrolling
            const isLastItem = index === localItems.length - 1;
            
            return (
              <Grid 
                item 
                xs={12} 
                key={procurement._id}
                ref={isLastItem ? lastItemElementRef : null}
              >
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    {/* Procurement Header */}
                    <Box 
                      sx={{ 
                        p: 2.5, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        backgroundColor: procurement.status === 'Procured' 
                          ? alpha(theme.palette.success.main, 0.08)
                          : alpha(theme.palette.warning.main, 0.08)
                      }}
                    >
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            Request ID:
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {procurement._id.substring(0, 10)}...
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Date:
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {formatDate(procurement.procurementDate)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Chip
                        icon={procurement.status === 'Procured' ? <CheckCircleIcon /> : <PendingIcon />}
                        label={procurement.status}
                        color={procurement.status === 'Procured' ? 'success' : 'warning'}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    
                    <Divider />
                    
                    {/* Product List */}
                    <Box sx={{ p: 1 }}>
                      {procurement.products.map((item) => (
                        <Box 
                          key={item._id} 
                          sx={{ 
                            p: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            borderBottom: '1px solid',
                            borderColor: alpha(theme.palette.divider, 0.5),
                            '&:last-child': {
                              borderBottom: 'none'
                            }
                          }}
                        >
                          <Badge 
                            badgeContent={item.quantity} 
                            color="primary"
                            sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem', fontWeight: 'bold' } }}
                          >
                            <CardMedia
                              component="img"
                              image={item.product.image[0].url}
                              sx={{ 
                                width: 70, 
                                height: 70, 
                                borderRadius: 1.5,
                                border: '1px solid',
                                borderColor: alpha(theme.palette.divider, 0.2),
                                objectFit: 'cover',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                              }}
                            />
                          </Badge>
                          
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600} noWrap>
                              {item.product.title}
                            </Typography>
                            <Stack direction="row" spacing={3} mt={0.5}>
                              <Typography variant="body2" color="text.secondary">
                                Price: <Typography component="span" fontWeight={600} color="text.primary">₹{item.product.price}</Typography>
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Quantity: <Typography component="span" fontWeight={600} color="text.primary">{item.quantity}</Typography>
                              </Typography>
                            </Stack>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    
                    <Divider />
                    
                    {/* Procurement Footer */}
                    <Box sx={{ p: 2, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight={600}>
                          Total: ₹{procurement.totalCost}
                        </Typography>
                        
                        {procurement.status === 'Pending' && (
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<DoneIcon />}
                            onClick={() => handleAccept(procurement._id)}
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                          >
                            Accept Procurement
                          </Button>
                        )}
                        
                        {procurement.status === 'Procured' && (
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<VisibilityIcon />}
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                          >
                            View Details
                              </Button>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      ) : (
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No procurement requests found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {statusFilter === 'Pending' 
              ? 'There are no pending procurement requests to process'
              : 'No procurement requests match the selected filter'}
          </Typography>
                              <Button
            variant="outlined" 
            startIcon={<RefreshIcon />}
                                onClick={() => {
              setStatusFilter('all');
              loadProcurements(1, true);
                                }}
                              >
            View All Requests
                              </Button>
        </Paper>
      )}
      
      {/* Loading indicator for infinite scroll */}
      {loading && page > 1 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4, 
          mb: 2 
        }}>
          <CircularProgress size={30} thickness={4} />
        </Box>
      )}
      
      {/* End of list message */}
      {!hasMoreItems && localItems.length > 0 && !loading && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4,
          mb: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05)
        }}>
          <Typography variant="body2" color="text.secondary">
            You've reached the end of the list
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Notification; 