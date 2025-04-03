import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container sx={{ py: 5, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" fontWeight="bold" mb={3}>
        404 - 頁面未找到
      </Typography>
      <Typography variant="h6" mb={4}>
        抱歉，您所尋找的頁面不存在。
      </Typography>
      <Button component={Link} href="/" variant="contained" size="large">
        返回首頁
      </Button>
    </Container>
  );
}
