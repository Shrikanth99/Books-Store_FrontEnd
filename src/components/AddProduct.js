import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';    
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { startAddProduct } from '../actions/product-action';
import { addCategory } from '../actions/category-action';

// Material-UI imports
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Radio,
    RadioGroup,
    Grid,
    IconButton,
    Stack,
    Alert,
    Container,
    InputAdornment,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

// Styled components
const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
}));

const ImagePanel = styled(Box)(({ theme }) => ({
    flex: '0 0 45%',
    backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: { xs: 'none', md: 'block' },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: alpha(theme.palette.primary.main, 0.7),
        backdropFilter: 'blur(2px)',
    },
}));

const ImagePanelContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: theme.spacing(4),
    textAlign: 'center',
}));

const FormPanel = styled(Box)(({ theme }) => ({
    flex: '0 0 55%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
    },
}));

const FormPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    backgroundColor: theme.palette.background.paper,
}));

const ImagePreview = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

const PreviewImage = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}));

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AddProduct = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const categories = useSelector(state => state.categories.categories)
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        stockCount: '',
        categoryId: '',
        condition: '',
        categoryName: ''
    });
    const [files, setFiles] = useState([]);
    const [formError, setFormError] = useState({});
    const [previewUrls, setPreviewUrls] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    function runValidation() {
        const errors = {};
        if (!formData.title) errors.title = 'Title is required';
        if (!formData.author) errors.author = 'Author name is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.price) errors.price = 'Price is required';
        if (!formData.categoryId) errors.categoryId = 'Category must be selected';
        if (!formData.stockCount) errors.stockCount = 'Stock count is required';
        if (files.length === 0) errors.files = 'At least one image is required';
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = runValidation();

        if (Object.keys(errors).length === 0) {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'categoryName') {
                    submitData.append(key, key === 'price' || key === 'stockCount' 
                        ? Number(formData[key]) 
                        : formData[key]);
                }
            });

            files.forEach(file => {
                submitData.append('image', file);
            });

            dispatch(startAddProduct(submitData))
                .then(() => {
                    setFormData({
                        title: '',
                        author: '',
                        description: '',
                        price: '',
                        stockCount: '',
                        categoryId: '',
                        condition: '',
                        categoryName: ''
                    });
                    setFiles([]);
                    setPreviewUrls([]);
                    navigate('/products');
                });
        } else {
            setFormError(errors);
        }
    };

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...newFiles]);
        
        // Create preview URLs
        const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddCategory = async () => {
        if (formData.categoryName) {
            try {
                const res = await axios.post('/categories', 
                    { name: formData.categoryName },
                    { headers: { 'Authorization': localStorage.getItem('token') } }
                );
                const category = res.data;
                setFormData(prev => ({
                    ...prev,
                    categoryId: category._id,
                    categoryName: ''
                }));
                dispatch(addCategory(category));
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <FormContainer>
            {/* Decorative Image Panel */}
            <ImagePanel>
                <ImagePanelContent>
                    <BookIcon sx={{ fontSize: 80, mb: 3 }} />
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Add Your Book
                    </Typography>
                    <Typography variant="h6" sx={{ maxWidth: 400, opacity: 0.9 }}>
                        Share your book with the world. Fill in the details and let readers discover your work.
                    </Typography>
                </ImagePanelContent>
            </ImagePanel>

            {/* Form Panel */}
            <FormPanel>
                <Box sx={{ maxWidth: 800, width: '100%', mx: 'auto' }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 4, display: { md: 'none' } }}>
                        Add New Book
                    </Typography>
                    
                    <FormPaper component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    error={!!formError.title}
                                    helperText={formError.title}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BookIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    error={!!formError.author}
                                    helperText={formError.author}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    error={!!formError.description}
                                    helperText={formError.description}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DescriptionIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={!!formError.categoryId}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        label="Category"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <CategoryIcon color="action" />
                                            </InputAdornment>
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>Select a category</em>
                                        </MenuItem>
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formError.categoryId && (
                                        <Alert severity="error" sx={{ mt: 1 }}>{formError.categoryId}</Alert>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack direction="row" spacing={1}>
                                    <TextField
                                        fullWidth
                                        label="Add New Category"
                                        name="categoryName"
                                        value={formData.categoryName}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AddIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleAddCategory}
                                        startIcon={<AddIcon />}
                                        sx={{ minWidth: '120px' }}
                                    >
                                        Add
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    Upload Images
                                    <VisuallyHiddenInput
                                        type="file"
                                        multiple
                                        onChange={handleFiles}
                                        accept="image/*"
                                    />
                                </Button>
                                {formError.files && (
                                    <Alert severity="error" sx={{ mb: 2 }}>{formError.files}</Alert>
                                )}
                                <ImagePreview>
                                    {previewUrls.map((url, index) => (
                                        <PreviewImage key={index}>
                                            <img src={url} alt={`Preview ${index + 1}`} />
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 4,
                                                    right: 4,
                                                    bgcolor: 'background.paper',
                                                    '&:hover': {
                                                        bgcolor: 'error.light',
                                                        color: 'white',
                                                    },
                                                }}
                                                onClick={() => removeFile(index)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </PreviewImage>
                                    ))}
                                </ImagePreview>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <Typography variant="subtitle1" gutterBottom>
                                        Book Condition
                                    </Typography>
                                    <RadioGroup
                                        row
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        sx={{ gap: 4 }}
                                    >
                                        <FormControlLabel
                                            value="Good"
                                            control={<Radio />}
                                            label="Good"
                                        />
                                        <FormControlLabel
                                            value="Fair"
                                            control={<Radio />}
                                            label="Fair"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    error={!!formError.price}
                                    helperText={formError.price}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Stock Count"
                                    name="stockCount"
                                    type="number"
                                    value={formData.stockCount}
                                    onChange={handleChange}
                                    error={!!formError.stockCount}
                                    helperText={formError.stockCount}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InventoryIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        py: 1.5,
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: 6,
                                        },
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    Add Book
                                </Button>
                            </Grid>
                        </Grid>
                    </FormPaper>
                </Box>
            </FormPanel>
        </FormContainer>
    );
};

export default AddProduct;
