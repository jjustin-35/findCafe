import Link from 'next/link';
import { useState } from 'react';
import { List, ListItem, IconButton, Drawer, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import data from './data';

const MobileMenuItems = ({ onClose }: { onClose: () => void }) => {
  return (
    <List>
      {data.map((item) => (
        <ListItem key={item.label} onClick={onClose}>
          <Link href={item.href} style={{ width: '100%', textDecoration: 'none' }}>
            <Typography color="primary.main" variant="body1" textAlign="center">
              {item.label}
            </Typography>
          </Link>
        </ListItem>
      ))}
      {/* TODO: refactor 登入、註冊 */}
      {/* <ListItem>
        {!isAuth && (
          <Link href="/auth/login" style={{ width: '100%' }}>
            <Button fullWidth variant="outlined">
              登入
            </Button>
          </Link>
        )}
      </ListItem>
      <ListItem>
        {!isAuth && (
          <Link href="/auth/signup" style={{ width: '100%' }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              註冊
            </Button>
          </Link>
        )}
      </ListItem> */}
    </List>
  );
};

const MobileMenu = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const onClose = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: { laptop: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={isMobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={[
          {
            display: { mobile: 'block', laptop: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              marginTop: '64px',
            },
          },
          (theme) => ({
            zIndex: theme.zIndex.drawer + 1,
          }),
        ]}
      >
        <MobileMenuItems onClose={onClose} />
      </Drawer>
    </>
  );
};

export default MobileMenu;
