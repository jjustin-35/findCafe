import { Stack, Button, Avatar, Box, Menu as MuiMenu, MenuItem, Tooltip, IconButton } from '@mui/material';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import data from './data';

const Menu = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    handleCloseUserMenu();
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        display: { mobile: 'none', laptop: 'flex' },
      }}
    >
      {data.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target={item.target || '_self'}
          style={{
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          {item.label}
        </Link>
      ))}

      {!isAuthenticated ? (
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            登入
          </Button>
        </Link>
      ) : (
        <Box>
          <Tooltip title="個人選單">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                alt={session?.user?.name || '使用者'}
                src={session?.user?.image || ''}
                sx={{ width: 32, height: 32, bgcolor: 'white', color: 'primary.main' }}
              >
                {session?.user?.name ? session.user.name[0].toUpperCase() : '?'}
              </Avatar>
            </IconButton>
          </Tooltip>
          <MuiMenu anchorEl={anchorEl} open={open} onClose={handleCloseUserMenu} sx={{ mt: '45px' }}>
            <MenuItem onClick={handleCloseUserMenu} component={Link} href="/favorite">
              我的收藏
            </MenuItem>
            <MenuItem onClick={handleLogout}>登出</MenuItem>
          </MuiMenu>
        </Box>
      )}
    </Stack>
  );
};

export default Menu;
