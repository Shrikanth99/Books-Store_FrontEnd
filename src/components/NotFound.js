import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, useTheme, alpha } from '@mui/material';
import { LocalLibraryOutlined } from '@mui/icons-material';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            textAlign: 'center',
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3
            }}
          >
            <LocalLibraryOutlined
              sx={{
                fontSize: '5rem',
                color: 'primary.main',
                opacity: 0.8,
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%': {
                    transform: 'translateY(0px)',
                  },
                  '50%': {
                    transform: 'translateY(-20px)',
                  },
                  '100%': {
                    transform: 'translateY(0px)',
                  },
                },
              }}
            />
            
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '6rem', md: '8rem' },
                fontWeight: 700,
                color: 'primary.main',
                lineHeight: 1,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: 'text.primary'
              }}
            >
              Page Not Found
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '500px',
                mb: 4
              }}
            >
              Oops! The page you're looking for seems to have vanished into thin air. 
              Don't worry, you can always find your way back to our collection of books.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <Button
                component={Link}
                to="/"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 8,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: theme.shadows[2],
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                  }
                }}
              >
                Back to Home
              </Button>
              
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 8,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Browse Books
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound; 