import { Container } from '@/style/styles';
import ImageTextBanner from '@/components/ImageTextBanner';
import data from './data';
import { Wrapper } from './styled';

const HomeIntro = () => {
  return (
    <>
      {data.map((item, idx) => (
        <Wrapper key={idx}>
          <Container>
            <ImageTextBanner {...item} />
          </Container>
        </Wrapper>
      ))}
    </>
  );
};

export default HomeIntro;
