import React from 'react';
import { 
  Typography, 
  TableRow, 
  TableCell, 
  Chip, 
  Avatar, 
  Box, 
  IconButton, 
  Tooltip, 
  useTheme, 
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  Done as DoneIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

const ViewOrderItem = (props) => {
  const { item } = props;
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Handle action menu
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Format the date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  // Get status color and icon
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return { 
          color: theme.palette.success.main, 
          bgColor: alpha(theme.palette.success.main, 0.1),
          icon: <DoneIcon fontSize="small" />
        };
      case 'shipped':
        return { 
          color: theme.palette.info.main, 
          bgColor: alpha(theme.palette.info.main, 0.1),
          icon: <ShippingIcon fontSize="small" />
        };
      case 'processing':
        return { 
          color: theme.palette.warning.main, 
          bgColor: alpha(theme.palette.warning.main, 0.1),
          icon: <PendingIcon fontSize="small" />
        };
      case 'cancelled':
        return { 
          color: theme.palette.error.main, 
          bgColor: alpha(theme.palette.error.main, 0.1),
          icon: <CancelIcon fontSize="small" />
        };
      default:
        return { 
          color: theme.palette.grey[600], 
          bgColor: alpha(theme.palette.grey[600], 0.1),
          icon: <PendingIcon fontSize="small" />
        };
    }
  };

  const statusConfig = getStatusConfig(item.status);

  return (
    <TableRow
      hover
      sx={{
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.03),
        },
        transition: 'background-color 0.2s',
      }}
    >
      <TableCell>
        <Badge 
          badgeContent={item.quantity > 1 ? item.quantity : 0} 
          color="primary"
          sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem', fontWeight: 'bold' } }}
        >
          <Avatar
            variant="rounded"
            src={item.product.image[0].url}
            alt={item.product.title}
            sx={{ 
              width: 60, 
              height: 60, 
              objectFit: 'cover',
              borderRadius: 1.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1)
            }}
          />
        </Badge>
      </TableCell>
      
      <TableCell>
        <Typography 
          variant="subtitle2" 
          fontWeight={600}
          sx={{ 
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {item.product.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ID: {item.product._id?.substring(0, 8) || 'N/A'}
        </Typography>
      </TableCell>
      
      <TableCell>
        <Typography variant="body2" fontWeight={500}>
          {item.quantity}
        </Typography>
      </TableCell>
      
      <TableCell>
        <Typography 
          variant="body2" 
          fontWeight={600}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          ₹{Number(item.product.price).toLocaleString()}
        </Typography>
      </TableCell>
      
      <TableCell>
        <Chip
          icon={statusConfig.icon}
          label={item.status}
          size="small"
          sx={{
            backgroundColor: statusConfig.bgColor,
            color: statusConfig.color,
            fontWeight: 600,
            '& .MuiChip-icon': {
              color: 'inherit'
            }
          }}
        />
      </TableCell>
      
      <TableCell>
        <Typography 
          variant="body2" 
          fontWeight={500}
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '0.8rem',
          }}
        >
          {item.orderId.substring(0, 10)}...
        </Typography>
      </TableCell>
      
      <TableCell>
        <Typography variant="body2" fontWeight={500}>
          {formatDate(item.orderDate)}
        </Typography>
      </TableCell>
      
      <TableCell align="center">
        <Box>
          <Tooltip title="More Actions">
            <IconButton
              onClick={handleOpenMenu}
              size="small"
              sx={{ 
                color: theme.palette.text.secondary,
                backgroundColor: open ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                mt: 1.5,
                borderRadius: 2,
                minWidth: 180,
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <ViewIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="View Details" />
            </MenuItem>
            
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <PrintIcon fontSize="small" color="action" />
              </ListItemIcon>
              <ListItemText primary="Print Receipt" />
            </MenuItem>
            
            {item.status !== 'Delivered' && item.status !== 'Cancelled' && (
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <EditIcon fontSize="small" color="warning" />
                </ListItemIcon>
                <ListItemText primary="Update Status" />
              </MenuItem>
            )}
            
            {item.status !== 'Delivered' && (
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <CancelIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primary="Cancel Order" />
              </MenuItem>
            )}
          </Menu>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ViewOrderItem;
