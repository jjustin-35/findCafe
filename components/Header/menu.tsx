import { Stack, Button } from '@mui/material';
import Link from 'next/link';

const Menu = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        display: { xs: 'none', md: 'flex' },
      }}
    >
      <Link
        href="/search"
        style={{
          color: '#fff',
          textDecoration: 'none',
        }}
      >
        搜尋咖啡廳
      </Link>
      <Button variant="text" color="inherit">
        登入
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          bgcolor: 'white',
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'grey.100',
          },
        }}
      >
        註冊
      </Button>
    </Stack>
  );
};

export default Menu;
