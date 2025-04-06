import { Box } from '@mui/material';
import { Container } from '@/style/styles';
import ImageTextBanner from '@/components/ImageTextBanner';
import data from './data';
import { Wrapper } from './styled';

const HomeIntro = () => {
  return (
    <Box
      my={{
        mobile: '40px',
        laptop: '60px',
      }}
    >
      {data.map((item, idx) => (
        <Wrapper key={idx}>
          <Container>
            <ImageTextBanner {...item} />
          </Container>
        </Wrapper>
      ))}
    </Box>
  );
};

export default HomeIntro;
