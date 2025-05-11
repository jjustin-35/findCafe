'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Google 登入失敗', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('facebook', { callbackUrl: '/' });
    } catch (error) {
      console.error('Facebook 登入失敗', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 8, mb: 4 }} component="main">
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom>
          登入
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          請選擇以下方式登入
        </Typography>

        <Box sx={{ width: '100%', mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            sx={{
              backgroundColor: '#4285F4',
              color: 'white',
              '&:hover': {
                backgroundColor: '#357ae8',
              },
              mb: 2,
              py: 1.5,
            }}
          >
            使用 Google 帳號登入
          </Button>

          <Button
            fullWidth
            variant="contained"
            startIcon={<FacebookIcon />}
            onClick={handleFacebookLogin}
            disabled={isLoading}
            sx={{
              backgroundColor: '#3b5998',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2d4373',
              },
              py: 1.5,
            }}
          >
            使用 Facebook 帳號登入
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
