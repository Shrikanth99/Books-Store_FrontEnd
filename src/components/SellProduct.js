import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";
import { startGetProduct, startCreateCart, startRemoveCart } from "../actions/product-action";
import ConditionModal from "./ReviewModal/ConditionModal";

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
  Divider,
  Stack,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ClearIcon from '@mui/icons-material/Clear';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import VerifiedIcon from '@mui/icons-material/Verified';
import SellIcon from '@mui/icons-material/Sell';

const SellProducts = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProduct = useSelector(state => state.products.allProduct);
  const products = useSelector((state) => {
    return state.products.data;
  });
  const carts = useSelector((state) => {
    return state.products.cart;
  });
  
  let filteredCarts = carts.filter(ele => ele.mode === 'sell');
  filteredCarts = filteredCarts.map(ele => ele.productId._id);
  
  const categories = useSelector(state => state.categories.categories);
  const [categoryId, setCategoryId] = useState(
    localStorage.getItem("categoryId") ? localStorage.getItem("categoryId") : ""
  );
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage) : 1;
  });

  const [sort, setSort] = useState(localStorage.getItem('sort') ? localStorage.getItem('sort') : '');
  const sortValues = ["a-z", "z-a", "lowest-highest", "highest-lowest"];

  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const totalPages = Math.ceil(allProduct.length / productsPerPage);

  let filteredProduct;
  if (categoryId) {
    filteredProduct = products.filter((product) => {
      return product.categoryId === categoryId;
    });
  }
  
  let catProducts;
  if (categoryId && filteredProduct?.length > 0) {
    catProducts = filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  const handlePaginationClick = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    localStorage.setItem('sort', e.target.value);
  };

  const handleCart = (id, pricing, func) => {
    const body = {
        mode: 'sell'
    };
      if (!localStorage.getItem("token")) {
        navigate("/login", { state: { msg: "You need to Login first" } });
      } else {
      if (func === 'create') {
        setShow(true);
        setProductId(id);
        setPrice(pricing);
        } else {
        dispatch(startRemoveCart(id, body));
      }
  }
  };
  
  const handleClose = () => {
    setShow(false);
  };

  const handleProceed = (condition) => {
    const body = {
        mode: 'sell',
        condition,
      price: condition === 'Fair' ? (price * 50) / 100 : price
    };
    handleClose();
    dispatch(startCreateCart(productId, body));
  };

  const handleClearSearch = () => {
    setSearch("");
  };

useEffect(() => {
    if (categoryId && search) {
      if (sort) {
        dispatch(startGetProduct(search, categoryId, sort, currentPage));
      } else {
        dispatch(startGetProduct(search, categoryId, null, currentPage));
      }
  }
  else if (search) {
      if (sort) {
        dispatch(startGetProduct(search, null, sort, currentPage));
      } else {
        dispatch(startGetProduct(search, null, null, currentPage));
      }
    } else if (categoryId) {
      if (sort) {
        dispatch(startGetProduct(null, categoryId, sort, currentPage));
      } else {
        dispatch(startGetProduct(null, categoryId, null, currentPage));
      }
  }
  else {
      if (sort) {
        dispatch(startGetProduct(null, null, sort, currentPage));
      } else {
        dispatch(startGetProduct(null, null, null, currentPage));
      }
    }
  }, [search, categoryId, sort, currentPage, dispatch]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    return () => {
        localStorage.removeItem('currentPage');
      };
  }, [currentPage]);

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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <SellIcon 
              color="primary" 
              sx={{ 
                mr: 1.5, 
                fontSize: 28,
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
              Sell Your Books
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 3, color: alpha(theme.palette.text.primary, 0.7) }}>
            Turn your used books into cash! Select books that you want to sell back based on their condition.
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={categoryId}
        onChange={(e) => {
          setCategoryId(e.target.value);
          localStorage.setItem("categoryId", e.target.value);
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
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" size="small">
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

          <Box sx={{ mb: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle1" component="div" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <VerifiedIcon sx={{ mr: 1, color: theme.palette.secondary.main }} fontSize="small" />
                Book Condition Guidelines
              </Typography>
              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" component="div" sx={{ mb: 0.5, fontWeight: 600 }}>
                    Good Condition:
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                    Full amount will be funded for books with minimal wear, intact pages, and clean covers.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" component="div" sx={{ mb: 0.5, fontWeight: 600 }}>
                    Fair Condition:
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                    50% of the price for books with moderate wear, highlighting/notes, or minor damage.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          <Grid container spacing={3}>
            {products?.map((ele) => (
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
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={ele.image[0].url}
                      alt={ele.title}
                      sx={{
                        transition: 'transform 0.6s ease',
                      }}
                    />
                    {filteredCarts.includes(ele._id) && (
                      <Chip
                        label="In Selling Cart"
                        color="secondary"
                        size="small"
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
                        mb: 1.5,
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
                    
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Good Condition:
                        </Typography>
                        <Typography variant="body1" color="primary" sx={{ fontWeight: 700 }}>
                          ₹{ele.price}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Fair Condition:
                        </Typography>
                        <Typography variant="body1" color="primary" sx={{ fontWeight: 700 }}>
                          ₹{(ele.price * 50) / 100}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2.5, pt: 0 }}>
                    {filteredCarts.includes(ele._id) ? (
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        startIcon={<RemoveShoppingCartIcon />}
                        onClick={() => handleCart(ele._id, ele.price, 'remove')}
                        sx={{
                          borderRadius: 2,
                          py: 1,
                          textTransform: 'none',
                          fontWeight: 600
                        }}
                      >
                        Remove from Cart
                        </Button>
                        ) : (
                        <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => handleCart(ele._id, ele.price, 'create')}
                        sx={{
                          borderRadius: 2,
                          py: 1,
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          '&:hover': {
                            boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                          }
                        }}
                      >
                        Sell This Book
                        </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePaginationClick}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
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
      
      {show && <ConditionModal show={show} handleClose={handleClose} handleProceed={handleProceed} />}
    </Box>
  );
};

export default SellProducts;
