import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Card,
  CardContent,
  IconButton,
  Stack,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';

const Profile = () => {
  const { userState } = useContext(UserContext);
  const { user } = userState;
  const theme = useTheme();

  const [userName, setUsername] = useState(user ? user.userName : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : '');
  const [formErrors, setFormErrors] = useState({});
  const [serverFormErrors, setServerFormErrors] = useState([]);

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  return (
    <Box 
      sx={{ 
        py: 6, 
        minHeight: '89.5vh',
        bgcolor: 'background.default',
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.default, 1)})`
      }}
    >
      <Container maxWidth="md">
        {serverFormErrors.length > 0 && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              mb: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.error.light}`,
              bgcolor: alpha(theme.palette.error.light, 0.1)
            }}
          >
            <Typography variant="subtitle2" color="error.main" fontWeight={500}>
              {serverFormErrors.map(ele => (
                <Box component="li" key={ele.msg} sx={{ mb: 0.5 }}>
                  {ele.msg}
                </Box>
              ))}
            </Typography>
          </Paper>
        )}

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
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            }
          }}
        >
          <Grid container>
            <Grid item xs={12} md={4} 
              sx={{ 
                bgcolor: 'primary.main',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                position: 'relative',
              }}
            >
              <Avatar
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt={userName}
                sx={{ 
                  width: 100, 
                  height: 100,
                  mb: 2,
                  border: '4px solid white',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                }}
              />
              <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                {userName}
              </Typography>
              <Chip 
                label="User Account" 
                size="small" 
                sx={{ 
                  bgcolor: alpha('#fff', 0.2),
                  color: 'white',
                  fontWeight: 500
                }} 
              />
              <IconButton 
                sx={{ 
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: 'white',
                  bgcolor: alpha('#fff', 0.2),
                  '&:hover': {
                    bgcolor: alpha('#fff', 0.3),
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <CardContent sx={{ p: 4 }}>
                <Typography 
                  variant="h6" 
                  fontWeight={600}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3
                  }}
                >
                  <AccountCircleIcon sx={{ mr: 1 }} fontSize="small" color="primary" />
                  User Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Stack spacing={3}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}
                    >
                      <BadgeIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                      User ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user._id}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}
                    >
                      <EmailIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {email}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}
                    >
                      <PhoneIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                      Phone
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {phoneNumber}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
