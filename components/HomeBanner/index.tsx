import Link from 'next/link';
import { Button, Stack, Box } from '@mui/material';
import { Container } from '@/style/styles';
import { HomeBannerImage, Title } from './styled';

const HomeBanner = () => {
  return (
    <HomeBannerImage>
      <Box position="absolute" top={0} left={0} bottom={0} right={0} zIndex={0} bgcolor="rgba(0, 0, 0, 0.2)" />
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction="column"
          alignItems={{
            mobile: 'center',
            tablet: 'start',
          }}
        >
          <Title>找到專屬於你的咖啡廳</Title>
          <Link href="/cafe">
            <Button
              size="large"
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: '8px',
                px: 3,
                py: 1,
              }}
            >
              搜尋咖啡廳
            </Button>
          </Link>
        </Stack>
      </Container>
    </HomeBannerImage>
  );
};

export default HomeBanner;
