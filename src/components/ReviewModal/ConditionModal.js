import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Divider,
  useTheme,
  alpha,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ConditionModal = (props) => {
  const { show, handleClose, handleProceed } = props;
  const [condition, setCondition] = useState(false);
  const theme = useTheme();

  return (
    <Dialog 
      open={show} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoOutlinedIcon 
            sx={{ 
              mr: 1.5, 
              color: theme.palette.primary.main 
            }} 
          />
          <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
            Select Book Condition
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          size="small"
          sx={{
            color: alpha(theme.palette.text.primary, 0.6),
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.08)
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pt: 3 }}>
        <DialogContentText sx={{ color: alpha(theme.palette.text.primary, 0.8), mb: 3 }}>
          Price will differ based on your book condition:
        </DialogContentText>
        
        <Box sx={{ 
          mb: 3,
          p: 2, 
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}>
          <Typography variant="body1" gutterBottom>
            <Typography component="span" fontWeight={600}>Good Condition:</Typography> Full amount will be funded
          </Typography>
          <Typography variant="body1">
            <Typography component="span" fontWeight={600}>Fair Condition:</Typography> Price will be slashed by 50%
          </Typography>
        </Box>
        
        <FormControlLabel
          control={
            <Checkbox 
              checked={condition}
              onChange={() => setCondition(!condition)}
              color="primary"
            />
          }
          label="I understand and agree to the condition terms"
        />
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={handleClose}
          variant="outlined"
          sx={{ 
            mr: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            px: 2
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={() => handleProceed(condition)} 
          disabled={!condition}
          variant="contained"
          color="primary"
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
            },
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConditionModal;
