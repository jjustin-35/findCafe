'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AppBar, Toolbar, Stack } from '@mui/material';
import { Container } from '@/style/styles';
import Menu from './menu';
import MobileMenu from './mobileMenu';

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ zIndex: 1400 }}>
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

          <Menu />
          <MobileMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
