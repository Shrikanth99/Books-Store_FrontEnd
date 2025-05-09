import { PieChart, BarChart } from '@mui/x-charts';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
  Typography, 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  useTheme, 
  useMediaQuery, 
  Skeleton, 
  Alert, 
  Paper, 
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  alpha
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const Stats = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  // State for loading, error handling, and active tab
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Redux selectors
  const products = useSelector((state) => state.products.data || []);
  const orders = useSelector((state) => {
    const allOrders = state.order.orders || [];
    return allOrders.filter(ele => ele.orderStatus === 'Delivered');
  });
  const categories = useSelector(state => state.categories.categories || []);
  const procurement = useSelector(state => {
    const allProcurements = state.procurements.data || [];
    return allProcurements.filter(ele => ele.status === "Procured");
  });

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Check for data issues and set error if needed
      if (!products || !categories || products.length === 0 || categories.length === 0) {
        setError("Could not load statistics data. Please check your connection and try again.");
      } else {
        setError(null);
      }
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [products, categories]);

  // Memoize data calculations to prevent recalculations on re-renders
  const procPieData = useMemo(() => {
    if (!categories.length || !procurement.length) return [];
    
    return categories.map((ele, i) => {
      return procurement.reduce((acc, cv) => {
        acc.value += cv.products.reduce((acc2, cv2) => {
          if (cv2.product.categoryId === ele._id) {
            acc2 += cv2.quantity;
          }
          return acc2;
        }, 0);
        return acc;
      }, { id: i, label: ele.name, value: 0 });
    });
  }, [categories, procurement]);

  const procBarData = useMemo(() => {
    if (!categories.length || !procurement.length) return [];
    
    return categories.map((ele, i) => {
      return procurement.reduce((acc, cv) => {
        acc += cv.products.reduce((acc2, cv2) => {
          if (cv2.product.categoryId === ele._id) {
            acc2 += cv2.quantity;
          }
          return acc2;
        }, 0);
        return acc;
      }, 0);
    });
  }, [categories, procurement]);

  const categoryPieData = useMemo(() => {
    if (!categories.length || !products.length) return [];
    
    return categories.map((ele, i) => {
      return products.reduce((acc, cv) => {
        if (cv.categoryId == ele._id) {
          acc.value += 1;
        }
        return acc;
      }, { id: i, label: ele.name, value: 0 });
    });
  }, [categories, products]);

  const categoryBarData = useMemo(() => {
    if (!categories.length || !products.length) return [];
    
    return categories.map((ele, i) => {
      return products.reduce((acc, cv) => {
        if (cv.categoryId == ele._id) {
          acc += 1;
        }
        return acc;
      }, 0);
    });
  }, [categories, products]);

  const orderBarData = useMemo(() => {
    if (!categories.length || !orders.length) return [];
    
    return categories.map((ele, i) => {
      return orders.reduce((acc, cv) => {
        acc += cv.orderItem.reduce((acc2, cv2) => {
          if (cv2.product.categoryId == ele._id) {
            acc2 += cv2.quantity;
          }
          return acc2;
        }, 0);
        return acc;
      }, 0);
    });
  }, [categories, orders]);

  const orderPieData = useMemo(() => {
    if (!categories.length || !orders.length) return [];
    
    return categories.map((ele, i) => {
      return orders.reduce((acc, cv) => {
        acc.value += cv.orderItem.reduce((acc2, cv2) => {
          if (cv2.product.categoryId == ele._id) {
            acc2 += cv2.quantity;
          }
          return acc2;
        }, 0);
        return acc;
      }, { id: i, label: ele.name, value: 0 });
    });
  }, [categories, orders]);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    
    // Simulate refresh - in a real app, you'd dispatch actions to reload data
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Choose chart colors
  const chartColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    '#9c27b0', // purple
    '#795548', // brown
    '#607d8b', // blue grey
    '#ff9800', // orange
  ];

  // Card styling
  const cardStyle = {
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    borderRadius: 2,
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
    }
  };
  
  const chartContainerStyle = {
    p: 0, 
    mt: 2,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center'
  };

  // Render loading skeletons
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width={300} height={60} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        
        <Tabs value={0} sx={{ mb: 3 }}>
          <Tab label={<Skeleton width={120} />} />
          <Tab label={<Skeleton width={120} />} />
          <Tab label={<Skeleton width={120} />} />
        </Tabs>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ ...cardStyle, height: 400 }}>
              <CardHeader 
                title={<Skeleton width={200} />} 
                subheader={<Skeleton width={150} />}
              />
              <Divider />
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <Skeleton variant="circular" width={250} height={250} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ ...cardStyle, height: 400 }}>
              <CardHeader 
                title={<Skeleton width={200} />} 
                subheader={<Skeleton width={150} />}
              />
              <Divider />
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <Skeleton variant="rectangular" width={'100%'} height={250} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  // Render error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.error.light, 0.1),
            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
          }}
        >
          <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" color="error" gutterBottom>
            Could Not Load Statistics
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {error}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Tooltip title="Try again">
              <IconButton
                onClick={handleRefresh}
                sx={{
                  backgroundColor: theme.palette.error.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.error.dark,
                  }
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Render successful data state
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 0
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
          Analytics Dashboard
        </Typography>
        <Tooltip title="Refresh data">
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
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : "off"}
        >
          <Tab 
            icon={<BarChartIcon />} 
            iconPosition="start" 
            label="Categories" 
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
          <Tab 
            icon={<PieChartIcon />} 
            iconPosition="start" 
            label="Orders" 
            sx={{ textTransform: 'none', fontWeight: 500 }}
          />
          {procurement.length > 0 && (
            <Tab 
              icon={<BarChartIcon />} 
              iconPosition="start" 
              label="Procurement" 
              sx={{ textTransform: 'none', fontWeight: 500 }}
            />
          )}
        </Tabs>
      </Box>

      {/* Categories Statistics */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={cardStyle}>
              <CardHeader 
                title="Category Distribution" 
                subheader="Distribution of products by category"
                titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                sx={{ pb: 1 }}
              />
              <Divider />
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ height: isTablet ? 300 : 350, display: 'flex', justifyContent: 'center' }}>
                  <PieChart 
                    series={[{
                      data: categoryPieData,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      valueFormatter: (value) => `${value} Products`,
                      arcLabel: (item) => `${item.label}`,
                      arcLabelMinAngle: 25,
                      innerRadius: 30,
                      outerRadius: 120,
                      paddingAngle: 2,
                      cornerRadius: 4,
                      cx: isMobile ? 150 : 150,
                      cy: isMobile ? 150 : 150
                    }]}
                    width={isMobile ? 300 : 350}
                    height={isMobile ? 300 : 350}
                    colors={chartColors}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                        padding: 0
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={cardStyle}>
              <CardHeader 
                title="Products Per Category" 
                subheader="Total count of products in each category"
                titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                sx={{ pb: 1 }}
              />
              <Divider />
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ height: isTablet ? 300 : 350, display: 'flex', justifyContent: 'center' }}>
                  <BarChart
                    series={[{
                      data: categoryBarData,
                      label: 'Products Count',
                      color: theme.palette.primary.main,
                      valueFormatter: (value) => `${value} Products`
                    }]}
                    xAxis={[{ 
                      data: categories.map(ele => ele.name), 
                      scaleType: 'band',
                      tickLabelStyle: {
                        angle: 45,
                        textAnchor: 'start',
                        fontSize: 12
                      }
                    }]}
                    yAxis={[{
                      label: 'Product Count',
                    }]}
                    width={isMobile ? 320 : 500}
                    height={isMobile ? 280 : 350}
                    margin={{ 
                      top: 20, 
                      right: 20,
                      bottom: isMobile ? 60 : 80,
                      left: 60 
                    }}
                    sx={{
                      '.MuiChartsAxis-tickLabel': {
                        strokeWidth: '0.4px',
                        fill: theme.palette.text.secondary,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Orders Statistics */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={cardStyle}>
              <CardHeader 
                title="Order Distribution" 
                subheader="Distribution of delivered orders by category"
                titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                sx={{ pb: 1 }}
              />
              <Divider />
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ height: isTablet ? 300 : 350, display: 'flex', justifyContent: 'center' }}>
                  <PieChart 
                    series={[{
                      data: orderPieData,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      valueFormatter: (value) => `${value} Items`,
                      arcLabel: (item) => `${item.label}`,
                      arcLabelMinAngle: 25,
                      innerRadius: 30,
                      outerRadius: 120,
                      paddingAngle: 2,
                      cornerRadius: 4,
                      cx: isMobile ? 150 : 150,
                      cy: isMobile ? 150 : 150
                    }]}
                    width={isMobile ? 300 : 350}
                    height={isMobile ? 300 : 350}
                    colors={chartColors}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                        padding: 0
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={cardStyle}>
              <CardHeader 
                title="Items Sold Per Category" 
                subheader="Total count of successfully delivered items in each category"
                titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                sx={{ pb: 1 }}
              />
              <Divider />
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ height: isTablet ? 300 : 350, display: 'flex', justifyContent: 'center' }}>
                  <BarChart
                    series={[{
                      data: orderBarData,
                      label: 'Items Sold',
                      color: theme.palette.success.main,
                      valueFormatter: (value) => `${value} Items`
                    }]}
                    xAxis={[{ 
                      data: categories.map(ele => ele.name), 
                      scaleType: 'band',
                      tickLabelStyle: {
                        angle: 45,
                        textAnchor: 'start',
                        fontSize: 12
                      }
                    }]}
                    yAxis={[{
                      label: 'Items Sold',
                    }]}
                    width={isMobile ? 320 : 500}
                    height={isMobile ? 280 : 350}
                    margin={{ 
                      top: 20, 
                      right: 20,
                      bottom: isMobile ? 60 : 80,
                      left: 60 
                    }}
                    sx={{
                      '.MuiChartsAxis-tickLabel': {
                        strokeWidth: '0.4px',
                        fill: theme.palette.text.secondary,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Procurement Statistics */}
      {activeTab === 2 && procurement.length > 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={cardStyle}>
              <CardHeader 
                title="Procurement Distribution" 
                subheader="Distribution of procured items by category"
                titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                sx={{ pb: 1 }}
              />
              <Divider />
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ height: isTablet ? 300 : 350, display: 'flex', justifyContent: 'center' }}>
                  <PieChart 
                    series={[{
                      data: procPieData,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      valueFormatter: (value) => `${value} Items`,
                      arcLabel: (item) => `${item.label}`,
                      arcLabelMinAngle: 25,
                      innerRadius: 30,
                      outerRadius: 120,
                      paddingAngle: 2,
                      cornerRadius: 4,
                      cx: isMobile ? 150 : 150,
                      cy: isMobile ? 150 : 150
                    }]}
                    width={isMobile ? 300 : 350}
                    height={isMobile ? 300 : 350}
                    colors={chartColors}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                        padding: 0
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={cardStyle}>
              <CardHeader 
                title="Procurement Per Category" 
                subheader="Total count of procured items in each category"
                titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                sx={{ pb: 1 }}
              />
              <Divider />
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ height: isTablet ? 300 : 350, display: 'flex', justifyContent: 'center' }}>
                  <BarChart
                    series={[{
                      data: procBarData,
                      label: 'Procurement Count',
                      color: theme.palette.warning.main,
                      valueFormatter: (value) => `${value} Items`
                    }]}
                    xAxis={[{ 
                      data: categories.map(ele => ele.name), 
                      scaleType: 'band',
                      tickLabelStyle: {
                        angle: 45,
                        textAnchor: 'start',
                        fontSize: 12
                      }
                    }]}
                    yAxis={[{
                      label: 'Items Procured',
                    }]}
                    width={isMobile ? 320 : 500}
                    height={isMobile ? 280 : 350}
                    margin={{ 
                      top: 20, 
                      right: 20,
                      bottom: isMobile ? 60 : 80,
                      left: 60 
                    }}
                    sx={{
                      '.MuiChartsAxis-tickLabel': {
                        strokeWidth: '0.4px',
                        fill: theme.palette.text.secondary,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* No data state - show only if we have categories but no data */}
      {((activeTab === 0 && categories.length > 0 && products.length === 0) ||
        (activeTab === 1 && categories.length > 0 && orders.length === 0) ||
        (activeTab === 2 && categories.length > 0 && procurement.length === 0)) && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mt: 3,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.info.light, 0.1),
            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Data Available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activeTab === 0 && "There are no products to display statistics for."}
            {activeTab === 1 && "There are no completed orders to display statistics for."}
            {activeTab === 2 && "There are no procurement records to display statistics for."}
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default Stats;
