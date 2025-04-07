import { Stack } from '@mui/material';
import Link from 'next/link';
import data from './data';

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
      {/* {!isAuth && (
        <>
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
        </>
      )} */}
    </Stack>
  );
};

export default Menu;
