import Link from 'next/link';
import { Container } from '@/style/styles';
import { HomeBannerImage, Title } from './styled';
import { Button } from '@mui/material';

const HomeBanner = () => {
  return (
    <HomeBannerImage>
      <Container>
        <Title>找到專屬於你的咖啡廳</Title>
        <Link href="/cafe">
          <Button size="large" variant="contained" color="secondary" sx={{ borderRadius: '8px', px: 3, py: 1 }}>
            搜尋咖啡廳
          </Button>
        </Link>
      </Container>
    </HomeBannerImage>
  );
};

export default HomeBanner;
