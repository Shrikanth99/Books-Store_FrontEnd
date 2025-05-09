import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startGetProduct } from "../actions/product-action";
import "../styles/product.css";

// Material UI imports
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination as MuiPagination,
  useTheme,
  alpha,
  InputAdornment,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Skeleton,
  Alert,
  Snackbar,
  Backdrop,
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ClearIcon from '@mui/icons-material/Clear';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProduct = useSelector(state => state.products.allProduct);
  const products = useSelector((state) => state.products.data);
  const categories = useSelector(state => state.categories.categories);
  
  // States for UI
  const [categoryId, setCategoryId] = useState(
    localStorage.getItem("categoryId") ? localStorage.getItem("categoryId") : ""
  );
  const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(() => {
      const savedPage = localStorage.getItem("currentPage");
      return savedPage ? parseInt(savedPage) : 1;
    });
  const [sort, setSort] = useState(localStorage.getItem('sort') ? localStorage.getItem('sort') : '');

  // Added states for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const sortValues = ["a-z", "z-a", "lowest-highest", "highest-lowest"];

  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const totalPages = Math.ceil(allProduct?.length / productsPerPage) || 0;

  let filteredProduct;
  if (categoryId && products?.length) {
    filteredProduct = products.filter((product) => {
      return product.categoryId === categoryId;
    });
  }
  
  let catProducts;
  if (categoryId && filteredProduct?.length > 0) {
    catProducts = filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handlePaginationClick = (event, pageNo) => {
    setCurrentPage(pageNo);
    setLoadingProducts(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    localStorage.setItem('sort', e.target.value);
    setLoadingProducts(true);
  };

  const handleClearSearch = () => {
    setSearch("");
    setLoadingProducts(true);
  };
  
  const handleErrorClose = () => {
    setSnackbarOpen(false);
  };
  
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetchProducts();
  };
  
  const fetchProducts = () => {
    setLoadingProducts(true);
    try {
      if (categoryId && search) {
        if (sort) {
          dispatch(startGetProduct(search, categoryId, sort, currentPage))
            .then(() => setLoadingProducts(false))
            .catch(handleFetchError);
        } else {
          dispatch(startGetProduct(search, categoryId, null, currentPage))
            .then(() => setLoadingProducts(false))
            .catch(handleFetchError);
        }
    }
    else if (search) {
        if (sort) {
          dispatch(startGetProduct(search, null, sort, currentPage))
            .then(() => setLoadingProducts(false))
            .catch(handleFetchError);
        } else {
          dispatch(startGetProduct(search, null, null, currentPage))
            .then(() => setLoadingProducts(false))
            .catch(handleFetchError);
        }
      } else if (categoryId) {
        if (sort) {
          dispatch(startGetProduct(null, categoryId, sort, currentPage))
            .then(() => setLoadingProducts(false))
            .catch(handleFetchError);
        } else {
          dispatch(startGetProduct(null, categoryId, null, currentPage))
            .then(() => setLoadingProducts(false))
            .catch(handleFetchError);
        }
    }
    else {
        if (sort) {
          dispatch(startGetProduct(null, null, sort, currentPage))
            .then(() => setLoadingProducts(false))
            .catch(handleFetchError);
        } else {
          dispatch(startGetProduct(null, null, null, currentPage))
            .then(() => setLoadingProducts(false))
            .catch(handleFetchError);
        }
      }
    } catch (err) {
      handleFetchError(err);
    }
  };
  
  const handleFetchError = (err) => {
    console.error("Error fetching products:", err);
    setError("Failed to load products. Please try again.");
    setSnackbarOpen(true);
    setLoadingProducts(false);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    
    // Set loading to false after 1 second if products are available
    const timer = setTimeout(() => {
      if (products?.length > 0) {
        setIsLoading(false);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [search, categoryId, sort, currentPage]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    return () => {
        localStorage.removeItem('currentPage');
      };
  }, [currentPage]);

  useEffect(() => {
    return () => {
      // Cleanup function
    };
  }, []);
  
  // Initial loading state
  if (isLoading) {
    return (
      <Box sx={{ 
        bgcolor: 'background.default', 
        py: 4, 
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
          Loading products...
        </Typography>
      </Box>
    );
  }

  // Error state with retry option
  if (error && !products?.length) {
    return (
      <Box sx={{ 
        bgcolor: 'background.default', 
        py: 4, 
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" gutterBottom align="center">
          {error}
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<RefreshIcon />} 
          onClick={handleRetry}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', py: 4, minHeight: '80vh' }}>
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
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" size="small" disabled={isLoading}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={categoryId}
        onChange={(e) => {
          setCategoryId(e.target.value);
          localStorage.setItem("categoryId", e.target.value);
                    setLoadingProducts(true);
                  }}
                  label="Category"
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon color="action" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">All Categories</MenuItem>
        {categories.map((ele) => (
                    <MenuItem key={ele._id} value={ele._id}>
            {ele.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search books..."
        value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="clear search"
                        onClick={handleClearSearch}
                        edge="end"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" size="small" disabled={isLoading}>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sort}
                    onChange={handleSort}
                  label="Sort By"
                  startAdornment={
                    <InputAdornment position="start">
                      <SortIcon color="action" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">No Sorting</MenuItem>
                  {sortValues.map((ele, i) => (
                    <MenuItem key={i} value={ele}>
                      {ele}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          {/* Loading state for products */}
          {loadingProducts ? (
            <Fade in={loadingProducts} timeout={300}>
              <Grid container spacing={3}>
                {Array.from(new Array(8)).map((_, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <Card elevation={0} sx={{ height: '100%' }}>
                      <Skeleton 
                        variant="rectangular" 
                        height={220} 
                        animation="wave"
                        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }} 
                      />
                      <CardContent>
                        <Skeleton animation="wave" height={32} width="80%" />
                        <Skeleton animation="wave" height={24} width="50%" />
                      </CardContent>
                </Card>
                  </Grid>
                ))}
              </Grid>
            </Fade>
          ) : (
            <>
              {/* No products found state */}
              {(!products || products.length === 0) ? (
                <Box
                  sx={{
                    py: 10,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <ErrorOutlineIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.6 }} />
                  <Typography variant="h5" color="text.secondary">
                    No books found
                  </Typography>
                  <Typography color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mb: 2 }}>
                    Try adjusting your search or filter to find what you're looking for
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => {
                      setSearch("");
                      setCategoryId("");
                      setSort("");
                      localStorage.removeItem("categoryId");
                      localStorage.removeItem("sort");
                    }}
                  >
                    Clear filters
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {products.map((ele) => (
                    <Grid item key={ele._id} xs={12} sm={6} md={4} lg={3}>
                      <Card 
                        elevation={0}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 3,
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
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
                onClick={() => handleClick(ele._id)}
              >
                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                          <CardMedia
                            component="img"
                            height="220"
                            image={ele.image && ele.image[0] ? ele.image[0].url : '/placeholder-book.jpg'}
                            alt={ele.title}
                            sx={{
                              opacity: ele.stockCount === 0 ? 0.3 : 1,
                              transition: 'transform 0.6s ease',
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-book.jpg';
                            }}
                          />
                          {ele.stockCount === 0 && (
                            <Chip
                              label="Out of Stock"
                              color="error"
                              sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                fontWeight: 600,
                              }}
                            />
                          )}
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
                              minHeight: '3.6em'
                            }}
                          >
                            {ele.title}
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
                            ₹{ele.price}
                          </Typography>
                        </CardContent>
                </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}

          {/* Show pagination only when there are products and more than one page */}
          {products?.length > 0 && totalPages > 1 && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 5,
                mb: 3
              }}
            >
              <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePaginationClick}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                disabled={loadingProducts}
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Box>
          )}
        </Paper>
      </Container>
      
      {/* Error snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleErrorClose} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
      
      {/* Backdrop for loading state when changing pages */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(2px)'
        }}
        open={isLoading && !products?.length}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Products;
