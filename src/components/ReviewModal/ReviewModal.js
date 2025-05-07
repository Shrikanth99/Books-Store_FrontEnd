import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startAddReview } from '../../actions/review-action';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Rating,
  Box,
  IconButton,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';

const ReviewModal = (props) => {
  const { show, productId, handleClose } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hover, setHover] = useState(-1);

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  };

  const handleSubmit = () => {
    const fData = {
      product: productId,
      rating,
      review
    };
    handleClose();
    dispatch(startAddReview(fData));
  };

  return (
    <Dialog 
      open={show} 
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
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
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: alpha(theme.palette.primary.light, 0.05),
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <RateReviewIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Rate & Review
        </Typography>
        <IconButton 
          onClick={handleClose}
          size="small"
          sx={{
            color: theme.palette.text.secondary,
            transition: 'all 0.2s',
            '&:hover': {
              color: theme.palette.primary.main,
              transform: 'rotate(90deg)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            gutterBottom
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 1
            }}
          >
            <StarIcon sx={{ mr: 0.5, fontSize: 18, color: theme.palette.primary.main }} />
            Your Rating
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Rating
              name="hover-feedback"
              value={rating}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              sx={{ 
                fontSize: '2rem',
                color: theme.palette.warning.main
              }}
            />
            {rating !== null && (
              <Box sx={{ ml: 2, minWidth: 80 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {labels[hover !== -1 ? hover : rating]}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        
        <Box>
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            gutterBottom
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 1 
            }}
          >
            <RateReviewIcon sx={{ mr: 0.5, fontSize: 18, color: theme.palette.primary.main }} />
            Your Review
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Share your experience with this product..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: 2,
                bgcolor: 'background.paper',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                  borderWidth: '1px',
                }
              }
            }}
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 2.5,
        bgcolor: alpha(theme.palette.background.paper, 0.5),
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`
      }}>
        <Button 
          variant="outlined" 
          onClick={handleClose}
          sx={{ 
            mr: 1,
            borderRadius: 8,
            px: 3,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={!rating || !review.trim()}
          sx={{ 
            borderRadius: 8,
            px: 3,
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
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewModal;
