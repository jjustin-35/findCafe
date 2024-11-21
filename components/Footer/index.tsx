'use client';

import React from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Container as MuiContainer, Typography, List, ListItem, Box } from '@mui/material';
import { RootState } from '@/config/configureStore';
import { setSearch, setErr } from '@/redux/search';
import { setProfile } from '@/redux/user';
import Icon from '@/components/Icon';
import { Container } from '@/style/styles';
import { NavLink, NavAnchor } from './styled';
import { logout } from '@/apis/auth';

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const year = new Date().getFullYear();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const onLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await logout();
    dispatch(setProfile(null));
  };

  const navToSearch = () => {
    dispatch(setSearch({}));
  };

  const onNavToLogin = () => {
    dispatch(setErr(''));
  };

  return (
    <MuiContainer component="footer" sx={{ bgcolor: 'primary.main' }}>
      <Container
        sx={{
          color: 'white',
          p: {
            desktop: '40px 0',
            tablet: '24px 0',
          },
        }}
      >
        <List
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { tablet: 'center' },
            mb: { mobile: 4, tablet: 5 },
          }}
        >
          <List sx={{ display: 'flex', p: 0, gap: 2 }}>
            <ListItem sx={{ width: 'auto', p: 0 }}>
              <NavLink href="/">Home</NavLink>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <NavLink href="/search" onClick={navToSearch}>
                Search
              </NavLink>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              {isAuth ? (
                <NavAnchor onClick={onLogout}>Logout</NavAnchor>
              ) : (
                <NavLink href="/login" onClick={onNavToLogin}>
                  Login
                </NavLink>
              )}
            </ListItem>
          </List>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon type="coffee-white" width={30} height={30} />
            <Image src="/images/findCafe.svg" alt="icon-findCafe" width={100} height={60} />
          </Box>
        </List>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            mb: 0,
          }}
        >
          Copyright {year} Justin Chen. All rights reserved.
        </Typography>
      </Container>
    </MuiContainer>
  );
};

export default Footer;
