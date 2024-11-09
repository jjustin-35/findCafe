import Link from 'next/link';
import { useState } from 'react';
import { List, ListItem, Button, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MobileMenuItems = () => {
  return (
    <List>
      <ListItem>
        <Link
          href="/search"
          style={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          搜尋咖啡廳
        </Link>
      </ListItem>
      <ListItem>
        <Button fullWidth variant="text" color="inherit">
          登入
        </Button>
      </ListItem>
      <ListItem>
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
      </ListItem>
    </List>
  );
};

const MobileMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: { md: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        <MobileMenuItems />
      </Drawer>
    </>
  );
};

export default MobileMenu;
