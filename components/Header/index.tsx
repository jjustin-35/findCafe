'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Stack } from '@mui/material';
import { RootState } from '@/config/configureStore';
import { Container } from '@/style/styles';
import Menu from './menu';
import MobileMenu from './mobileMenu';

const Header = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            height: '64px',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            component={Link}
            href="/"
            sx={{ textDecoration: 'none' }}
          >
            <Image src="/images/coffee-white.svg" alt="icon-coffee-white" width={32} height={32} />
            <Image src="/images/findCafe.svg" alt="icon-find-cafe" width={126} height={32} />
          </Stack>

          <Menu isAuth={isAuth} />
          <MobileMenu isAuth={isAuth} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
