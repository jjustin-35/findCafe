'use client';

import React from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, List, ListItem } from '@mui/material';
import { RootState } from '@/config/configureStore';
import { setSearch, setErr } from '@/redux/search';
import { setProfile } from '@/redux/user';
import Icon from '@/components/Icon';
import { FooterWrapper, NavLink, NavAnchor, BrandContainer } from './styled';
import { logout } from '@/apis/auth';

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const year = new Date().getFullYear();

  const onLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await logout();
    dispatch(setProfile(null));
  };

  const navToSearch = () => {
    dispatch(setSearch({}));
  };

  return (
    <FooterWrapper>
      <Container>
        <List sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { tablet: 'center' }, mb: { mobile: 4, tablet: 5 } }}>
          {token ? (
            <List sx={{ display: 'flex', flexWrap: 'wrap', p: 0 }}>
              <ListItem sx={{ width: 'auto', p: 0 }}>
                <NavLink href="/">Home</NavLink>
              </ListItem>
              <ListItem sx={{ width: 'auto', p: 0 }}>
                <NavLink href="/search" onClick={navToSearch}>Search</NavLink>
              </ListItem>
              <ListItem sx={{ width: 'auto', p: 0 }}>
                <NavAnchor onClick={onLogout}>Logout</NavAnchor>
              </ListItem>
              <ListItem sx={{ width: 'auto', p: 0 }}>
                <NavLink href="/profile">My account</NavLink>
              </ListItem>
            </List>
          ) : (
            <List sx={{ display: 'flex', p: 0 }}>
              <ListItem sx={{ width: 'auto', p: 0 }}>
                <NavLink href="/">Home</NavLink>
              </ListItem>
              <ListItem sx={{ width: 'auto', p: 0 }}>
                <NavLink href="/search" onClick={navToSearch}>Search</NavLink>
              </ListItem>
              <ListItem sx={{ width: 'auto', p: 0 }}>
                <NavLink
                  href="/login"
                  onClick={() => {
                    dispatch(setErr(''));
                  }}
                >
                  Login
                </NavLink>
              </ListItem>
            </List>
          )}
          <BrandContainer>
            <Icon type="coffee-brown" />
            <Image src="/images/findCafe.svg" alt="" width={30} height={30} />
          </BrandContainer>
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
    </FooterWrapper>
  );
};

export default Footer;
