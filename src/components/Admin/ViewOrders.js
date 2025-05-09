import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Chip,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Stack,
  Tabs,
  Tab,
  Badge,
  Grid,
  Avatar,
  useTheme,
  alpha
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  FilterList as FilterListIcon,
  Done as DoneIcon,
  LocalShipping as LocalShippingIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  DateRange as DateRangeIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";
import { startGetAllOrders } from "../../actions/order-action";
import ViewOrderItem from "./ViewOrderItem";

const ViewOrders = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  // State
  const [sort, setSort] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filterExpanded, setFilterExpanded] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [localItems, setLocalItems] = useState([]);
  
  // Get data from Redux store
  const { orders, pagination, loading, error } = useSelector((state) => state.order);

  // Process order data
  const orderedProducts = useMemo(() => {
    // If searchQuery is used, filter the accumulated local items 
    if (searchQuery) {
      return localItems.filter(product => {
        const query = searchQuery.toLowerCase();
        return (
          product.product?.title?.toLowerCase().includes(query) ||
          product.orderId?.toLowerCase().includes(query) ||
          product.status?.toLowerCase().includes(query) ||
          (product.customer && product.customer.toLowerCase().includes(query))
        );
      });
    }
    
    // Otherwise return all accumulated items
    return localItems;
  }, [localItems, searchQuery]);

  // Calculate status counts for badges
  const statusCounts = useMemo(() => {
    return orderedProducts.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
  }, [orderedProducts]);

  // Convert orders data to our product items structure
  const processOrders = useCallback((ordersData) => {
    const products = [];
    
    if (!ordersData || !Array.isArray(ordersData)) return products;
    
    ordersData.forEach((ele) => {
      ele.orderItem.forEach((ele2) => {
        products.push({
        ...ele2,
          status: ele.orderStatus,
          orderId: ele._id,
          orderDate: ele.createdAt,
          customer: ele.user?.name || 'Unknown',
        });
      });
    });
    
    return products;
  }, []);

  // Load initial data
  useEffect(() => {
    loadOrders(1, true);
  }, [sort, statusFilter]);

  // Function to load orders with pagination
  const loadOrders = async (pageNum, isInitialLoad = false) => {
    try {
      const result = await dispatch(
        startGetAllOrders({
          page: pageNum,
          limit: 8,
          sort,
          status: statusFilter,
        })
      );
      
      // Process the new orders
      const newItems = processOrders(result.orders);
      
      // Update local items
      if (isInitialLoad) {
        setLocalItems(newItems);
      } else {
        setLocalItems(prevItems => [...prevItems, ...newItems]);
      }
      
      // Check if we have more pages
      setHasMoreItems(pageNum < result.pagination.pages);
      
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  // Load more items when scrolling
  const loadMoreItems = useCallback(() => {
    if (loading || !hasMoreItems) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    loadOrders(nextPage);
  }, [loading, hasMoreItems, page, loadOrders]);

  // Reset state when filters change
  useEffect(() => {
    setPage(1);
    setLocalItems([]);
    setHasMoreItems(true);
  }, [statusFilter, sort]);

  // Intersection Observer for infinite scroll
  const observer = useRef();
  const lastOrderElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreItems) {
        loadMoreItems();
      }
    }, { threshold: 0.8 });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMoreItems, loadMoreItems]);

  // Handlers
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  const handleRefresh = () => {
    setPage(1);
    setLocalItems([]);
    setHasMoreItems(true);
    loadOrders(1, true);
  };

  // Status style helpers
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return theme.palette.success.main;
      case 'shipped':
        return theme.palette.info.main;
      case 'processing':
        return theme.palette.warning.main;
      case 'cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <DoneIcon fontSize="small" />;
      case 'shipped':
        return <LocalShippingIcon fontSize="small" />;
      case 'processing':
        return <PendingIcon fontSize="small" />;
      case 'cancelled':
        return <CancelIcon fontSize="small" />;
      default:
        return <PendingIcon fontSize="small" />;
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
          Loading Orders...
        </Typography>
      </Box>
    );
  }

  // Render error state
  if (error && !loading && localItems.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Retry
            </Button>
          }
        >
          Error loading orders: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
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
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Order Management
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Tooltip title="Refresh orders">
            <IconButton 
              onClick={handleRefresh}
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Sort Orders</InputLabel>
            <Select
              value={sort}
              label="Sort Orders"
              onChange={(e) => setSort(e.target.value)}
              sx={{ bgcolor: 'background.paper' }}
            >
              <MenuItem value={-1}>Newest First</MenuItem>
              <MenuItem value={1}>Oldest First</MenuItem>
          </Select>
        </FormControl>
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
            value="all" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>All Orders</Typography>
                <Chip 
                  size="small" 
                  label={pagination.total || orderedProducts.length} 
                  color="primary"
                  sx={{ height: 20, fontSize: '0.75rem' }}
                />
              </Box>
            }
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
          <Tab 
            value="Delivered" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DoneIcon fontSize="small" color="success" />
                <Typography>Delivered</Typography>
                {statusCounts['Delivered'] > 0 && (
                  <Chip 
                    size="small" 
                    label={statusCounts['Delivered']} 
                    color="success"
                    sx={{ height: 20, fontSize: '0.75rem' }}
                  />
                )}
              </Box>
            }
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
          <Tab 
            value="Shipped" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShippingIcon fontSize="small" color="info" />
                <Typography>Shipped</Typography>
                {statusCounts['Shipped'] > 0 && (
                  <Chip 
                    size="small" 
                    label={statusCounts['Shipped']} 
                    color="info"
                    sx={{ height: 20, fontSize: '0.75rem' }}
                  />
                )}
              </Box>
            }
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
          <Tab 
            value="Processing" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PendingIcon fontSize="small" color="warning" />
                <Typography>Processing</Typography>
                {statusCounts['Processing'] > 0 && (
                  <Chip 
                    size="small" 
                    label={statusCounts['Processing']} 
                    color="warning"
                    sx={{ height: 20, fontSize: '0.75rem' }}
                  />
                )}
              </Box>
            }
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
          <Tab 
            value="Cancelled" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CancelIcon fontSize="small" color="error" />
                <Typography>Cancelled</Typography>
                {statusCounts['Cancelled'] > 0 && (
                  <Chip 
                    size="small" 
                    label={statusCounts['Cancelled']} 
                    color="error"
                    sx={{ height: 20, fontSize: '0.75rem' }}
                  />
                )}
              </Box>
            }
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
        </Tabs>
      </Box>

      {/* Search and Filter Section */}
      <Card 
        variant="outlined" 
        sx={{ 
          mb: 3,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <CardContent sx={{ py: 2 }}>
          <TextField
            fullWidth
            placeholder="Search by product name, order ID, status, or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
            variant="outlined"
            size="small"
          />
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            height: '100%',
            background: `linear-gradient(45deg, ${alpha(theme.palette.success.main, 0.08)}, ${alpha(theme.palette.success.light, 0.15)})`,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  Delivered
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.success.main, width: 36, height: 36 }}>
                  <DoneIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {statusCounts['Delivered'] || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Successfully delivered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            height: '100%',
            background: `linear-gradient(45deg, ${alpha(theme.palette.info.main, 0.08)}, ${alpha(theme.palette.info.light, 0.15)})`,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  Shipped
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.info.main, width: 36, height: 36 }}>
                  <LocalShippingIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {statusCounts['Shipped'] || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Orders in transit
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            height: '100%',
            background: `linear-gradient(45deg, ${alpha(theme.palette.warning.main, 0.08)}, ${alpha(theme.palette.warning.light, 0.15)})`,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  Processing
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.warning.main, width: 36, height: 36 }}>
                  <PendingIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {statusCounts['Processing'] || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Being processed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            height: '100%',
            background: `linear-gradient(45deg, ${alpha(theme.palette.error.main, 0.08)}, ${alpha(theme.palette.error.light, 0.15)})`,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  Cancelled
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.error.main, width: 36, height: 36 }}>
                  <CancelIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {statusCounts['Cancelled'] || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Orders cancelled
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Orders Table */}
      <Card 
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            {orderedProducts.length} {statusFilter === 'all' ? 'Orders' : `${statusFilter} Orders`}
            {pagination.total > 0 && orderedProducts.length < pagination.total && !searchQuery && (
              <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                (Showing {orderedProducts.length} of {pagination.total})
              </Typography>
            )}
          </Typography>
          {(searchQuery || statusFilter !== 'all') && (
            <Button 
              size="small" 
              variant="outlined" 
              color="secondary"
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </Box>
        <Divider />
        <TableContainer component={Paper} sx={{ maxHeight: 600, boxShadow: 'none' }}>
          <Table stickyHeader aria-label="orders table">
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
                <TableCell>Image</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderedProducts.length > 0 ? (
                orderedProducts.map((item, index) => {
                  // Add ref to last item for infinite scroll
                  if (orderedProducts.length === index + 1) {
                    return (
                      <ViewOrderItem 
                        key={`${item.orderId}-${item._id}`}
                        ref={lastOrderElementRef} 
                        item={item} 
                      />
                    );
                  } else {
                    return (
                      <ViewOrderItem 
                        key={`${item.orderId}-${item._id}`} 
                        item={item} 
                      />
                    );
                  }
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      No orders found matching your filters
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={handleClearFilters}
                      sx={{ mt: 1 }}
                    >
                      Clear Filters
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
      </TableContainer>
        
        {/* Loading indicator for infinite scroll */}
        {loading && page > 1 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            p: 2, 
            borderTop: 1, 
            borderColor: 'divider' 
          }}>
            <CircularProgress size={30} thickness={4} />
          </Box>
        )}
        
        {/* End of list message */}
        {!hasMoreItems && orderedProducts.length > 0 && !loading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            p: 2, 
            borderTop: 1, 
            borderColor: 'divider',
            bgcolor: alpha(theme.palette.primary.main, 0.03)
          }}>
            <Typography variant="body2" color="text.secondary">
              You've reached the end of the list
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default ViewOrders;
