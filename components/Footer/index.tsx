'use client';

import Image from 'next/image';
import { Container as MuiContainer, Typography, List, ListItem, Box } from '@mui/material';
import Icon from '@/components/Icon';
import { Container } from '@/style/styles';
import { NavLink } from './styled';
import { IconType } from '../Icon/data';
import data from './data';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <MuiContainer component="footer" sx={{ bgcolor: 'primary.main' }}>
      <Container
        sx={{
          color: 'white',
          py: {
            mobile: '24px',
            laptop: '40px',
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
          <List sx={{ display: 'flex', p: 0, gap: 1 }}>
            {data.map((item) => (
              <ListItem key={item.key} sx={{ p: 0 }}>
                <NavLink href={item.href} target={item.target}>
                  <Icon type={item.icon} />
                </NavLink>
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon type={IconType['coffee-white']} width={30} height={30} />
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
