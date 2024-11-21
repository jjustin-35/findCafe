import { Stack, Button } from '@mui/material';
import Link from 'next/link';

const Menu = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        display: { mobile: 'none', laptop: 'flex' },
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
      <Link href="/auth/login">
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              bgcolor: 'white',
              color: 'primary.main',
              borderColor: 'primary.main',
            },
          }}
        >
          登入
        </Button>
      </Link>
      <Link href="/auth/signup">
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
      </Link>
    </Stack>
  );
};

export default Menu;
