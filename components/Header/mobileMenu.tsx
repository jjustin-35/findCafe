import Link from 'next/link';
import { useState } from 'react';
import { List, ListItem, Button, IconButton, Drawer, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MobileMenuItems = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <List>
      <ListItem>
        <Link href="/search" style={{ width: '100%', textDecoration: 'none' }}>
          <Typography variant="body1" textAlign="center">
            搜尋咖啡廳
          </Typography>
        </Link>
      </ListItem>
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

const MobileMenu = ({ isAuth }: { isAuth: boolean }) => {
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
          display: { tablet: 'none' },
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
        sx={[
          {
            display: { mobile: 'block', tablet: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          },
          (theme) => ({
            zIndex: theme.zIndex.drawer + 1,
          }),
        ]}
      >
        <MobileMenuItems isAuth={isAuth} />
      </Drawer>
    </>
  );
};

export default MobileMenu;
